import { connectDatabase } from "../config/db";
import { env } from "../config/env";
import Admin from "../models/Admin";

async function seedAdmin() {
  await connectDatabase();

  const existingAdmin = await Admin.findOne({
    email: env.adminEmail,
  });

  if (existingAdmin) {
    console.log("Admin already exists:");
    console.log(existingAdmin.email);
    process.exit(0);
  }

  const admin = await Admin.create({
    name: env.adminName,
    email: env.adminEmail,
    password: env.adminPassword,
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