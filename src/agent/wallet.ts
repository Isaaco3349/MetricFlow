import { CdpClient } from "@coinbase/cdp-sdk";
import fs from "fs";

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

let cachedAddress: string | null = null;
let cdpClient: CdpClient | null = null;

export async function initializeWallet(): Promise<string> {
  if (cachedAddress) return cachedAddress;

  cdpClient = new CdpClient({
    apiKeyId: process.env.CDP_API_KEY_ID!,
    apiKeySecret: process.env.CDP_API_KEY_SECRET!,
  });

  const dataDir = "./data";
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let address: string;

  if (fs.existsSync(WALLET_DATA_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf-8"));
      address = data.address;
      console.log("Loaded wallet address:", address);
    } catch {
      const account = await cdpClient.evm.createAccount();
      address = account.address;
      fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ address }), "utf-8");
      console.log("Created new wallet:", address);
    }
  } else {
    const account = await cdpClient.evm.createAccount();
    address = account.address;
    fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ address }), "utf-8");
    console.log("Created new wallet:", address);
  }

  console.log("Network:", process.env.NETWORK_ID || "base-sepolia");
  cachedAddress = address;
  return address;
}

export async function sendReward(
  toAddress: string,
  amountWei: bigint
): Promise<string> {
  if (!cdpClient) await initializeWallet();

  if (process.env.DRY_RUN === "true") {
    console.log("DRY RUN - transaction not sent");
    return "dry-run-tx-hash";
  }

  const networkId = (process.env.NETWORK_ID || "base-sepolia") as "base" | "base-sepolia";
  const fromAddress = cachedAddress!;

  const tx = await cdpClient!.evm.sendTransaction({
    address: fromAddress as `0x${string}`,
    network: networkId,
    transaction: {
      to: toAddress as `0x${string}`,
      value: amountWei,
      data: DATA_SUFFIX,
    },
  });

  console.log("Reward sent with ERC-8021 attribution!", {
    txHash: tx.transactionHash,
    to: toAddress,
    builderCode: BUILDER_CODE,
  });

  return tx.transactionHash;
}

export async function getWalletAddress(): Promise<string> {
  return initializeWallet();
}