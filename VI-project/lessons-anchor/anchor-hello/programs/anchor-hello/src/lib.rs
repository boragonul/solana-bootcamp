use anchor_lang::prelude::*;

declare_id!("62rvHGofBUPkfEX7igrci4AA9txzemq8CMyVijLBbzzC");

#[program]
pub mod anchor_hello {
    use super::*;

    pub fn execute(ctx: Context<Execute>, name: String) -> Result<()> {
        let hello_account = &mut ctx.accounts.hello_account;
        hello_account.name = name;

        msg!("Hello {} !", hello_account.name);

        Ok(())
    }
}

#[account]
pub struct HelloAccount {
    pub name: String,
}

#[derive(Accounts)]
pub struct Execute<'info> {
    #[account(init, payer = user, space = 8 + 32)]
    pub hello_account: Account<'info, HelloAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
