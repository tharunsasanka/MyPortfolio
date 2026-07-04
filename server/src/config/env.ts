import dotenv from "dotenv";

dotenv.config();

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  mongoUri: requiredEnv("MONGO_URI"),

  jwtSecret: requiredEnv("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  adminName: process.env.ADMIN_NAME || "Admin",
  adminEmail: requiredEnv("ADMIN_EMAIL"),
  adminPassword: requiredEnv("ADMIN_PASSWORD"),
};