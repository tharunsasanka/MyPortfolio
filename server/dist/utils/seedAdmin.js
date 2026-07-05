"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const Admin_1 = __importDefault(require("../models/Admin"));
async function seedAdmin() {
    await (0, db_1.connectDatabase)();
    const existingAdmin = await Admin_1.default.findOne({
        email: env_1.env.adminEmail,
    });
    if (existingAdmin) {
        console.log("Admin already exists:");
        console.log(existingAdmin.email);
        process.exit(0);
    }
    const admin = await Admin_1.default.create({
        name: env_1.env.adminName,
        email: env_1.env.adminEmail,
        password: env_1.env.adminPassword,
    });
    console.log("Admin created successfully:");
    console.log(admin.email);
    process.exit(0);
}
seedAdmin().catch((error) => {
    console.error("Admin seed failed");
    console.error(error);
    process.exit(1);
});
