"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const node_dns_1 = __importDefault(require("node:dns"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
node_dns_1.default.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
async function connectDatabase() {
    try {
        await mongoose_1.default.connect(env_1.env.mongoUri, {
            serverSelectionTimeoutMS: 15000,
        });
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed");
        console.error(error);
        process.exit(1);
    }
}
