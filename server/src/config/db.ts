import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env";

dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
}