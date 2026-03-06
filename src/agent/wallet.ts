import {
  CdpWalletProvider,
} from "@coinbase/agentkit";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// ============================================================
// ERC-8021 Builder Attribution
// This suffix is appended to every transaction MetricFlow sends.
// It attributes the transaction to your Builder Code on Base,
// earning you credit on the Base leaderboard and future rewards.
// ============================================================
const BUILDER_CODE = "bc_5s50punj";
const ERC_8021_MARKER = "8021";

function buildDataSuffix(builderCode: string): `0x${string}` {
  const encoded = Buffer.from(builderCode, "utf8").toString("hex");
  const length = encoded.length.toString(16).padStart(4, "0");
  return `0x${length}${encoded}${ERC_8021_MARKER}` as `0x${string}`;
}

const DATA_SUFFIX = buildDataSuffix(BUILDER_CODE);
console.log("ERC-8021 data suffix ready:", DATA_SUFFIX);

// ============================================================
const WALLET_DATA_FILE = "./data/wallet_data.json";
let walletProvider: CdpWalletProvider | null = null;

export async function initializeWallet(): Promise<CdpWalletProvider> {
  if (walletProvider) return walletProvider;

  console.log("Initializing CDP wallet...", process.env.NETWORK_ID || "base-sepolia");

  let walletDataStr: string | undefined = process.env.WALLET_DATA || undefined;

  if (!walletDataStr && fs.existsSync(WALLET_DATA_FILE)) {
    walletDataStr = fs.readFileSync(WALLET_DATA_FILE, "utf-8");
    console.log("Loaded wallet from local file");
  }

  walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME!,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
    networkId: process.env.NETWORK_ID || "base-sepolia",
    cdpWalletData: walletDataStr,
  });

  // Persist wallet
  const dataDir = "./data";
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const exportedData = await walletProvider.exportWallet();
  fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedData), "utf-8");
  console.log("Wallet persisted to", WALLET_DATA_FILE);

  const address = await walletProvider.getAddress();
  console.log("✅ Wallet ready:", address);
  console.log("🌐 Network:", process.env.NETWORK_ID || "base-sepolia");

  if ((process.env.NETWORK_ID || "base-sepolia") === "base-sepolia") {
    console.log("💡 Fund your testnet wallet at: https://portal.cdp.coinbase.com/products/faucet");
    console.log("📬 Wallet address:", address);
  }

  return walletProvider;
}

export async function sendReward(
  toAddress: string,
  amountWei: bigint
): Promise<string> {
  const provider = await initializeWallet();

  console.log("Sending reward...", {
    to: toAddress,
    amountWei: amountWei.toString(),
    erc8021: DATA_SUFFIX,
  });

  if (process.env.DRY_RUN === "true") {
    console.log("🧪 DRY RUN — transaction not sent");
    return "dry-run-tx-hash";
  }

  // Every transaction includes the ERC-8021 data suffix
  // This attributes the transaction to MetricFlow on Base leaderboard
  const tx = await provider.sendTransaction({
    to: toAddress as `0x${string}`,
    value: amountWei,
    data: DATA_SUFFIX,
  });

  console.log("✅ Reward sent with ERC-8021 attribution!", {
    txHash: tx,
    to: toAddress,
    builderCode: BUILDER_CODE,
  });

  return tx;
}

export async function getWalletAddress(): Promise<string> {
  const provider = await initializeWallet();
  return provider.getAddress();
}
