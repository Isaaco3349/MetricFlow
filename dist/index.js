"use strict";
/**
 * MetricFlow — Farcaster Engagement Reward Agent
 *
 * Monitors Farcaster reactions (likes + recasts) and automatically:
 *   1. Adds the reactor to an allowlist
 *   2. Sends them ETH on Base chain
 *
 * Built with: Neynar (Farcaster) + Coinbase AgentKit (Base chain)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./utils/logger"));
const allowlist_1 = require("./services/allowlist");
const wallet_1 = require("./agent/wallet");
const server_1 = require("./webhooks/server");
async function main() {
    logger_1.default.info("⚡ MetricFlow starting up...");
    try {
        // 1. Load existing allowlist from disk
        (0, allowlist_1.loadAllowlist)();
        // 2. Initialize CDP wallet (creates or loads existing)
        await (0, wallet_1.initializeWallet)();
        // 3. Start webhook server
        (0, server_1.startServer)();
        logger_1.default.info("✅ MetricFlow is live and listening for Farcaster reactions");
    }
    catch (err) {
        logger_1.default.error("❌ Failed to start MetricFlow", { err });
        process.exit(1);
    }
}
main();
