"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.neynarClient = void 0;
exports.verifyNeynarWebhook = verifyNeynarWebhook;
exports.parseReactionEvent = parseReactionEvent;
exports.getUserByFid = getUserByFid;
const nodejs_sdk_1 = require("@neynar/nodejs-sdk");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../utils/config");
const logger_1 = __importDefault(require("../utils/logger"));
// ---- Neynar Client Singleton ----
const neynarConfig = new nodejs_sdk_1.Configuration({ apiKey: config_1.env.NEYNAR_API_KEY });
exports.neynarClient = new nodejs_sdk_1.NeynarAPIClient(neynarConfig);
// ---- Webhook Signature Verification ----
/**
 * Verifies that an incoming webhook request is genuinely from Neynar.
 * Always verify — never skip this in production.
 */
function verifyNeynarWebhook(rawBody, signature) {
    const hmac = crypto_1.default.createHmac("sha512", config_1.env.NEYNAR_WEBHOOK_SECRET);
    hmac.update(rawBody);
    const digest = hmac.digest("hex");
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(digest, "hex"));
    }
    catch {
        return false;
    }
}
// ---- Parse Webhook Payload into EngagementEvent ----
/**
 * Converts a raw Neynar reaction webhook payload into a normalized
 * MetricFlow EngagementEvent.
 */
function parseReactionEvent(payload) {
    if (payload.type !== "reaction.created") {
        logger_1.default.debug("Ignoring non-reaction webhook", { type: payload.type });
        return null;
    }
    const data = payload.data;
    if (data.reaction_type !== "like" && data.reaction_type !== "recast") {
        return null;
    }
    const reactor = data.reactor;
    const ethAddresses = reactor.verified_addresses?.eth_addresses ?? [];
    const reactorEthAddress = ethAddresses.length > 0 ? ethAddresses[0] : null;
    if (!reactorEthAddress) {
        logger_1.default.warn("Reactor has no verified ETH address — cannot reward", {
            fid: reactor.fid,
            username: reactor.username,
        });
    }
    return {
        id: `${data.cast.hash}-${reactor.fid}-${data.reaction_type}-${Date.now()}`,
        type: data.reaction_type,
        castHash: data.cast.hash,
        castAuthorFid: data.cast.author.fid,
        reactorFid: reactor.fid,
        reactorUsername: reactor.username,
        reactorEthAddress,
        timestamp: new Date(data.timestamp),
    };
}
// ---- Lookup User by FID ----
async function getUserByFid(fid) {
    try {
        const response = await exports.neynarClient.fetchBulkUsers({ fids: [fid] });
        return response.users?.[0] ?? null;
    }
    catch (err) {
        logger_1.default.error("Failed to fetch Farcaster user", { fid, err });
        return null;
    }
}
