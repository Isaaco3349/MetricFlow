// ============================================================
// MetricFlow — Shared Types
// ============================================================

export type NetworkId = "base" | "base-sepolia";

export type EngagementType = "like" | "recast";

// ---- Neynar Webhook Payload Types ----

export interface FarcasterUser {
  fid: number;
  username: string;
  display_name: string;
  custody_address: string;
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  pfp_url?: string;
  profile?: {
    bio?: { text: string };
  };
}

export interface FarcasterCast {
  hash: string;
  author: FarcasterUser;
  text: string;
  timestamp: string;
  reactions: {
    likes_count: number;
    recasts_count: number;
  };
}

export interface NeynarWebhookPayload {
  created_at: number;
  type: "cast.created" | "reaction.created" | "follow.created";
  data: ReactionData | CastData;
}

export interface ReactionData {
  object: "reaction";
  reaction_type: "like" | "recast";
  cast: FarcasterCast;
  reactor: FarcasterUser;
  timestamp: string;
}

export interface CastData {
  object: "cast";
  hash: string;
  author: FarcasterUser;
  text: string;
}

// ---- Engagement Event (internal normalized type) ----

export interface EngagementEvent {
  id: string; // unique event ID we generate
  type: EngagementType;
  castHash: string;
  castAuthorFid: number;
  reactorFid: number;
  reactorUsername: string;
  reactorEthAddress: string | null; // null if no verified address
  timestamp: Date;
}

// ---- Reward Action ----

export type RewardStatus =
  | "pending"
  | "sent"
  | "allowlisted"
  | "skipped"
  | "failed";

export interface RewardResult {
  event: EngagementEvent;
  status: RewardStatus;
  txHash?: string; // populated if ETH was sent
  reason?: string; // populated if skipped or failed
  timestamp: Date;
}

// ---- Allowlist ----

export interface AllowlistEntry {
  fid: number;
  username: string;
  ethAddress: string;
  addedAt: string; // ISO timestamp
  triggerEvent: EngagementType;
  castHash: string;
}

// ---- Config ----

export interface MetricFlowConfig {
  network: NetworkId;
  rewardAmountWei: bigint;
  allowlistOutputPath: string;
  monitoredFids?: number[]; // FIDs whose casts we monitor. Empty = monitor all.
  dryRun: boolean; // if true, log actions but don't send transactions
}
