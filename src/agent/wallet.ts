import { CdpEvmWalletProvider } from "@coinbase/agentkit";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const BUILDER_CODE = "bc_5s50punj";
const ERC_8021_MARKER = "8021";

function buildDataSuffix(builderCode: string): `0x${string}` {
  const encoded = Buffer.from(builderCode, "utf8").toString("hex");
  const length = encoded.length.toString(16).padStart(4, "0");
  return `0x${length}${encoded}${ERC_8021_MARKER}` as `0x${string}`;
}

const DATA_SUFFIX = buildDataSuffix(BUILDER_CODE);
console.log("ERC-8021 data suffix ready:", DATA_SUFFIX);

const WALLET_DATA_FILE = "./data/wallet_data.json";
let walletProvider: CdpEvmWalletProvider | null = null;

export async function initializeWallet(): Promise<CdpEvmWalletProvider> {
  if (walletProvider) return walletProvider;

  console.log("Initializing CDP EVM Wallet...", process.env.NETWORK_ID || "base-sepolia");

  let savedAddress: `0x${string}` | undefined = undefined;

  if (fs.existsSync(WALLET_DATA_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf-8"));
      savedAddress = data.address as `0x${string}`;
      console.log("Loaded wallet address from local file:", savedAddress);
    } catch {
      console.log("No existing wallet found, creating new one...");
    }
  }

  walletProvider = await CdpEvmWalletProvider.configureWithWallet({
    apiKeyId: process.env.CDP_API_KEY_NAME!,
    apiKeySecret: process.env.CDP_API_KEY_PRIVATE_KEY!,
    networkId: process.env.NETWORK_ID || "base-sepolia",
    address: savedAddress,
  });

  const dataDir = "./data";
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const exportedData = await walletProvider.exportWallet();
  fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedData), "utf-8");
  console.log("Wallet persisted to", WALLET_DATA_FILE);

  const address = await walletProvider.getAddress();
  console.log("Wallet ready:", address);
  console.log("Network:", process.env.NETWORK_ID || "base-sepolia");

  if ((process.env.NETWORK_ID || "base-sepolia") === "base-sepolia") {
    console.log("Fund your testnet wallet at: https://portal.cdp.coinbase.com/products/faucet");
    console.log("Wallet address:", address);
  }

  return walletProvider;
}

export async function sendReward(
  toAddress: string,
  amountWei: bigint
): Promise<string> {
  const provider = await initializeWallet();

  if (process.env.DRY_RUN === "true") {
    console.log("DRY RUN - transaction not sent");
    return "dry-run-tx-hash";
  }

  const tx = await provider.sendTransaction({
    to: toAddress as `0x${string}`,
    value: amountWei,
    data: DATA_SUFFIX,
  });

  console.log("Reward sent with ERC-8021 attribution!", {
    txHash: tx,
    to: toAddress,
    builderCode: BUILDER_CODE,
  });

  return tx as string;
}

export async function getWalletAddress(): Promise<string> {
  const provider = await initializeWallet();
  return provider.getAddress();
}
