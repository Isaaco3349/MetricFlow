"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllowlist = loadAllowlist;
exports.isAllowlisted = isAllowlisted;
exports.addToAllowlist = addToAllowlist;
exports.getAllowlistSnapshot = getAllowlistSnapshot;
exports.getAllowlistSize = getAllowlistSize;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = require("../utils/config");
// ---- In-memory cache + persistence ----
let allowlist = new Map(); // key = ethAddress
function loadAllowlist() {
    const filePath = config_1.config.allowlistOutputPath;
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    if (!fs_1.default.existsSync(filePath)) {
        logger_1.default.info("No allowlist file found — starting fresh", { filePath });
        saveAllowlist();
        return;
    }
    try {
        const raw = fs_1.default.readFileSync(filePath, "utf-8");
        const entries = JSON.parse(raw);
        allowlist = new Map(entries.map((e) => [e.ethAddress.toLowerCase(), e]));
        logger_1.default.info(`Loaded allowlist`, { count: allowlist.size });
    }
    catch (err) {
        logger_1.default.error("Failed to load allowlist — starting fresh", { err });
        allowlist = new Map();
    }
}
function saveAllowlist() {
    const entries = Array.from(allowlist.values());
    fs_1.default.writeFileSync(config_1.config.allowlistOutputPath, JSON.stringify(entries, null, 2), "utf-8");
}
function isAllowlisted(ethAddress) {
    return allowlist.has(ethAddress.toLowerCase());
}
function addToAllowlist(event, ethAddress) {
    const key = ethAddress.toLowerCase();
    if (allowlist.has(key)) {
        logger_1.default.info("Address already allowlisted", {
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
    logger_1.default.info("✅ Added to allowlist", {
        username: entry.username,
        ethAddress: entry.ethAddress,
        trigger: entry.triggerEvent,
    });
    return entry;
}
function getAllowlistSnapshot() {
    return Array.from(allowlist.values());
}
function getAllowlistSize() {
    return allowlist.size;
}
