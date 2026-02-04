#!/usr/bin/env node

/**
 * Testnet USDC Balance Checker
 * Queries USDC balances across multiple testnet chains
 */

const https = require('https');

// USDC Contract Addresses (Testnet)
const USDC_ADDRESSES = {
  ethereum: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // Sepolia
  base: '0x036CbD5d42Ac945dE1e26898767295A641fD0479',      // Base Sepolia
  polygon: '0x41E94Eb019C0762f367d466C86A7c4F4A80Ab8eb'     // Polygon Amoy
};

// RPC Endpoints (Testnet)
const RPC_ENDPOINTS = {
  ethereum: 'https://sepolia.drpc.org',
  base: 'https://sepolia.base.org',
  polygon: 'https://rpc-amoy.polygon.technology'
};

// USDC uses 6 decimals
const USDC_DECIMALS = 6;

/**
 * Make JSON-RPC request
 */
function rpcCall(rpcUrl, method, params = []) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(rpcUrl, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response.result);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Encode function call data for balanceOf(address)
 */
function encodeBalanceOf(address) {
  // balanceOf(address) function selector: 0x70a08231
  const funcSelector = '0x70a08231';
  // Pad address to 64 hex characters (32 bytes)
  const addressPadded = address.toLowerCase().replace('0x', '').padStart(64, '0');
  return funcSelector + addressPadded;
}

/**
 * Get USDC balance for an address
 */
async function getUSDCBalance(address, chain) {
  const rpcUrl = RPC_ENDPOINTS[chain];
  const usdcAddress = USDC_ADDRESSES[chain];

  if (!rpcUrl || !usdcAddress) {
    throw new Error(`Unsupported chain: ${chain}`);
  }

  // Call balanceOf(address)
  const callData = encodeBalanceOf(address);

  const result = await rpcCall(rpcUrl, 'eth_call', [{
    to: usdcAddress,
    data: callData
  }, 'latest']);

  // Parse result (hex string to decimal)
  const balanceWei = BigInt(result);
  const balance = Number(balanceWei) / Math.pow(10, USDC_DECIMALS);

  return balance;
}

/**
 * Format address for display
 */
function formatAddress(address) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node balance-checker.js <address> [chain]');
    console.log('Chains: ethereum, base, polygon (default: ethereum)');
    process.exit(1);
  }

  const address = args[0];
  const chain = args[1] || 'ethereum';

  console.log(`\n💰 Checking USDC Balance (Testnet)`);
  console.log(`📍 Chain: ${chain.toUpperCase()}`);
  console.log(`🔗 Address: ${formatAddress(address)}\n`);

  try {
    const balance = await getUSDCBalance(address, chain);
    console.log(`✅ Balance: ${balance.toFixed(2)} USDC\n`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as module
module.exports = {
  getUSDCBalance,
  formatAddress,
  USDC_ADDRESSES,
  RPC_ENDPOINTS
};
