"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
// ---- Validate required environment variables ----
const EnvSchema = zod_1.z.object({
    NEYNAR_API_KEY: zod_1.z.string().min(1, "NEYNAR_API_KEY is required"),
    NEYNAR_WEBHOOK_SECRET: zod_1.z.string().min(1, "NEYNAR_WEBHOOK_SECRET is required"),
    CDP_API_KEY_NAME: zod_1.z.string().min(1, "CDP_API_KEY_NAME is required"),
    CDP_API_KEY_PRIVATE_KEY: zod_1.z
        .string()
        .min(1, "CDP_API_KEY_PRIVATE_KEY is required"),
    NETWORK_ID: zod_1.z.enum(["base", "base-sepolia"]).default("base-sepolia"),
    REWARD_AMOUNT_WEI: zod_1.z.string().default("100000000000000"),
    ALLOWLIST_OUTPUT_PATH: zod_1.z.string().default("./data/allowlist.json"),
    PORT: zod_1.z.string().default("3000"),
    WEBHOOK_PATH: zod_1.z.string().default("/webhook/farcaster"),
    WALLET_DATA: zod_1.z.string().optional(),
    DRY_RUN: zod_1.z.string().optional(),
});
function loadEnv() {
    const result = EnvSchema.safeParse(process.env);
    if (!result.success) {
        const errors = result.error.errors
            .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
            .join("\n");
        throw new Error(`❌ MetricFlow config error — missing/invalid env vars:\n${errors}\n\nCopy .env.example to .env and fill in your values.`);
    }
    return result.data;
}
exports.env = loadEnv();
exports.config = {
    network: exports.env.NETWORK_ID,
    rewardAmountWei: BigInt(exports.env.REWARD_AMOUNT_WEI),
    allowlistOutputPath: exports.env.ALLOWLIST_OUTPUT_PATH,
    dryRun: exports.env.DRY_RUN === "true",
};
exports.default = exports.config;
