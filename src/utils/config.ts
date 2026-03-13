import dotenv from "dotenv";
import { z } from "zod";
import { MetricFlowConfig, NetworkId } from "../types";

dotenv.config();

// ---- Validate required environment variables ----

const EnvSchema = z.object({
  NEYNAR_API_KEY: z.string().min(1, "NEYNAR_API_KEY is required"),
  NEYNAR_WEBHOOK_SECRET: z.string().optional().default(""),         
  CDP_API_KEY_ID: z.string().min(1, "CDP_API_KEY_ID is required"),
  CDP_API_KEY_SECRET: z.string().min(1, "CDP_API_KEY_SECRET is required"),
  NETWORK_ID: z.enum(["base", "base-sepolia"]).default("base-sepolia"),
  REWARD_AMOUNT_WEI: z.string().default("100000000000000"),
  ALLOWLIST_OUTPUT_PATH: z.string().default("./data/allowlist.json"),
  PORT: z.string().default("3000"),
  WEBHOOK_PATH: z.string().default("/webhook/farcaster"),
  WALLET_DATA: z.string().optional(),
  DRY_RUN: z.string().optional(),
});

function loadEnv() {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    const errors = result.error.errors
      .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(
      `❌ MetricFlow config error — missing/invalid env vars:\n${errors}\n\nCopy .env.example to .env and fill in your values.`
    );
  }
  return result.data;
}

export const env = loadEnv();

export const config: MetricFlowConfig = {
  network: env.NETWORK_ID as NetworkId,
  rewardAmountWei: BigInt(env.REWARD_AMOUNT_WEI),
  allowlistOutputPath: env.ALLOWLIST_OUTPUT_PATH,
  dryRun: env.DRY_RUN === "true",
};

export default config;
