"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEngagementEvent = processEngagementEvent;
const wallet_1 = require("./wallet");
const allowlist_1 = require("../services/allowlist");
const config_1 = require("../utils/config");
const logger_1 = __importDefault(require("../utils/logger"));
// ---- Deduplication: track events already processed this session ----
const processedEventIds = new Set();
/**
 * Core reward logic.
 *
 * For each qualifying engagement:
 *   1. Check the reactor has a verified ETH address
 *   2. Deduplicate (don't reward the same event twice)
 *   3. Add them to the allowlist
 *   4. Send them ETH on Base
 */
async function processEngagementEvent(event) {
    const base = {
        event,
        timestamp: new Date(),
    };
    // ---- Guard: verified ETH address required ----
    if (!event.reactorEthAddress) {
        logger_1.default.warn("Skipping — no verified ETH address", {
            username: event.reactorUsername,
            fid: event.reactorFid,
        });
        return { ...base, status: "skipped", reason: "no_verified_eth_address" };
    }
    // ---- Guard: deduplicate ----
    if (processedEventIds.has(event.id)) {
        logger_1.default.debug("Skipping duplicate event", { eventId: event.id });
        return { ...base, status: "skipped", reason: "duplicate_event" };
    }
    processedEventIds.add(event.id);
    const ethAddress = event.reactorEthAddress;
    // ---- Step 1: Add to allowlist ----
    (0, allowlist_1.addToAllowlist)(event, ethAddress);
    // ---- Step 2: Send ETH reward ----
    try {
        const txHash = await (0, wallet_1.sendReward)(ethAddress, config_1.config.rewardAmountWei);
        logger_1.default.info("🎉 Reward complete", {
            username: event.reactorUsername,
            type: event.type,
            ethAddress,
            txHash,
            allowlistSize: (0, allowlist_1.getAllowlistSize)(),
        });
        return { ...base, status: "sent", txHash };
    }
    catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        logger_1.default.error("Failed to send reward", { ethAddress, reason });
        return { ...base, status: "failed", reason };
    }
}
