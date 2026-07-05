"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const Admin_1 = __importDefault(require("../models/Admin"));
async function resetAdminPassword() {
    await (0, db_1.connectDatabase)();
    const admin = await Admin_1.default.findOne({
        email: env_1.env.adminEmail.toLowerCase(),
    }).select("+password");
    if (!admin) {
        console.log("Admin not found. Run npm run seed:admin first.");
        process.exit(1);
    }
    console.log("Admin found:");
    console.log(admin.email);
    admin.password = env_1.env.adminPassword;
    await admin.save();
    const updatedAdmin = await Admin_1.default.findOne({
        email: env_1.env.adminEmail.toLowerCase(),
    }).select("+password");
    if (!updatedAdmin) {
        console.log("Admin verification failed.");
        process.exit(1);
    }
    const isPasswordValid = await updatedAdmin.comparePassword?.(env_1.env.adminPassword);
    if (!isPasswordValid) {
        console.log("Password reset failed. Password does not match after saving.");
        process.exit(1);
    }
    console.log("Admin password reset and verified successfully:");
    console.log(updatedAdmin.email);
    process.exit(0);
}
resetAdminPassword().catch((error) => {
    console.error("Admin password reset failed");
    console.error(error);
    process.exit(1);
});
