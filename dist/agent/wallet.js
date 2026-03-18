import { CdpV2EvmWalletProvider } from "@coinbase/agentkit";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const BUILDER_CODE = "bc_5s50punj";
const ERC_8021_MARKER = "8021";
function buildDataSuffix(builderCode) {
    const encoded = Buffer.from(builderCode, "utf8").toString("hex");
    const length = encoded.length.toString(16).padStart(4, "0");
    return `0x${length}${encoded}${ERC_8021_MARKER}`;
}
const DATA_SUFFIX = buildDataSuffix(BUILDER_CODE);
console.log("ERC-8021 data suffix ready:", DATA_SUFFIX);
const WALLET_DATA_FILE = "./data/wallet_data.json";
let walletProvider = null;
export async function initializeWallet() {
    if (walletProvider)
        return walletProvider;
    console.log("Initializing CDP EVM Wallet...", process.env.NETWORK_ID || "base-sepolia");
    let savedAddress = undefined;
    if (fs.existsSync(WALLET_DATA_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf-8"));
            savedAddress = data.address;
            console.log("Loaded wallet address from local file:", savedAddress);
        }
        catch {
            console.log("No existing wallet found, creating new one...");
        }
    }
    walletProvider = await CdpV2EvmWalletProvider.configureWithWallet({
        apiKeyId: process.env.CDP_API_KEY_ID,
        apiKeySecret: process.env.CDP_API_KEY_SECRET,
        networkId: process.env.NETWORK_ID || "base-sepolia",
        address: savedAddress,
    });
    const dataDir = "./data";
    if (!fs.existsSync(dataDir))
        fs.mkdirSync(dataDir, { recursive: true });
    const walletAddress = walletProvider.getAddress();
    fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ address: walletAddress }), "utf-8");
    console.log("Wallet persisted to", WALLET_DATA_FILE);
    const address = walletAddress;
    console.log("Wallet ready:", address);
    console.log("Network:", process.env.NETWORK_ID || "base-sepolia");
    if ((process.env.NETWORK_ID || "base-sepolia") === "base-sepolia") {
        console.log("Fund your testnet wallet at: https://portal.cdp.coinbase.com/products/faucet");
        console.log("Wallet address:", address);
    }
    return walletProvider;
}
export async function sendReward(toAddress, amountWei) {
    const provider = await initializeWallet();
    if (process.env.DRY_RUN === "true") {
        console.log("DRY RUN - transaction not sent");
        return "dry-run-tx-hash";
    }
    const tx = await provider.sendTransaction({
        to: toAddress,
        value: amountWei,
        data: DATA_SUFFIX,
    });
    console.log("Reward sent with ERC-8021 attribution!", {
        txHash: tx,
        to: toAddress,
        builderCode: BUILDER_CODE,
    });
    return tx;
}
export async function getWalletAddress() {
    const provider = await initializeWallet();
    return provider.getAddress();
}
