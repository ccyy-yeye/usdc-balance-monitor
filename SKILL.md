---
name: usdc-balance-monitor
description: "Monitor testnet USDC balances across multiple chains (Ethereum, Base, Polygon) and alert when balance drops below threshold."
metadata: {"openclaw": {"emoji": "💰", "homepage": "https://github.com/clawdbot/usdc-balance-monitor"}}
---

# Testnet USDC Balance Monitor 💰

An OpenClaw skill that monitors testnet USDC balances across multiple chains and sends alerts when balance drops below a configurable threshold.

## Features

- **Multi-chain support:** Ethereum Sepolia, Base Sepolia, Polygon Amoy
- **Multiple addresses:** Monitor multiple wallet addresses
- **Configurable thresholds:** Set custom alert thresholds for each address
- **Auto-alert:** Send notifications when balance drops below threshold
- **Quick query:** Check current balance on demand

## Configuration

Create a config file at `~/clawd/usdc-balance-config.json`:

```json
{
  "addresses": [
    {
      "name": "Wallet 1",
      "address": "0x1234...",
      "chain": "ethereum",
      "threshold": "10"
    },
    {
      "name": "Wallet 2",
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

### Check Balance

```bash
clawdbot run "Check USDC balance for 0x1234... on ethereum sepolia"
```

The skill will respond with the current USDC balance.

### Set Alert Threshold

```bash
clawdbot run "Set USDC alert threshold to 5 for 0x1234... on ethereum sepolia"
```

The skill will alert you when the balance drops below 5 USDC.

### Monitor All Addresses

```bash
clawdbot run "Check all USDC balances"
```

The skill will check all configured addresses and report their current balances.

## Why This Matters

AI agents often manage multiple testnet wallets across different chains. This skill provides:

1. **Automated monitoring** - No need to manually check balances
2. **Proactive alerts** - Get notified before running out of testnet USDC
3. **Multi-chain support** - Manage balances across Ethereum, Base, and Polygon
4. **Agent-friendly** - Easy integration with other OpenClaw skills

## Technical Details

The skill uses public RPC endpoints to query ERC-20 token balances:

- **Ethereum Sepolia:** `https://rpc.sepolia.org`
- **Base Sepolia:** `https://sepolia.base.org`
- **Polygon Amoy:** `https://rpc-amoy.polygon.technology`

Balance queries use the standard ERC-20 `balanceOf` function:

```solidity
function balanceOf(address account) external view returns (uint256)
```

USDC uses 6 decimals, so the balance is divided by 1,000,000 for display.

## Security

- This skill only reads from the blockchain (read-only operations)
- No private keys or signing required
- Only queries public RPC endpoints
- No sensitive data is stored or transmitted

## Limitations

- Testnet only (as per hackathon rules)
- Read-only (cannot transfer USDC)
- Depends on RPC endpoint availability
- Balance updates may have slight delays due to block times

## Future Enhancements

- Add support for more chains (Arbitrum, Optimism)
- Transaction history tracking
- Automatic testnet faucet integration
- Integration with CCTP for cross-chain balance monitoring
