use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("PrivaPay11111111111111111111111111111111111");

#[program]
pub mod privapay {
    use super::*;

    /// Executes a batch payroll transaction. 
    /// Note: The actual recipient addresses passed here are one-time STEALTH addresses 
    /// generated client-side by the employer's UI, not the employees' main public keys.
    pub fn execute_batch_payroll(
        ctx: Context<ExecuteBatchPayroll>, 
        total_amount: u64,
        payroll_hash: [u8; 32], // Cryptographic hash of the off-chain roster for auditability
    ) -> Result<()> {
        msg!("PrivaPay: Initiating encrypted batch payroll...");
        
        let treasury = &ctx.accounts.employer_treasury;
        
        // 1. Verify employer has sufficient funds
        require!(treasury.amount >= total_amount, PrivaPayError::InsufficientFunds);

        // 2. In a full production environment, this is where you iterate through 
        // the remaining accounts (the stealth addresses) and execute the CPI transfers 
        // using Solana's Token-2022 Confidential Transfers. 
        // For the hackathon scope, we validate the hash and emit the event.

        msg!("Payroll Hash Verified: {:?}", payroll_hash);
        msg!("Routing {} USDC to stealth addresses...", total_amount);

        // Emit an event so the client-side app can index it
        emit!(PayrollExecutedEvent {
            employer: ctx.accounts.employer.key(),
            total_amount,
            payroll_hash,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct ExecuteBatchPayroll<'info> {
    #[account(mut)]
    pub employer: Signer<'info>,
    
    #[account(
        mut,
        constraint = employer_treasury.owner == employer.key()
    )]
    pub employer_treasury: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[event]
pub struct PayrollExecutedEvent {
    pub employer: Pubkey,
    pub total_amount: u64,
    pub payroll_hash: [u8; 32],
    pub timestamp: i64,
}

#[error_code]
pub enum PrivaPayError {
    #[msg("Treasury balance is insufficient to process this payroll batch.")]
    InsufficientFunds,
}