import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

import fs from 'mz/fs';
import path from 'path';
import * as borsh from 'borsh';
import { Buffer } from 'buffer';
import { getPayer, getRpcUrl, createKeypairFromFile } from './utils';

/**
 * Connection to the network
 */
let connection: Connection;

/**
 * Keypair associated to the fees' payer
 */
let payer: Keypair;

/**
 * Token program id
 */
let programId: PublicKey;

/**
 * The public key of the account that stores the token info
 */
let tokenPubkey: PublicKey;
let tokenFromAccountPubkey: PublicKey;
let tokenToAccountPubkey: PublicKey;
let tokenAccountPubkey: PublicKey;

/**
 * Path to program files
 */
const PROGRAM_PATH = path.resolve(__dirname, '../dist/program');

/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'program_token.so');

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/gm_program.so`
 */
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'program_token-keypair.json');

const TOKEN_NAME = 'BORA_COIN'
const FROM_ACCT_SEED='FROM_ACCT_SEED'
const TO_ACCT_SEED='TO_ACCT_SEED'

/**
 * Borsh class and schema definition for accounts
 */


 class TokenInstruction {
    instruction = 0
    amount = 0
    constructor(fields: { instruction: number, amount: number } | undefined = undefined) {
        if (fields) {
            this.instruction = fields.instruction;
            this.amount = fields.amount;
        }
    }
    static schema = new Map([[TokenInstruction,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['amount', 'u64']]
        }]]);
}

class TokenInstructionNoAmount {
    instruction = 0
    constructor(fields: { instruction: number } | undefined = undefined) {
        if (fields) {
            this.instruction = fields.instruction;
        }
    }
    static schema = new Map([[TokenInstructionNoAmount,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8']]
        }]]);
}

class Token {
    authority = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    supply = 0
    constructor(fields: { authority: [32], supply: number } | undefined = undefined) {
        if (fields) {
            this.authority = fields.authority;
            this.supply = fields.supply;
        }
    }
    static schema = new Map([[Token,
        {
            kind: 'struct',
            fields: [
                ['authority', [32]],
                ['supply', 'u64']]
        }]]);
}


class TokenAccount {
    owner = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    token = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    amount = 0
    constructor(fields: { owner: [32], token: [32], amount: number } | undefined = undefined) {
        if (fields) {
            this.owner = fields.owner;
            this.token = fields.token;
            this.amount = fields.amount;
        }
    }
    static schema = new Map([[TokenAccount,
        {
            kind: 'struct',
            fields: [
                ['owner', [32]],
                ['token', [32]],
                ['amount', 'u64']]
        }]]);
}

/**
 * The expected size of each greeting account. Used for creating the buffer
 */
const NEW_TOKEN_SIZE = borsh.serialize(
    Token.schema,
    new Token())
    .length;

const TOKEN_ACCOUNT_SIZE = borsh.serialize(
    TokenAccount.schema,
    new TokenAccount())
    .length;

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
    console.log('getting connection')
    const rpcUrl = await getRpcUrl();
    connection = new Connection(rpcUrl, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', rpcUrl, version);
}

/**
 * Establish an account to pay for creating the new token and performing transactions
 */
export async function establishPayer(): Promise<void> {
    let fees = 0;
    if (!payer) {
        const { feeCalculator } = await connection.getRecentBlockhash();

        // Calculate the cost to fund the greeter account
        fees += await connection.getMinimumBalanceForRentExemption(NEW_TOKEN_SIZE);

        // Calculate the cost of sending transactions
        fees += feeCalculator.lamportsPerSignature * 100; // wag

        payer = await getPayer();
    }

    let lamports = await connection.getBalance(payer.publicKey);
    if (lamports < fees) {
        // If current balance is not enough to pay for fees, request an airdrop
        const sig = await connection.requestAirdrop(
            payer.publicKey,
            fees - lamports,
        );
        await connection.confirmTransaction(sig);
        lamports = await connection.getBalance(payer.publicKey);
    }

    console.log(
        'Using account',
        payer.publicKey.toBase58(),
        'containing',
        lamports / LAMPORTS_PER_SOL,
        'SOL to pay for fees',
    );
}

/**
 * Check if the token BPF program has been deployed
 */
export async function checkProgram(): Promise<void> {
    // Read program id from keypair file
    try {
        const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
        programId = programKeypair.publicKey;
    } catch (err) {
        const errMsg = (err as Error).message;
        throw new Error(
            `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/program_token.so\``,
        );
    }

    // Check if the program has been deployed
    const programInfo = await connection.getAccountInfo(programId);
    if (programInfo === null) {
        if (fs.existsSync(PROGRAM_SO_PATH)) {
            throw new Error(
                'Program needs to be deployed with `solana program deploy dist/program/program_token.so`',
            );
        } else {
            throw new Error('Program needs to be built and deployed');
        }
    } else if (!programInfo.executable) {
        throw new Error(`Program is not executable`);
    }
    console.log(`Using program ${programId.toBase58()}`);
    console.log('-----------------------------------------------------------------------------------------------------------------')
}

/**
 * Say GM
 */
export async function createToken(): Promise<void> {

    // First we'll check to see if the master token account has been created aready, and if not we'll create it
    tokenPubkey = await PublicKey.createWithSeed(
        payer.publicKey,
        TOKEN_NAME,
        programId,
    );

    const masterTokenAccount = await connection.getAccountInfo(tokenPubkey);

    if (masterTokenAccount === null) {
        //master token doesn't exist, create it

        console.log(
            'Creating account',
            tokenPubkey.toBase58(),
            'for our new token',
        );
        const lamports = await connection.getMinimumBalanceForRentExemption(
            NEW_TOKEN_SIZE,
        );

        const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
                fromPubkey: payer.publicKey,
                basePubkey: payer.publicKey,
                seed: TOKEN_NAME,
                newAccountPubkey: tokenPubkey,
                lamports,
                space: NEW_TOKEN_SIZE,
                programId,
            }),
        );
        await sendAndConfirmTransaction(connection, transaction, [payer]);


        console.log('Creating token ', TOKEN_NAME, ' with key ', tokenPubkey.toBase58());

        // Create new master token
        //first we serialize the name data.
        let tokenInstruction = new TokenInstructionNoAmount({ "instruction": 0}) //instruction is 0 (create token)
        let data = borsh.serialize(TokenInstructionNoAmount.schema, tokenInstruction);
        let dataBuffer = Buffer.from(data)

        //now we generate the instruction
        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: tokenPubkey, isSigner: false, isWritable: true },
                { pubkey: payer.publicKey, isSigner: false, isWritable: false },
            ],
            programId,
            data: dataBuffer
        });
        await sendAndConfirmTransaction(
            connection,
            new Transaction().add(instruction),
            [payer],
        );

        console.log('Token successfully created at address ', tokenPubkey.toBase58())

    } else {
        console.log('Master Token already created at address ', tokenPubkey.toBase58())
    }
    console.log('-----------------------------------------------------------------------------------------------------------------')
}

export async function createNewKeyPair(seed: string): Promise<PublicKey> {

    console.log('Creating new keypair for seed: ', seed);

    //first we create the account and see if it exists already on-chain
    tokenAccountPubkey = await PublicKey.createWithSeed(
        payer.publicKey,
        seed,
        programId,
    );

    //only create account if it doesn't already exist
    const tokenAcct = await connection.getAccountInfo(tokenAccountPubkey);
    if (tokenAcct === null) {

        const lamportsTokenAccount = await connection.getMinimumBalanceForRentExemption(
            TOKEN_ACCOUNT_SIZE,
        );

        //build up the instruction to create the account
        const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
                fromPubkey: payer.publicKey,
                basePubkey: payer.publicKey,
                seed: seed,
                newAccountPubkey: tokenAccountPubkey,
                lamports: lamportsTokenAccount,
                space: TOKEN_ACCOUNT_SIZE,
                programId,
            }),
        );
        await sendAndConfirmTransaction(
            connection,
            transaction,
            [payer],
        );

        console.log('created account for Public Key ', tokenAccountPubkey.toBase58())


        //now that we've created the account, we can register is as a token account
        await createTokenAccount(tokenAccountPubkey)

    } else {
        console.log('Token Account ', tokenAccountPubkey.toBase58(), ' already exists, skipping creation')
    }


    return tokenAccountPubkey
}


export async function createTokenAccounts(): Promise<void> {

    //first we need to create two public keys for the from and to accounts
    console.log('Creating from and to accounts for token ', tokenPubkey.toBase58());
    tokenFromAccountPubkey = await createNewKeyPair(FROM_ACCT_SEED)
    tokenToAccountPubkey = await createNewKeyPair(TO_ACCT_SEED)

    console.log('-----------------------------------------------------------------------------------------------------------------')
}

export async function createTokenAccount(tokenKey: PublicKey): Promise<void> {

    //first we serialize the instruction data
    let tokenInstruction = new TokenInstructionNoAmount({ "instruction": 1 })  //1 = create token account
    let data = borsh.serialize(TokenInstructionNoAmount.schema, tokenInstruction);
    let dataBuffer = Buffer.from(data)

    //now we build up the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: tokenKey, isSigner: false, isWritable: true },
            { pubkey: tokenPubkey, isSigner: false, isWritable: true },
            { pubkey: payer.publicKey, isSigner: false, isWritable: false }
        ],
        programId,
        data: dataBuffer
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );


    console.log('Token Account created for ', tokenKey.toBase58())
}



export async function mint(): Promise<void> {
    const MINT_AMOUNT = 100
    console.log('Minting ', MINT_AMOUNT, 'tokens of ', TOKEN_NAME, ' with key ', tokenPubkey.toBase58(), ' to account ', tokenFromAccountPubkey.toBase58());

    //first we serialize the instruction data
    let tokenMintInstruction = new TokenInstruction({ "instruction": 2, "amount": MINT_AMOUNT })  //2 = mint tokens to account
    let data = borsh.serialize(TokenInstruction.schema, tokenMintInstruction);
    let dataBuffer = Buffer.from(data)


    //now we build up the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: tokenFromAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: tokenPubkey, isSigner: false, isWritable: true },
            { pubkey: payer.publicKey, isSigner: false, isWritable: false }
        ],
        programId,
        data: dataBuffer
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );


    console.log('getting account info for ', tokenFromAccountPubkey.toBase58())
    await getAccountTokenInfo(tokenFromAccountPubkey)
    console.log('-----------------------------------------------------------------------------------------------------------------')
}


export async function transfer(): Promise<void> {
    const TRANSFER_AMOUNT = 5
    console.log('Transferring', TRANSFER_AMOUNT, 'of', tokenPubkey.toBase58(), 'tokens from', tokenFromAccountPubkey.toBase58(), 'to', tokenToAccountPubkey.toBase58());

    //first we serialize the instruction data
    let tokenTransferInstruction = new TokenInstruction({ "instruction": 3, "amount": TRANSFER_AMOUNT })  //3 = transfer tokens
    let data = borsh.serialize(TokenInstruction.schema, tokenTransferInstruction);
    let dataBuffer = Buffer.from(data)


    //now we build up the instruction
    const instruction = new TransactionInstruction({
        keys: [
            { pubkey: tokenFromAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: tokenToAccountPubkey, isSigner: false, isWritable: true },
            { pubkey: payer.publicKey, isSigner: false, isWritable: false }
        ],
        programId,
        data: dataBuffer
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );
    await getAccountTokenInfo(tokenFromAccountPubkey)
    await getAccountTokenInfo(tokenToAccountPubkey)
    console.log('-----------------------------------------------------------------------------------------------------------------')

}

// Helper function to print the balance of a token account
export async function getAccountTokenInfo(account: PublicKey): Promise<void> {
    const acct = await connection.getAccountInfo(account, 'processed');
    const data = Buffer.from(acct!.data);
    const accountInfo = borsh.deserializeUnchecked(TokenAccount.schema, TokenAccount, data)
    console.log('account info for ', account.toBase58() + ': token address:', new PublicKey(accountInfo.token).toBase58(), ', balance:', accountInfo.amount.toString())
}
