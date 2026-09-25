import "dotenv/config";
import cors from "cors";
import path from "path";
import express from "express";

import "./utils/api";

import { ErrorHandler } from "./utils/error";
import { LoggerMiddleware, socialBotMiddleware } from "./utils/middleware";

import { notificationRoutes, crawlersRoutes } from "./controllers";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(LoggerMiddleware);
app.use(socialBotMiddleware);

app.use(crawlersRoutes);
app.use("/", notificationRoutes);

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(ErrorHandler);

app.listen(PORT, async () => {
  console.log(
    `✅ Server started from ${process.env.NODE_ENV} at http://localhost:${PORT}`,
  );
});

const gracefulShutdown = async () => {
  console.log("\n🛑 Gracefully shutting down...");
  console.log("✅ Database disconnected");
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});
