import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel";
import { sendVerificationEmail } from "../utils/sendEmail";
import { generateOTP } from "../utils/otp";
import Otp from "../models/OtpModel";
export const register = async (
  req: Request,
  res: Response
) => {
  console.log("🔥 REGISTER ROUTE HIT");
  console.time("REGISTER");

  try {
    const {
      username,
      name,
      email,
      phone,
      password,
      role,
    } = req.body;

    // Check Username
    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Check Email
    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash Password
    const hashed = await bcrypt.hash(password, 10);

    console.timeLog(
      "REGISTER",
      "password hashed"
    );
// Check if email is verified
const otpRecord = await Otp.findOne({
  email,
  verified: true,
});

if (!otpRecord) {
  return res.status(400).json({
    success: false,
    message: "Please verify your email first",
  });
}
const user = await User.create({
  username: username.toLowerCase(),
  name,
  email,
  phone,
  password: hashed,
  role: role || "vendor",
  provider: "local",
  isEmailVerified: true,
}); 
await Otp.deleteOne({ email });
    return res.status(201).json({
      success: true,
      message:
        "Registered successfully. Verify email OTP.",
      email: user.email,
    });
  } catch (err) {
    console.log(err);

    console.timeEnd("REGISTER");

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const login = async (
  req: Request,
  res: Response
) => {
  console.log("🔥 LOGIN ROUTE HIT");
  console.time("LOGIN");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.timeLog("LOGIN", "user found");

    if (!user) {
      console.timeEnd("LOGIN");
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.password) {
      console.timeEnd("LOGIN");
      return res.status(400).json({
        message: "Use Google login",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    console.timeLog(
      "LOGIN",
      "password checked"
    );

    if (!match) {
      console.timeEnd("LOGIN");
      return res.status(400).json({
        message: "Invalid credentials",
      });
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
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    console.timeLog(
      "LOGIN",
      "token generated"
    );

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

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const verifyEmailOtp = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, otp } = req.body;

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      return res.status(404).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (new Date() > otpData.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    otpData.verified = true;
    await otpData.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const profile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const googleCallback = async (
  req: any,
  res: any
) => {
  try {
    console.log("🔥 GOOGLE USER:", req.user);

    if (!req.user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login`
      );
    }

    const token = jwt.sign(
      {
        id: req.user._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/login-success?token=${token}`
    );
  } catch (err) {
    console.log(err);

    return res.redirect(
      `${process.env.FRONTEND_URL}/login`
    );
  }
};
export const sendEmailOtp = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Email already registered?
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete old OTP if exists
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      verified: false,
    });

    // Send Email
    await sendVerificationEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};