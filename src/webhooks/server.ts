import express, { Request, Response, NextFunction } from "express";
import { env } from "../utils/config";
import logger from "../utils/logger";
import {
  verifyNeynarWebhook,
  parseReactionEvent,
} from "../services/neynar";
import { processEngagementEvent } from "../agent/rewardEngine";
import { getAllowlistSize } from "../services/allowlist";
import { getWalletAddress } from "../agent/wallet";
import { NeynarWebhookPayload } from "../types";

export function createServer() {
  const app = express();

  // ---- Raw body capture (required for HMAC verification) ----
  app.use(
    express.json({
      verify: (req: Request & { rawBody?: Buffer }, _res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  // ---- Health check ----
  app.get("/health", async (_req: Request, res: Response) => {
    try {
      const walletAddress = await getWalletAddress();
      res.json({
        status: "ok",
        service: "MetricFlow",
        network: env.NETWORK_ID,
        walletAddress,
        allowlistSize: getAllowlistSize(),
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      res.status(500).json({ status: "error", error: String(err) });
    }
  });

  // ---- Allowlist snapshot endpoint ----
  app.get("/allowlist", (_req: Request, res: Response) => {
    // In production you'd add auth here
    res.json({
      count: getAllowlistSize(),
      path: env.ALLOWLIST_OUTPUT_PATH,
      message: "See the allowlist file for full data",
    });
  });

  // ---- Neynar Webhook Handler ----
  app.post(
    env.WEBHOOK_PATH,
    async (
      req: Request & { rawBody?: Buffer },
      res: Response,
      _next: NextFunction
    ) => {
      // 1. Verify signature
      const signature = req.headers["x-neynar-signature"] as string;
      if (!signature && !process.env.SKIP_WEBHOOK_SIGNATURE) {
        logger.warn("Webhook received without signature — rejecting");
        return res.status(401).json({ error: "Missing signature" });
      }

      if (!process.env.SKIP_WEBHOOK_SIGNATURE && (!req.rawBody || !verifyNeynarWebhook(req.rawBody, signature))) {
        logger.warn("Invalid webhook signature — rejecting");
        return res.status(401).json({ error: "Invalid signature" });
      }

      // 2. Acknowledge immediately (Neynar expects fast response)
      res.status(200).json({ received: true });

      // 3. Process async (don't block the response)
      const payload = req.body as NeynarWebhookPayload;
      logger.debug("Webhook received", { type: payload.type });

      try {
        const event = parseReactionEvent(payload);
        if (!event) return; // not a reaction we care about

        logger.info("Processing engagement", {
          type: event.type,
          username: event.reactorUsername,
          castHash: event.castHash.slice(0, 12) + "...",
        });

        const result = await processEngagementEvent(event);
        logger.info("Event processed", {
          status: result.status,
          username: event.reactorUsername,
          txHash: result.txHash,
        });
      } catch (err) {
        logger.error("Unhandled error processing webhook", { err });
      }
    }
  );

  return app;
}

export function startServer() {
  const app = createServer();
  const port = parseInt(env.PORT, 10);

  app.listen(port, () => {
    logger.info(`🚀 MetricFlow server running`, {
      port,
      webhookPath: env.WEBHOOK_PATH,
      network: env.NETWORK_ID,
    });
    logger.info(
      `📡 Webhook URL: http://your-server:${port}${env.WEBHOOK_PATH}`
    );
    logger.info(`❤️  Health check: http://localhost:${port}/health`);
  });
}
