import fs from "fs";
import path from "path";
import logger from "../utils/logger";
import { config } from "../utils/config";
// ---- In-memory cache + persistence ----
let allowlist = new Map(); // key = ethAddress
export function loadAllowlist() {
    const filePath = config.allowlistOutputPath;
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
        logger.info("No allowlist file found — starting fresh", { filePath });
        saveAllowlist();
        return;
    }
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        const entries = JSON.parse(raw);
        allowlist = new Map(entries.map((e) => [e.ethAddress.toLowerCase(), e]));
        logger.info(`Loaded allowlist`, { count: allowlist.size });
    }
    catch (err) {
        logger.error("Failed to load allowlist — starting fresh", { err });
        allowlist = new Map();
    }
}
function saveAllowlist() {
    const entries = Array.from(allowlist.values());
    fs.writeFileSync(config.allowlistOutputPath, JSON.stringify(entries, null, 2), "utf-8");
}
export function isAllowlisted(ethAddress) {
    return allowlist.has(ethAddress.toLowerCase());
}
export function addToAllowlist(event, ethAddress) {
    const key = ethAddress.toLowerCase();
    if (allowlist.has(key)) {
        logger.info("Address already allowlisted", {
            ethAddress,
            username: event.reactorUsername,
        });
        return allowlist.get(key);
    }
    const entry = {
        fid: event.reactorFid,
        username: event.reactorUsername,
        ethAddress,
        addedAt: new Date().toISOString(),
        triggerEvent: event.type,
        castHash: event.castHash,
    };
    allowlist.set(key, entry);
    saveAllowlist();
    logger.info("✅ Added to allowlist", {
        username: entry.username,
        ethAddress: entry.ethAddress,
        trigger: entry.triggerEvent,
    });
    return entry;
}
export function getAllowlistSnapshot() {
    return Array.from(allowlist.values());
}
export function getAllowlistSize() {
    return allowlist.size;
}
