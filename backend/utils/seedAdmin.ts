import bcrypt from "bcryptjs";
import User from "../models/UserModel";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await User.create({
      username: "admin",
      name: "System Admin",
      email: "admin@gmail.com",
      phone: "",
      password: hashedPassword,
      role: "admin",
      provider: "local",
      isEmailVerified: true,
    });

    console.log("✅ Admin account created");
  } catch (error) {
    console.log("❌ Seed Admin Error:", error);
  }
};