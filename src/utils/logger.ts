import winston from "winston";

const { combine, timestamp, colorize, printf, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${timestamp} [${level}] ${message}${metaStr}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "HH:mm:ss" }),
        consoleFormat
      ),
    }),
  ],
});

export default logger;
