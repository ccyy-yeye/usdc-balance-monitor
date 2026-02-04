---
name: usdc-balance-monitor
description: "Enhanced multi-chain USDC balance monitor with history tracking, alerts, and summary."
metadata: {"openclaw": {"emoji": "💰", "homepage": "https://github.com/ccyy-yeye/usdc-balance-monitor"}}
---

# Enhanced USDC Balance Monitor 💰

An advanced OpenClaw skill for monitoring testnet USDC balances across multiple chains with **history tracking, automatic alerts, and multi-chain summary**.

## Features

- **Multi-chain support:** Ethereum Sepolia, Base Sepolia, Polygon Amoy
- **Multiple addresses:** Monitor multiple wallet addresses simultaneously
- **Configurable thresholds:** Set custom alert thresholds for each address
- **Balance history:** Track changes over time (up to 100 records per address)
- **Change detection:** Identify balance changes (increase/decrease)
- **Auto-alert:** Send notifications when balance drops below threshold
- **Summary view:** Total balance across all monitored chains with breakdown by chain
- **Address management:** Add/remove addresses dynamically

## Configuration

Config is automatically created at `~/clawd/usdc-balance-config.json` when you add your first address.

```json
{
  "addresses": [
    {
      "name": "My Wallet",
      "address": "0x1234...",
      "chain": "ethereum",
      "threshold": "10"
    }
  ]
}
```

## Supported Chains

| Chain | Network | USDC Address (Testnet) | RPC |
|-------|---------|----------------------|------|
| Ethereum | Sepolia | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` | `https://sepolia.drpc.org` |
| Base | Sepolia | `0x036CbD5d42Ac945dE1e26898767295A641fD0479` | `https://sepolia.base.org` |
| Polygon | Amoy | `0x41E94Eb019C0762f367d466C86A7c4F4A80Ab8eb` | `https://rpc-amoy.polygon.technology` |

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

### Remove Address

```bash
clawdbot run "Remove 0x1234... from ethereum"
```

### View History

```bash
clawdbot run "Show balance history for 0x1234... on ethereum last 20 records"
```

### Get Summary

```bash
clawdbot run "Show USDC balance summary"
```

Shows total balance across all chains and breakdown by network.

## Why This Matters

AI agents managing testnet wallets need:

1. **Historical tracking** - Know when and how balances changed
2. **Proactive alerts** - Get notified before running out of testnet USDC
3. **Multi-chain visibility** - See all holdings at a glance
4. **Change detection** - Identify suspicious activity or unexpected deposits
5. **Agent-native interface** - No human intervention needed

## Technical Details

The skill uses public RPC endpoints to query ERC-20 token balances:

**USDC decimals:** 6
**Function:** `balanceOf(address)`

Balance queries are read-only operations - no private keys or signing required.

## Enhanced Features

### 📊 History Tracking
- Saves up to 100 records per address
- Tracks timestamp, balance, and change amount
- Identifies increases, decreases, and zero-balance events

### ⚠️ Smart Alerts
- Automatic notification when balance drops below threshold
- Visual alert with current vs threshold comparison
- Per-address customization

### 📈 Change Detection
- Compares current balance with last recorded balance
- Shows exact change amount and direction
- Helps track spending and deposits

### 💵 Multi-Chain Summary
- Aggregates total balance across all monitored addresses
- Breakdown by chain (Ethereum, Base, Polygon)
- Real-time calculation

## Security

- **Read-only:** No signing or transactions
- **Local storage:** Config and history stored locally
- **Testnet only:** No risk to mainnet funds
- **No credentials:** No private keys stored or transmitted

## Limitations

- Testnet only (per hackathon rules)
- Read-only (cannot transfer USDC)
- Dependent on RPC endpoint availability
- Balance updates may have slight delays due to block times

## Future Enhancements

- Add support for more chains (Arbitrum, Optimism)
- Integration with CCTP for cross-chain balance monitoring
- Graph visualization of balance history
- Export history to CSV/JSON
- Real-time WebSocket-based updates (when supported)
