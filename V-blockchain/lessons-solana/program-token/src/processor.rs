use borsh::{BorshDeserialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::instruction::TokenInstruction;
use crate::state::{Token, TokenAccount};

pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        _program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = TokenInstruction::try_from_slice(instruction_data)
            .map_err(|_| ProgramError::InvalidInstructionData)?;
        let accounts_iter = &mut accounts.iter();
        msg!("Instruction: {:?}",instruction);
        match instruction {
            TokenInstruction::CreateToken => {
                msg!("Instruction: Create Token");
                //get account info for master token account
                let token_master_account = next_account_info(accounts_iter)?;
                let token_authority = next_account_info(accounts_iter)?;
                let mut token = Token::load_unchecked(token_master_account)?;

                //set default values and save master token account
                token.authority = *token_authority.key;
                token.supply = 0;
                token.save(token_master_account)?


            }
            TokenInstruction::CreateTokenAccount => {
                msg!("Instruction: Create Token Account");
                //get account info for master token account and token account to be created
                let token_account_acct = next_account_info(accounts_iter)?;
                let token_master_account = next_account_info(accounts_iter)?;
                let owner = next_account_info(accounts_iter)?;
                let mut token_account = TokenAccount::load_unchecked(token_account_acct)?;

                //set default values and save token account
                token_account.owner = *owner.key;
                token_account.token = *token_master_account.key;
                token_account.amount = 0;
                token_account.save(token_account_acct)?



            }
            TokenInstruction::Mint { amount } => {
                msg!("Instruction: Mint");
                 //get account info for master token account and token account to mint to
                 let token_account_acct = next_account_info(accounts_iter)?;
                 let token_master_account = next_account_info(accounts_iter)?;
                 let mut token_account = TokenAccount::load(token_account_acct)?;
                 let mut token = Token::load(token_master_account)?;

                 //basic validation, ensure its the master token authority trying to mint
                 let token_authority = next_account_info(accounts_iter)?;
                 if !token_authority.is_signer {
                     msg!("Only the token owner can mint tokens");
                     return Err(ProgramError::MissingRequiredSignature);
                 }

                 //update total supply of the master token, and update balance of token account that received the mint
                 token.supply += amount;
                 token_account.amount += amount;

                 //save updated contents of both accounts
                 token_account.save(token_account_acct)?;
                 token.save(token_master_account)?;


            }
            TokenInstruction::Transfer { amount } => {
                msg!("Instruction: Transfer");
                //get account info for from and to token accounts, as well as master token account
                let from_token_acct = next_account_info(accounts_iter)?;
                let to_token_acct = next_account_info(accounts_iter)?;
                let owner = next_account_info(accounts_iter)?;
                let mut src_token_account = TokenAccount::load(from_token_acct)?;
                let mut dst_token_account = TokenAccount::load(to_token_acct)?;

                //basic validation, ensure sender has enough funds
                if src_token_account.amount <= amount {
                    msg!("Not enough tokens to transfer");
                    return Err(ProgramError::InsufficientFunds);
                }

                //ensure the owner of the from account is the one signing the transaction
                if !owner.is_signer {
                    msg!("Not the token owner signing the transaction");
                    return Err(ProgramError::MissingRequiredSignature);
                }

                //ensure the owner passed in is the actual owner of the token account
                if !(src_token_account.owner == *owner.key) {
                    msg!("Not the token account owner signing the transaction");
                    return Err(ProgramError::MissingRequiredSignature);
                }

                //update values in from and to accounts, then save new contents of both accounts
                src_token_account.amount -= amount;
                dst_token_account.amount += amount;
                src_token_account.save(from_token_acct)?;
                dst_token_account.save(to_token_acct)?;

            }
        }
        Ok(())
    }
}
