"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, colorize, printf, json } = winston_1.default.format;
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} [${level}] ${message}${metaStr}`;
});
exports.logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), consoleFormat),
        }),
    ],
});
exports.default = exports.logger;
