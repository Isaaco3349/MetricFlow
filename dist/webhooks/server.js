"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const config_1 = require("../utils/config");
const logger_1 = __importDefault(require("../utils/logger"));
const neynar_1 = require("../services/neynar");
const rewardEngine_1 = require("../agent/rewardEngine");
const allowlist_1 = require("../services/allowlist");
const wallet_1 = require("../agent/wallet");
function createServer() {
    const app = (0, express_1.default)();
    // ---- Raw body capture (required for HMAC verification) ----
    app.use(express_1.default.json({
        verify: (req, _res, buf) => {
            req.rawBody = buf;
        },
    }));
    // ---- Health check ----
    app.get("/health", async (_req, res) => {
        try {
            const walletAddress = await (0, wallet_1.getWalletAddress)();
            res.json({
                status: "ok",
                service: "MetricFlow",
                network: config_1.env.NETWORK_ID,
                walletAddress,
                allowlistSize: (0, allowlist_1.getAllowlistSize)(),
                timestamp: new Date().toISOString(),
            });
        }
        catch (err) {
            res.status(500).json({ status: "error", error: String(err) });
        }
    });
    // ---- Allowlist snapshot endpoint ----
    app.get("/allowlist", (_req, res) => {
        // In production you'd add auth here
        res.json({
            count: (0, allowlist_1.getAllowlistSize)(),
            path: config_1.env.ALLOWLIST_OUTPUT_PATH,
            message: "See the allowlist file for full data",
        });
    });
    // ---- Neynar Webhook Handler ----
    app.post(config_1.env.WEBHOOK_PATH, async (req, res, _next) => {
        // 1. Verify signature
        const signature = req.headers["x-neynar-signature"];
        if (!signature && !process.env.SKIP_WEBHOOK_SIGNATURE) {
            logger_1.default.warn("Webhook received without signature — rejecting");
            return res.status(401).json({ error: "Missing signature" });
        }
        if (!process.env.SKIP_WEBHOOK_SIGNATURE && (!req.rawBody || !(0, neynar_1.verifyNeynarWebhook)(req.rawBody, signature))) {
            logger_1.default.warn("Invalid webhook signature — rejecting");
            return res.status(401).json({ error: "Invalid signature" });
        }
        // 2. Acknowledge immediately (Neynar expects fast response)
        res.status(200).json({ received: true });
        // 3. Process async (don't block the response)
        const payload = req.body;
        logger_1.default.debug("Webhook received", { type: payload.type });
        try {
            const event = (0, neynar_1.parseReactionEvent)(payload);
            if (!event)
                return; // not a reaction we care about
            logger_1.default.info("Processing engagement", {
                type: event.type,
                username: event.reactorUsername,
                castHash: event.castHash.slice(0, 12) + "...",
            });
            const result = await (0, rewardEngine_1.processEngagementEvent)(event);
            logger_1.default.info("Event processed", {
                status: result.status,
                username: event.reactorUsername,
                txHash: result.txHash,
            });
        }
        catch (err) {
            logger_1.default.error("Unhandled error processing webhook", { err });
        }
    });
    return app;
}
function startServer() {
    const app = createServer();
    const port = parseInt(config_1.env.PORT, 10);
    app.listen(port, () => {
        logger_1.default.info(`🚀 MetricFlow server running`, {
            port,
            webhookPath: config_1.env.WEBHOOK_PATH,
            network: config_1.env.NETWORK_ID,
        });
        logger_1.default.info(`📡 Webhook URL: http://your-server:${port}${config_1.env.WEBHOOK_PATH}`);
        logger_1.default.info(`❤️  Health check: http://localhost:${port}/health`);
    });
}
