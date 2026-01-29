// scripts/createAdmin.js
import { connectDB } from "../src/lib/mongodb.js";
import Admin from "../src/models/Admin.js";
async function createAdmin() {
  try {
    await connectDB();

    const admin = await Admin.create({
      email: "admin@example.com",
      password: "12345678", // will be hashed automatically
      name: "Super Admin",
    });

    console.log("Admin created:", admin);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
