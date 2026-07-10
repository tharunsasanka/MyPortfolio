import serverless from "serverless-http";
import mongoose from "mongoose";
import app from "../../src/app";
import { connectDatabase } from "../../src/config/db";

const serverlessHandler = serverless(app, {
  binary: ["application/pdf", "application/octet-stream"],
});

let connectionPromise: Promise<void> | null = null;

async function ensureDatabaseConnection() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = connectDatabase();
  }

  await connectionPromise;
}

function normalizeEvent(event: any) {
  const functionPrefix = "/.netlify/functions/api";

  return {
    ...event,
    path:
      typeof event.path === "string"
        ? event.path.replace(functionPrefix, "") || "/"
        : event.path,
    rawUrl:
      typeof event.rawUrl === "string"
        ? event.rawUrl.replace(functionPrefix, "")
        : event.rawUrl,
  };
}

export async function handler(event: any, context: any) {
  await ensureDatabaseConnection();

  return serverlessHandler(normalizeEvent(event), context);
}