import type { Request, Response } from "express";
import mongoose from "mongoose";
import app from "../src/app";
import { connectDatabase } from "../src/config/db";

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

export default async function handler(req: Request, res: Response) {
  await ensureDatabaseConnection();
  return app(req, res);
}