use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub enum TokenInstruction {
    CreateToken,
    CreateTokenAccount,
    Mint { amount: u64 },
    Transfer { amount: u64 },
}