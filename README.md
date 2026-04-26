# 🛡️ PrivaPay: Private Recurring Payroll on Solana

PrivaPay is a decentralized payroll protocol built on Solana that brings enterprise-grade confidentiality to Web3 HR. Leveraging stealth address mechanics and client-side cryptography, PrivaPay allows employers to execute batch USDC salary payouts while keeping recipient addresses and transaction amounts completely hidden on-chain.

## 🌟 The Problem
Web3 companies want to pay their teams in crypto, but public ledgers are toxic for HR. Nobody wants their coworkers, competitors, or the public knowing their exact salary. Currently, utilizing public blockchains for operational payroll breaches basic corporate confidentiality.

## 💡 The Solution
PrivaPay allows employers to execute payments to **one-time stealth addresses** generated entirely client-side. To bridge the gap between privacy and real-world utility, PrivaPay introduces **Salary Proof**—a selective disclosure feature allowing employees to generate cryptographically signed, verifiable income statements (JSON/PDF) for visas or rentals without exposing their transaction history.

---

## 🏗️ Technical Architecture

PrivaPay abstracts the complexity of stealth transactions into a seamless, Web2-style SaaS dashboard. Here is how the cryptographic flow works under the hood:

```mermaid
  sequenceDiagram
    autonumber
    actor Employer
    participant UI as PrivaPay Client (Next.js)
    participant Contract as Solana Program (Anchor)
    participant Stealth as Stealth Addresses
    actor Employee

    Employer->>UI: Connects Treasury & Uploads Payroll Roster
    UI->>UI: Generates Unique Stealth Addresses for each employee (Client-side)
    UI->>Contract: Submits Batch Transaction (Encrypted Payload)
    Contract->>Stealth: Routes USDC to disconnected stealth addresses
    Note over Contract, Stealth: Public ledger only sees random addresses & encrypted amounts
    
    Employee->>UI: Connects Wallet & Provides Viewing Key
    UI->>UI: Scans chain & locally decrypts matching stealth transactions
    UI->>Employee: Generates ZK "Salary Proof" (Verifiable PDF/JSON)
    ```
