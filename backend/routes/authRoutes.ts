import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "../config/passport";

import User from "../models/UserModel";
import { sendVerificationEmail } from "../utils/sendEmail";
import { generateOTP } from "../utils/otp";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req: Request, res: Response) => {
  console.log("🔥 REGISTER ROUTE HIT");
  console.time("REGISTER");

  try {
    const {username, name, email, phone, password, role } = req.body;
const existingUsername = await User.findOne({
  username: username.toLowerCase(),
});

if (existingUsername) {
  return res.status(400).json({
    success: false,
    message: "Username already exists",
  });
}

const existingEmail = await User.findOne({ email });

if (existingEmail) {
  return res.status(400).json({
    success: false,
    message: "Email already exists",
  });
}
    
    

    const hashed = await bcrypt.hash(password, 10);
    console.timeLog("REGISTER", "password hashed");

    const emailOtp = generateOTP();

    const user = await User.create({
       username: username.toLowerCase(),
      name,
      email,
      phone,
      password: hashed,
      role: role || "vendor",
      provider: "local",
      isEmailVerified: false,
      emailOtp,
      emailOtpExpires: new Date(Date.now() + 5 * 60 * 1000),
    });
    console.timeLog("REGISTER", "user created");

   try {
  await sendVerificationEmail(email, emailOtp);
  console.timeLog("REGISTER", "email sent");
} catch (err) {
  return res.status(500).json({
    success: false,
    message: "Failed to send OTP email",
  });
}

    return res.status(201).json({
      success: true,
      message: "Registered successfully. Verify email OTP.",
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    console.timeEnd("REGISTER");
    return res.status(500).json({ message: "Server Error" });
  }
});

/* ================= VERIFY EMAIL OTP ================= */

router.post("/verify-email-otp", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.emailOtpExpires || new Date() > user.emailOtpExpires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ VERIFY USER
    user.isEmailVerified = true;
    user.emailOtp = null;
    user.emailOtpExpires = null;

    await user.save();

    // 🔥 TOKEN GENERATE
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // ✅ RESPONSE WITH TOKEN + USER
    return res.json({
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});
/* ================= LOGIN ================= */
router.post("/login", async (req: Request, res: Response) => {
  console.log("🔥 LOGIN ROUTE HIT");
    console.time("LOGIN");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
     console.timeLog("LOGIN", "user found");

    if (!user) {
      console.timeEnd("LOGIN");
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
       console.timeEnd("LOGIN");
      return res.status(400).json({ message: "Use Google login" });
    }

    const match = await bcrypt.compare(password, user.password);
     console.timeLog("LOGIN", "password checked");


    if (!match) {
       console.timeEnd("LOGIN");
      return res.status(400).json({ message: "Invalid credentials" });
    }

   
if (!user.isEmailVerified) {
  return res.json({
    success: false,
    emailVerified: false,
    email: user.email,
    message: "OTP generation skipped for testing",
  });
}

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
       console.timeLog("LOGIN", "token generated");
    console.timeEnd("LOGIN");


    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
         username: user.username,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    console.timeEnd("LOGIN");
    return res.status(500).json({ message: "Server Error" });
  }
});

/* ================= GOOGLE LOGIN ================= */
 router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req: any, res: any) => {
    try {
      console.log("🔥 GOOGLE USER:", req.user);

      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login`);
      }

      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/login-success?token=${token}`
      );
    } catch (err) {
      console.log(err);
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);
/* ================= PROTECTED PROFILE ROUTE ================= */
router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;