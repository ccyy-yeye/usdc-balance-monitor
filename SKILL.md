---
name: usdc-balance-monitor
description: "Advanced multi-chain USDC balance monitor with real-time alerts, history charts, and notification integration."
metadata: {"openclaw": {"emoji": "💰", "homepage": "https://github.com/ccyy-yeye/usdc-balance-monitor"}}
---

# Advanced USDC Balance Monitor 💰

A professional-grade OpenClaw skill for monitoring testnet USDC balances with **real-time alerts, history charts, address grouping, and multi-chain analytics**.

## Key Features

### 📊 Real-Time Monitoring
- **Live balance updates** via WebSocket (when supported)
- **Instant alerts** when balance drops below threshold
- **Change detection** with trend analysis (up/down/stable)
- **Multi-address support** with grouping and tagging

### 📈 History Analytics
- **Visual charts** showing balance trends over time
- **Change detection** - identify deposits, spending, transfers
- **Export options** - JSON/CSV format
- **Filter by date range** - custom time periods

### 🔔 Notifications
- **Telegram integration** - send alerts to Telegram channels
- **Email support** - email notifications for balance changes
- **Custom alert rules** - percentage drop, absolute threshold, sudden changes

### 🗂 Address Management
- **Address groups** - organize wallets by purpose (dev, production, test)
- **Address tags** - label addresses (personal, team, client)
- **Quick actions** - favorite frequently used addresses
- **Import/Export** - backup and share address lists

## Configuration

Config file: `~/clawd/usdc-balance-config.json`

```json
{
  "addresses": [
    {
      "name": "Dev Wallet",
      "address": "0x1234...",
      "chain": "ethereum",
      "threshold": "50",
      "group": "development",
      "tags": ["personal", "testing"]
    },
    {
      "name": "Production Wallet",
      "address": "0x5678...",
      "chain": "base",
      "threshold": "100",
      "group": "production",
      "tags": ["production", "hot"]
    }
  ],
  "notifications": {
    "telegram": {
      "enabled": true,
      "chat_id": "@your_chat_id",
      "alert_types": ["below_threshold", "sudden_change", "daily_summary"]
    },
    "email": {
      "enabled": false,
      "address": null
    },
    "alert_rules": {
      "percentage_drop": 10,
      "absolute_drop": 5,
      "check_interval": "5m"
    }
  }
}
```

## Advanced Usage

### Check All Balances with Analytics

```bash
clawdbot run "Show detailed USDC balance analytics"
```

Shows balance trends, change patterns, and 30-day statistics.

### Monitor Specific Group

```bash
clawdbot run "Check balances for development group"
```

Monitors only addresses tagged with "development".

### View History Charts

```bash
clawdbot run "Show balance history chart for 0x1234... last 30 days"
```

Generates visual chart of balance changes over time.

### Export History

```bash
clawdbot run "Export balance history to CSV"
```

Exports all history records for external analysis.

## Why This Is Advanced

Compared to basic balance monitors, this skill provides:

| Feature | Basic | Advanced (This Skill) |
|---------|--------|---------------------|
| Alerts | Threshold only | **Multi-type alerts** (percentage, absolute, sudden) |
| History | Text log | **Visual charts** with trends |
| Notifications | None | **Telegram + Email** integration |
| Management | Simple list | **Groups + Tags + Favorites** |
| Analytics | None | **30-day stats + patterns** |
| Export | None | **JSON/CSV export** |

## Technical Implementation

- **WebSocket support** for real-time updates (when available)
- **Chart.js** integration for visualizations
- **Telegram Bot API** for notifications
- **Local SQLite** for persistent history storage
- **Statistical analysis** for trend detection

## Use Cases

### For AI Agents
- Monitor multiple development wallets simultaneously
- Get alerted before running out of testnet USDC
- Track balance changes across weeks/months
- Analyze spending patterns and trends

### For Humans
- Monitor personal and business wallets separately
- Get daily/weekly balance summaries
- Export reports for accounting

## Security

- Read-only operations (no signing)
- Local config storage (encrypted)
- Testnet only (no mainnet funds)
- No credentials transmitted externally
