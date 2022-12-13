use anchor_lang::prelude::*;

declare_id!("ALE4Tqi7eEaYn5z23MnAQdUXB8FQ8j9TGAw6H7A9qhKi");

#[program]
pub mod anchor_hello_friends {

    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let messages = &mut ctx.accounts.messages;

        messages.count = 0;

        Ok(())
    }

    pub fn say(ctx: Context<Access>, message: String) -> ProgramResult {
        
        emit!(MessageReceived {
            message: message.clone()
        });

        let messages = &mut ctx.accounts.messages;

        let message = message.clone();
        let timestamp = Clock::get().unwrap().unix_timestamp;

        let user = *ctx.accounts.user.to_account_info().key;

        let message = Message {
            user,
            message,
            timestamp,
        };

        messages.list.push(message);
        messages.count += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 1024)]
    pub messages: Account<'info, Messages>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Access<'info> {
    #[account(mut)]
    pub messages: Account<'info, Messages>,
    pub user: Signer<'info>,
}

#[account]
pub struct Messages {
    pub count: u64,
    pub list: Vec<Message>,
}

#[derive(Clone, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct Message {
    pub message: String,
    pub user: Pubkey,
    pub timestamp: i64,
}

#[event]
pub struct MessageReceived {
    pub message: String
}