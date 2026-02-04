#!/usr/bin/env node

/**
 * Enhanced USDC Balance Monitor
 * Multi-chain balance tracking, history, and alerts
 */

const fs = require('fs');
const path = require('path');

// Load balance-checker module
const { getUSDCBalance, formatAddress, USDC_ADDRESSES, RPC_ENDPOINTS } = require('./balance-checker.js');

// Config file path
const CONFIG_PATH = path.join(process.env.HOME, 'clawd', 'usdc-balance-config.json');
const HISTORY_PATH = path.join(process.env.HOME, 'clawd', 'usdc-balance-history.json');

/**
 * Load configuration
 */
function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  }
  return { addresses: [] };
}

/**
 * Save configuration
 */
function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

/**
 * Load balance history
 */
function loadHistory() {
  if (fs.existsSync(HISTORY_PATH)) {
    return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
  }
  return { records: [] };
}

/**
 * Save balance record to history
 */
function saveHistory(history) {
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));
}

/**
 * Add balance record
 */
function addBalanceRecord(address, chain, balance, change) {
  const history = loadHistory();
  const record = {
    timestamp: new Date().toISOString(),
    address,
    chain,
    balance,
    change,
    formattedBalance: balance.toFixed(2)
  };
  history.records.push(record);

  // Keep only last 100 records per address
  const recentRecords = history.records
    .filter(r => r.address === address && r.chain === chain)
    .slice(-100);

  saveHistory({ records: recentRecords });
}

/**
 * Compare balances and find changes
 */
async function checkBalances() {
  const config = loadConfig();
  const history = loadHistory();

  console.log('\n💰 Enhanced USDC Balance Monitor (Testnet)\n');

  for (const addr of config.addresses) {
    const { name, address, chain, threshold } = addr;

    try {
      const currentBalance = await getUSDCBalance(address, chain);

      // Find last balance
      const lastRecord = history.records
        .filter(r => r.address === address && r.chain === chain)
        .slice(-1)[0];

      const lastBalance = lastRecord ? lastRecord.balance : 0;
      const change = currentBalance - lastBalance;

      console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📊 ${name || address} (${chain.toUpperCase()})`);
      console.log(`🔗 ${formatAddress(address)}`);
      console.log(`💰 Balance: ${currentBalance.toFixed(2)} USDC`);

      if (lastRecord) {
        console.log(`📈 Change: ${change > 0 ? '+' : ''}${change.toFixed(2)} USDC`);
        console.log(`🕐 Previous: ${lastBalance.toFixed(2)} USDC (${lastRecord.timestamp})`);
      } else {
        console.log(`🆕 First check - no history`);
      }

      // Alert if below threshold
      if (threshold && currentBalance < Number(threshold)) {
        console.log(`\n⚠️  ALERT: Balance below threshold (${threshold} USDC)!`);
        console.log(`📉 Current: ${currentBalance.toFixed(2)} USDC < Threshold: ${threshold} USDC\n`);
      } else {
        console.log(`✅ Balance OK${threshold ? ` (≥ ${threshold} USDC)` : ''}`);
      }

      // Save record
      addBalanceRecord(address, chain, currentBalance, change);

    } catch (error) {
      console.error(`❌ Error checking ${name}: ${error.message}\n`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

/**
 * Show history for an address
 */
function showHistory(address, chain, limit = 10) {
  const history = loadHistory();
  const records = history.records
    .filter(r => r.address === address && r.chain === chain)
    .slice(-limit);

  if (records.length === 0) {
    console.log(`\n❌ No history found for ${formatAddress(address)} on ${chain.toUpperCase()}\n`);
    return;
  }

  console.log(`\n📊 Balance History for ${formatAddress(address)} (${chain.toUpperCase()})\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  for (const record of records.reverse()) {
    const date = new Date(record.timestamp).toLocaleString('zh-CN');
    const changeStr = record.change > 0 ? `+${record.change.toFixed(2)}` : record.change.toFixed(2);
    const changeIcon = record.change > 0 ? '📈' : (record.change < 0 ? '📉' : '➡️');

    console.log(`${changeIcon} ${date} | ${record.formattedBalance} USDC`);
  }
}

/**
 * Add new address to config
 */
function addAddress(name, address, chain, threshold = '0') {
  const config = loadConfig();

  // Check if address already exists
  const exists = config.addresses.find(a => a.address === address && a.chain === chain);
  if (exists) {
    console.log(`\n⚠️ Address already configured: ${formatAddress(address)} on ${chain.toUpperCase()}\n`);
    return false;
  }

  config.addresses.push({ name, address, chain, threshold: Number(threshold) });
  saveConfig(config);

  console.log(`\n✅ Added ${name || address} to monitoring`);
  console.log(`📍 Chain: ${chain.toUpperCase()}`);
  console.log(`🔗 Address: ${formatAddress(address)}`);
  console.log(`📉 Threshold: ${threshold} USDC\n`);

  return true;
}

/**
 * Remove address from config
 */
function removeAddress(address, chain) {
  const config = loadConfig();
  config.addresses = config.addresses.filter(a => !(a.address === address && a.chain === chain));

  if (config.addresses.length === 0) {
    console.log(`\n❌ No more addresses in config\n`);
  } else {
    saveConfig(config);
    console.log(`\n✅ Removed ${formatAddress(address)} from ${chain.toUpperCase()}\n`);
  }
}

/**
 * Show summary
 */
function showSummary() {
  const config = loadConfig();
  const history = loadHistory();

  console.log('\n💰 USDC Balance Monitor Summary\n');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  console.log(`\n📋 Monitored Addresses: ${config.addresses.length}`);
  for (const addr of config.addresses) {
    console.log(`  - ${addr.name || formatAddress(addr.address)} (${addr.chain.toUpperCase()}): threshold=${addr.threshold} USDC`);
  }

  console.log(`\n📊 Total Records: ${history.records.length}`);

  // Calculate total balance
  let totalBalance = 0;
  const chainTotals = {};

  for (const addr of config.addresses) {
    try {
      const balance = await getUSDCBalance(addr.address, addr.chain);
      totalBalance += balance;

      if (!chainTotals[addr.chain]) {
        chainTotals[addr.chain] = 0;
      }
      chainTotals[addr.chain] += balance;
    } catch (error) {
      // Skip on error
    }
  }

  console.log(`\n💵 Total Balance (All Chains): ${totalBalance.toFixed(2)} USDC`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  for (const [chain, total] of Object.entries(chainTotals)) {
    console.log(`📍 ${chain.toUpperCase()}: ${total.toFixed(2)} USDC`);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════╗
║     Enhanced USDC Balance Monitor (Testnet)      ║
╠══════════════════════════════════════╣
║ Usage:                                        ║
║   node balance-monitor.js <command>              ║
╠══════════════════════════════════════╣
║ Commands:                                     ║
║   check              - Check all balances          ║
║   add <name> <addr> <chain> [threshold]     ║
║   remove <addr> <chain>                  ║
║   history <addr> <chain> [limit]           ║
║   summary             - Show total summary         ║
╚══════════════════════════════════════════╝

Chains: ethereum, base, polygon

Examples:
  node balance-monitor.js check
  node balance-monitor.js add "My Wallet" 0x1234... ethereum 5
  node balance-monitor.js history 0x1234... ethereum 20
  node balance-monitor.js summary
`);
    process.exit(1);
  }

  const command = args[0];

  switch (command) {
    case 'check':
      await checkBalances();
      break;

    case 'add':
      if (args.length < 3) {
        console.log('Usage: add <name> <address> <chain> [threshold]');
        process.exit(1);
      }
      addAddress(args[1], args[2], args[3] || '0');
      break;

    case 'remove':
      if (args.length < 3) {
        console.log('Usage: remove <address> <chain>');
        process.exit(1);
      }
      removeAddress(args[1], args[2]);
      break;

    case 'history':
      if (args.length < 2) {
        console.log('Usage: history <address> <chain> [limit]');
        process.exit(1);
      }
      showHistory(args[1], args[2], args[3] ? parseInt(args[3]) : 10);
      break;

    case 'summary':
      await showSummary();
      break;

    default:
      console.log(`\n❌ Unknown command: ${command}`);
      process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
