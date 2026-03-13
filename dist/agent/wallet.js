"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWallet = initializeWallet;
exports.sendReward = sendReward;
exports.getWalletAddress = getWalletAddress;
const agentkit_1 = require("@coinbase/agentkit");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
async function initializeWallet() {
    if (walletProvider)
        return walletProvider;
    console.log("Initializing CDP EVM Wallet...", process.env.NETWORK_ID || "base-sepolia");
    let savedAddress = undefined;
    if (fs_1.default.existsSync(WALLET_DATA_FILE)) {
        try {
            const data = JSON.parse(fs_1.default.readFileSync(WALLET_DATA_FILE, "utf-8"));
            savedAddress = data.address;
            console.log("Loaded wallet address from local file:", savedAddress);
        }
        catch {
            console.log("No existing wallet found, creating new one...");
        }
    }
    walletProvider = await agentkit_1.CdpEvmWalletProvider.configureWithWallet({
        apiKeyId: process.env.CDP_API_KEY_NAME,
        apiKeySecret: process.env.CDP_API_KEY_PRIVATE_KEY,
        networkId: process.env.NETWORK_ID || "base-sepolia",
        address: savedAddress,
    });
    const dataDir = "./data";
    if (!fs_1.default.existsSync(dataDir))
        fs_1.default.mkdirSync(dataDir, { recursive: true });
    const exportedData = await walletProvider.exportWallet();
    fs_1.default.writeFileSync(WALLET_DATA_FILE, JSON.stringify(exportedData), "utf-8");
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
async function sendReward(toAddress, amountWei) {
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
async function getWalletAddress() {
    const provider = await initializeWallet();
    return provider.getAddress();
}
