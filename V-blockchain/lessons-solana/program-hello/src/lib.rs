// 1) we want to use `Borsh` for serialize/deserialize
use borsh::{BorshDeserialize, BorshSerialize};

// 2) define the program as a `Solana` program that takes
//    standart parameter inputs
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey
};

// 3) Create a struct `HelloAccount` that will define how we read
//    and store data in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct HelloAccount {
    pub name: String,
}

// 4) declare and export the program's entrypoint
entrypoint!(process_instruction);

// 5) define the skeleton process_instruction function
pub fn process_instruction(
    program_id: &Pubkey,        // public key of the program `HelloProgram` will be loaded into
    accounts: &[AccountInfo],   // the account to say `hello !` to is in this slice
    input: &[u8]                // input data, contains the `name` to say `hello !` to
) -> ProgramResult {

    // 6) iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // 7) get the first account to say `hello !` to
    let account = next_account_info(accounts_iter)?;

    // 8) the account must be owned by program in order to modify it's data
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // 9) deserialize the input data store it in a `HelloAccount` struct
    let input_data = HelloAccount::try_from_slice(&input).unwrap();

    // 10) say `hello !` in the program output
    msg!("hello {} !", input_data.name);

    // 11) serialize the name and store it in the passed account
    input_data.serialize(&mut &mut account.try_borrow_mut_data()?[..])?;

    Ok(())
}