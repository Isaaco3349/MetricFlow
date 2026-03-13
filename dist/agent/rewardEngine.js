import { sendReward } from "./wallet";
import { addToAllowlist, getAllowlistSize, } from "../services/allowlist";
import { config } from "../utils/config";
import logger from "../utils/logger";
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
export async function processEngagementEvent(event) {
    const base = {
        event,
        timestamp: new Date(),
    };
    // ---- Guard: verified ETH address required ----
    if (!event.reactorEthAddress) {
        logger.warn("Skipping — no verified ETH address", {
            username: event.reactorUsername,
            fid: event.reactorFid,
        });
        return { ...base, status: "skipped", reason: "no_verified_eth_address" };
    }
    // ---- Guard: deduplicate ----
    if (processedEventIds.has(event.id)) {
        logger.debug("Skipping duplicate event", { eventId: event.id });
        return { ...base, status: "skipped", reason: "duplicate_event" };
    }
    processedEventIds.add(event.id);
    const ethAddress = event.reactorEthAddress;
    // ---- Step 1: Add to allowlist ----
    addToAllowlist(event, ethAddress);
    // ---- Step 2: Send ETH reward ----
    try {
        const txHash = await sendReward(ethAddress, config.rewardAmountWei);
        logger.info("🎉 Reward complete", {
            username: event.reactorUsername,
            type: event.type,
            ethAddress,
            txHash,
            allowlistSize: getAllowlistSize(),
        });
        return { ...base, status: "sent", txHash };
    }
    catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        logger.error("Failed to send reward", { ethAddress, reason });
        return { ...base, status: "failed", reason };
    }
}
