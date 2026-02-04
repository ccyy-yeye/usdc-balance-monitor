---
name: usdc-balance-monitor
description: "Multi-chain USDC balance monitor with change detection, history tracking, and alerts."
metadata: {"openclaw": {"emoji": "💰", "homepage": "https://github.com/ccyy-yeye/usdc-balance-monitor"}}
---

# USDC Balance Monitor 💰

A multi-chain USDC balance monitor for AI agents managing testnet wallets across Ethereum Sepolia, Base Sepolia, and Polygon Amoy.

## Features

- **Multi-chain support:** Query USDC balances across Ethereum Sepolia, Base Sepolia, Polygon Amoy
- **Change detection:** Identify balance increases, decreases, and zero-balance events with trend analysis
- **History tracking:** Save up to 100 balance records per address with timestamps
- **Alert system:** Automatic notifications when balance drops below threshold
- **Address management:** Add, remove, and organize multiple wallet addresses

## Configuration

Config file: `~/clawd/usdc-balance-config.json`

```json
{
  "addresses": [
    {
      "name": "My Wallet",
      "address": "0x1234...",
      "chain": "ethereum",
      "threshold": "10"
    },
    {
      "name": "Production Wallet",
      "address": "0x5678...",
      "chain": "base",
      "threshold": "5"
    }
  ]
}
```

## Supported Chains

| Chain | Network | USDC Address (Testnet) |
|-------|---------|----------------------|
| Ethereum | Sepolia | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` |
| Base | Sepolia | `0x036CbD5d42Ac945dE1e26898767295A641fD0479` |
| Polygon | Amoy | `0x41E94Eb019C0762f367d466C86A7c4F4A80Ab8eb` |

## Usage

### Check All Balances

```bash
clawdbot run "Check all USDC balances"
```

Shows all monitored addresses with current balances, changes from last check, and alerts if below threshold.

### Add New Address

```bash
clawdbot run "Add wallet 0x1234... on ethereum with threshold 5"
```

### View History

```bash
clawdbot run "Show balance history for 0x1234... on ethereum last 20 records"
```

### Get Summary

```bash
clawdbot run "Show USDC balance summary"
```

Shows total balance across all monitored addresses with breakdown by chain.

## Why This Matters

AI agents managing multiple testnet USDC wallets need:

1. **Automated monitoring** - No need to manually check balances
2. **Proactive alerts** - Get notified before running out of testnet USDC
3. **Multi-chain support** - Manage balances across Ethereum, Base, and Polygon
4. **Change tracking** - Identify deposits, spending, and unusual activity
5. **Agent-friendly** - Easy integration with other OpenClaw skills

## Technical Details

The skill uses public RPC endpoints to query ERC-20 token balances:

- **Ethereum Sepolia:** `https://sepolia.drpc.org`
- **Base Sepolia:** `https://sepolia.base.org`
- **Polygon Amoy:** `https://rpc-amoy.polygon.technology`

Balance queries use the standard ERC-20 `balanceOf` function:

```solidity
function balanceOf(address account) external view returns (uint256)
```

USDC uses 6 decimals, so balance is divided by 1,000,000 for display.

## Security

- This skill only reads from the blockchain (read-only operations)
- No private keys or signing required
- Only queries public RPC endpoints
- No sensitive data is stored or transmitted

## Limitations

- Testnet only (as per hackathon rules)
- Read-only (cannot transfer USDC)
- Dependent on RPC endpoint availability
- Balance updates may have slight delays due to block times

## License

MIT License - Free for OpenClaw agents to use and extend.
