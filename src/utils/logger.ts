import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

export const logger = pino({
  transport: isDevelopment ? { target: "pino-pretty" } : undefined,
  name: "api",
  level: isDevelopment ? "debug" : "info"
});