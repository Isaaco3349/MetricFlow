import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import crypto from "crypto";
import { env } from "../utils/config";
import logger from "../utils/logger";
import {
  NeynarWebhookPayload,
  ReactionData,
  EngagementEvent,
  FarcasterUser,
} from "../types";

// ---- Neynar Client Singleton ----

const neynarConfig = new Configuration({ apiKey: env.NEYNAR_API_KEY });
export const neynarClient = new NeynarAPIClient(neynarConfig);

// ---- Webhook Signature Verification ----

/**
 * Verifies that an incoming webhook request is genuinely from Neynar.
 * Always verify — never skip this in production.
 */
export function verifyNeynarWebhook(
  rawBody: Buffer,
  signature: string
): boolean {
  const hmac = crypto.createHmac("sha512", env.NEYNAR_WEBHOOK_SECRET);
  hmac.update(rawBody);
  const digest = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(digest, "hex")
    );
  } catch {
    return false;
  }
}

// ---- Parse Webhook Payload into EngagementEvent ----

/**
 * Converts a raw Neynar reaction webhook payload into a normalized
 * MetricFlow EngagementEvent.
 */
export function parseReactionEvent(
  payload: NeynarWebhookPayload
): EngagementEvent | null {
  if (payload.type !== "reaction.created") {
    logger.debug("Ignoring non-reaction webhook", { type: payload.type });
    return null;
  }

  const data = payload.data as ReactionData;

  if (data.reaction_type !== "like" && data.reaction_type !== "recast") {
    return null;
  }

  const reactor: FarcasterUser = data.reactor;
  const ethAddresses = reactor.verified_addresses?.eth_addresses ?? [];
  const reactorEthAddress = ethAddresses.length > 0 ? ethAddresses[0] : null;

  if (!reactorEthAddress) {
    logger.warn("Reactor has no verified ETH address — cannot reward", {
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

export async function getUserByFid(fid: number): Promise<FarcasterUser | null> {
  try {
    const response = await neynarClient.fetchBulkUsers([fid]);
    return (response.users?.[0] as unknown as FarcasterUser) ?? null;
  } catch (err) {
    logger.error("Failed to fetch Farcaster user", { fid, err });
    return null;
  }
}
