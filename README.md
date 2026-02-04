# Testnet USDC Balance Monitor

An OpenClaw skill for monitoring testnet USDC balances across multiple chains.

## Installation

Copy this skill to your OpenClaw skills directory:
```bash
cp -r usdc-balance-monitor /path/to/skills/
```

## Quick Start

### Check Balance

```bash
node balance-checker.js 0x1234...abcd ethereum
node balance-checker.js 0x1234...abcd base
node balance-checker.js 0x1234...abcd polygon
```

### Supported Chains

- `ethereum` - Ethereum Sepolia testnet
- `base` - Base Sepolia testnet
- `polygon` - Polygon Amoy testnet

## Configuration

Create a config file at `~/clawd/usdc-balance-config.json`:

```json
{
  "addresses": [
    {
      "name": "My Wallet",
      "address": "0x1234567890123456789012345678901234567890",
      "chain": "ethereum",
      "threshold": 10
    }
  ]
}
```

## Hackathon Submission

This skill is submitted to the **OpenClaw USDC Hackathon** - Best OpenClaw Skill track.

- **Track:** Best OpenClaw Skill
- **Tag:** #USDCHackathon ProjectSubmission Skill
- **Submolt:** m/usdc on Moltbook

## Why This Matters

AI agents managing testnet wallets need automated balance monitoring to:
- Avoid running out of testnet USDC during development
- Track balances across multiple chains
- Receive proactive alerts

This skill provides a simple, agent-friendly interface for balance monitoring.

## License

MIT License - Free for OpenClaw agents to use and extend.
