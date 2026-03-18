import { CdpClient } from "@coinbase/cdp-sdk";
import fs from "fs";
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
let cachedAddress = null;
let cdpClient = null;
export async function initializeWallet() {
    if (cachedAddress)
        return cachedAddress;
    cdpClient = new CdpClient({
        apiKeyId: process.env.CDP_API_KEY_ID,
        apiKeySecret: process.env.CDP_API_KEY_SECRET,
    });
    const dataDir = "./data";
    if (!fs.existsSync(dataDir))
        fs.mkdirSync(dataDir, { recursive: true });
    let address;
    if (fs.existsSync(WALLET_DATA_FILE)) {
        try {
            const data = JSON.parse(fs.readFileSync(WALLET_DATA_FILE, "utf-8"));
            address = data.address;
            console.log("Loaded wallet address:", address);
        }
        catch {
            const account = await cdpClient.evm.createAccount();
            address = account.address;
            fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ address }), "utf-8");
            console.log("Created new wallet:", address);
        }
    }
    else {
        const account = await cdpClient.evm.createAccount();
        address = account.address;
        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ address }), "utf-8");
        console.log("Created new wallet:", address);
    }
    console.log("Network:", process.env.NETWORK_ID || "base-sepolia");
    cachedAddress = address;
    return address;
}
export async function sendReward(toAddress, amountWei) {
    if (!cdpClient)
        await initializeWallet();
    if (process.env.DRY_RUN === "true") {
        console.log("DRY RUN - transaction not sent");
        return "dry-run-tx-hash";
    }
    const networkId = (process.env.NETWORK_ID || "base-sepolia");
    const fromAddress = cachedAddress;
    const tx = await cdpClient.evm.sendTransaction({
        address: fromAddress,
        network: networkId,
        transaction: {
            to: toAddress,
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
export async function getWalletAddress() {
    return initializeWallet();
}
