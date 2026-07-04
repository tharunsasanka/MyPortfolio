import { connectDatabase } from "../config/db";
import { env } from "../config/env";
import Admin from "../models/Admin";

type AdminWithComparePassword = {
  comparePassword?(candidatePassword: string): Promise<boolean>;
};

async function resetAdminPassword() {
  await connectDatabase();

  const admin = await Admin.findOne({
    email: env.adminEmail.toLowerCase(),
  }).select("+password");

  if (!admin) {
    console.log("Admin not found. Run npm run seed:admin first.");
    process.exit(1);
  }

  console.log("Admin found:");
  console.log(admin.email);

  admin.password = env.adminPassword;
  await admin.save();

  const updatedAdmin = await Admin.findOne({
    email: env.adminEmail.toLowerCase(),
  }).select("+password");

  if (!updatedAdmin) {
    console.log("Admin verification failed.");
    process.exit(1);
  }

  const isPasswordValid = await (updatedAdmin as AdminWithComparePassword).comparePassword?.(env.adminPassword);

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