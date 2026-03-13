/**
 * MetricFlow — Farcaster Engagement Reward Agent
 *
 * Monitors Farcaster reactions (likes + recasts) and automatically:
 *   1. Adds the reactor to an allowlist
 *   2. Sends them ETH on Base chain
 *
 * Built with: Neynar (Farcaster) + Coinbase AgentKit (Base chain)
 */
import logger from "./utils/logger";
import { loadAllowlist } from "./services/allowlist";
import { initializeWallet } from "./agent/wallet";
import { startServer } from "./webhooks/server";
async function main() {
    logger.info("⚡ MetricFlow starting up...");
    try {
        // 1. Load existing allowlist from disk
        loadAllowlist();
        // 2. Initialize CDP wallet (creates or loads existing)
        await initializeWallet();
        // 3. Start webhook server
        startServer();
        logger.info("✅ MetricFlow is live and listening for Farcaster reactions");
    }
    catch (err) {
        logger.error("❌ Failed to start MetricFlow", { err });
        process.exit(1);
    }
}
main();
