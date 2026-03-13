/**
 * MetricFlow Setup Script
 * Run with: npm run setup
 *
 * This script:
 *   1. Validates your environment variables
 *   2. Initializes your Base wallet
 *   3. Prints your wallet address so you can fund it
 *   4. Prints setup instructions for Neynar webhook
 */

import dotenv from "dotenv";
dotenv.config();

import { initializeWallet, getWalletAddress } from "../src/agent/wallet";
import logger from "../src/utils/logger";

async function setup() {
  console.log("\n╔══════════════════════════════════════╗");
  console.log("║       MetricFlow — Setup Wizard       ║");
  console.log("╚══════════════════════════════════════╝\n");

  console.log("Step 1: Validating config...");
  // Config validation runs on import
  const { config, env } = await import("../src/utils/config");
  console.log(`  ✅ Network: ${config.network}`);
  console.log(
    `  ✅ Reward amount: ${config.rewardAmountWei} wei (${Number(config.rewardAmountWei) / 1e18} ETH)`
  );
  console.log(`  ✅ Allowlist path: ${config.allowlistOutputPath}`);
  if (config.dryRun) console.log("  ⚠️  DRY RUN mode enabled");

  console.log("\nStep 2: Initializing wallet...");
  await initializeWallet();
  const address = await getWalletAddress();
  console.log(`  ✅ Wallet address: ${address}`);

  if (config.network === "base-sepolia") {
    console.log(
      "\n⛽ Fund your TESTNET wallet here (free test ETH):"
    );
    console.log(
      "   https://portal.cdp.coinbase.com/products/faucet"
    );
    console.log(`   Address: ${address}\n`);
  } else {
    console.log(
      "\n⛽ Fund your MAINNET wallet with ETH on Base:"
    );
    console.log(`   Address: ${address}\n`);
  }

  console.log("Step 3: Neynar Webhook Setup");
  console.log("  1. Go to: https://dev.neynar.com");
  console.log("  2. Create a new webhook");
  console.log(`  3. Set the URL to: http://YOUR_SERVER:${env.PORT}${env.WEBHOOK_PATH}`);
  console.log("  4. Subscribe to: reaction.created");
  console.log(
    "  5. Copy the webhook secret into your .env as NEYNAR_WEBHOOK_SECRET"
  );

  console.log(
    "\n✅ Setup complete! Run `npm run dev` to start MetricFlow.\n"
  );
}

setup().catch((err) => {
  logger.error("Setup failed", { err });
console.error("Full error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
  process.exit(1);
});
