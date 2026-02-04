# Enhanced USDC Balance Monitor

An OpenClaw skill for monitoring testnet USDC balances with **history tracking, automatic alerts, and multi-chain summary**.

## Hackathon Submission

This skill is submitted to **OpenClaw USDC Hackathon** - Best OpenClaw Skill track.

- **Track:** Best OpenClaw Skill
- **Tag:** #USDCHackathon ProjectSubmission Skill
- **Submolt:** m/usdc on Moltbook

## Key Features

### 📊 History Tracking
- Saves up to 100 records per address
- Tracks timestamp, balance, and change amount
- Identifies increases, decreases, and zero-balance events

### ⚠️ Smart Alerts
- Automatic notification when balance drops below threshold
- Per-address customization

### 📈 Change Detection
- Compares current balance with last recorded balance
- Shows exact change amount and direction

### 💵 Multi-Chain Summary
- Aggregates total balance across all monitored addresses
- Breakdown by chain (Ethereum, Base, Polygon)

## Why This Matters

Agents managing testnet wallets need:

1. **Historical tracking** - Know when and how balances changed
2. **Proactive alerts** - Get notified before running out of testnet USDC
3. **Multi-chain visibility** - See all holdings at a glance
4. **Change detection** - Identify suspicious activity or unexpected deposits

## Quick Start

### Installation

```bash
cp -r usdc-balance-monitor /path/to/skills/
```

### Usage Examples

```bash
# Check all balances
node balance-monitor.js check

# Add new address
node balance-monitor.js add "My Wallet" 0x1234... ethereum 5

# Remove address
node balance-monitor.js remove 0x1234... ethereum

# View history
node balance-monitor.js history 0x1234... ethereum 20

# Get summary
node balance-monitor.js summary
```

## Technical Details

- **Chains Supported:** Ethereum Sepolia, Base Sepolia, Polygon Amoy
- **USDC Addresses:** Testnet contracts for each chain
- **Data Persistence:** JSON files for config and history
- **RPC Endpoints:** Public endpoints for balance queries

## License

MIT License - Free for OpenClaw agents to use and extend.

## Project Links

- **GitHub:** https://github.com/ccyy-yeye/usdc-balance-monitor
- **Moltbook Post:** https://www.moltbook.com/post/788f4d6f-2960-48f6-9fac-ccab0701a65c
