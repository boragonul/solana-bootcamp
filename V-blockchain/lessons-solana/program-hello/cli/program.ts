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
 * Hello world's program id
 */
let programId: PublicKey;

/**
 * The public key of the account we are saying hello to
 */
let helloPubkey: PublicKey;

/**
 * Path to program files
 */
const PROGRAM_PATH = path.resolve(__dirname, '../dist/program');

/**
 * Path to program shared object file which should be deployed on chain.
 */
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'program_hello.so');

/**
 * Path to the keypair of the deployed program.
 */
const PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'program_hello-keypair.json');

const NAME_FOR_HELLO='Bora Gönül'

/**
 * Borsh class and schema definition for accounts
 */

class HelloAccount {
    name = "";
    constructor(fields: {name: string} | undefined = undefined) {
      if (fields) {
        this.name = fields.name;
      }
    }
    static schema = new Map([[HelloAccount,
        {
            kind: 'struct',
            fields: [
                ['name', 'string']]
        }]]);
}


/**
 * The expected size of each account. Used for creating the buffer
 */
const HELLO_SIZE = borsh.serialize(
    HelloAccount.schema,
    new HelloAccount({ name: NAME_FOR_HELLO }))
.length;

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
    const rpcUrl = await getRpcUrl();
    connection = new Connection(rpcUrl, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', rpcUrl, version);
}

/**
 * Establish an account to pay for everything
 */
export async function establishPayer(): Promise<void> {
    let fees = 0;
    if (!payer) {
        const { feeCalculator } = await connection.getRecentBlockhash();

        // Calculate the cost to fund the account
        fees += await connection.getMinimumBalanceForRentExemption(HELLO_SIZE);

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
 * Check if the program has been deployed
 */
export async function checkProgram(): Promise<void> {
    // Read program id from keypair file
    try {
        const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
        programId = programKeypair.publicKey;
    } catch (err) {
        const errMsg = (err as Error).message;
        throw new Error(
            `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/program_hello.so\``,
        );
    }

    // Check if the program has been deployed
    const programInfo = await connection.getAccountInfo(programId);
    if (programInfo === null) {
        if (fs.existsSync(PROGRAM_SO_PATH)) {
            throw new Error(
                'Program needs to be deployed with `solana program deploy dist/program/program_hello.so`',
            );
        } else {
            throw new Error('Program needs to be built and deployed');
        }
    } else if (!programInfo.executable) {
        throw new Error(`Program is not executable`);
    }
    console.log(`Using program ${programId.toBase58()}`);

    // Derive the address (public key) of an account from the program so that it's easy to find later.
    helloPubkey = await PublicKey.createWithSeed(
        payer.publicKey,
        NAME_FOR_HELLO,
        programId,
    );

    // Check if the account has already been created
    const helloAccount = await connection.getAccountInfo(helloPubkey);
    if (helloAccount === null) {
        console.log(
            'Creating account',
            helloPubkey.toBase58(),
            'to say hello to',
        );
        const lamports = await connection.getMinimumBalanceForRentExemption(
            HELLO_SIZE,
        );

        const transaction = new Transaction().add(
            SystemProgram.createAccountWithSeed({
                fromPubkey: payer.publicKey,
                basePubkey: payer.publicKey,
                seed: NAME_FOR_HELLO,
                newAccountPubkey: helloPubkey,
                lamports,
                space: HELLO_SIZE,
                programId,
            }),
        );
        await sendAndConfirmTransaction(connection, transaction, [payer]);
    }
}

/**
 * Say Hello
 */
export async function sayHello(): Promise<void> {

    console.log('Saying hello to ',NAME_FOR_HELLO, ' with key ', helloPubkey.toBase58());

    //first we serialize the name data

    let hello = new HelloAccount({
        name: NAME_FOR_HELLO
    })


    let data = borsh.serialize(HelloAccount.schema, hello);
    const data_to_send = Buffer.from(data);
    console.log(data_to_send)

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: helloPubkey, isSigner: false, isWritable: true }],
        programId,
        data: data_to_send
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payer],
    );
}

/**
 * Report the name of the account that we said hello to
 */
export async function reportHello(): Promise<void> {
    const accountInfo = await connection.getAccountInfo(helloPubkey);
    if (accountInfo === null) {
        throw 'Error: cannot find the hello account';
    }
    const hello = borsh.deserialize(
        HelloAccount.schema,
        HelloAccount,
        accountInfo.data,
    );
    console.log(
        helloPubkey.toBase58(),
        'Hello was said to ',
        hello.name
    );
}