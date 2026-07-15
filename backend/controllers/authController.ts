import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel";
import { sendVerificationEmail } from "../utils/sendEmail";
import { generateOTP } from "../utils/otp";
import Otp from "../models/OtpModel";
import uploadToCloudinary from "../utils/uploadToCloudinary";
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
const nameRegex = /^[A-Za-z ]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
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

    // Required Fields
if (!username || !name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "All required fields are required",
  });
}

// Username
if (!usernameRegex.test(username)) {
  return res.status(400).json({
    success: false,
    message:
      "Username must be 3-20 characters and contain only letters, numbers and underscore.",
  });
}

// Name
if (!nameRegex.test(name)) {
  return res.status(400).json({
    success: false,
    message: "Name should contain only letters and spaces.",
  });
}

// Email
if (!emailRegex.test(email)) {
  return res.status(400).json({
    success: false,
    message: "Invalid email format.",
  });
}

// Phone
if (phone && !phoneRegex.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "Invalid phone number.",
  });
}

// Password
if (!passwordRegex.test(password)) {
  return res.status(400).json({
    success: false,
    message:
      "Password must contain uppercase, lowercase, number and special character and be at least 8 characters.",
  });
}

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
// const otpRecord = await Otp.findOne({
//   email,
//   verified: true,
// });

// if (!otpRecord) {
//   return res.status(400).json({
//     success: false,
//     message: "Please verify your email first",
//   });
// }
// Generate OTP
const otp = generateOTP();

// Remove old OTP if exists
await Otp.deleteOne({ email });

// Save OTP + Temporary User Data
await Otp.create({
  email,
  otp,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes

  userData: {
    username: username.toLowerCase(),
    name,
    email,
    phone,
    password: hashed,
    role: role || "vendor",
  },
});

// Send OTP Email
await sendVerificationEmail(email, otp);

return res.status(200).json({
  success: true,
  message: "OTP sent successfully",
  email,
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

    if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format",
  });
}

if (!password) {
  return res.status(400).json({
    message: "Password is required",
  });
}

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
export const verifyEmailOtp = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ email });

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await User.create({
      ...otpRecord.userData,
      provider: "local",
      isEmailVerified: true,
    });

    await Otp.deleteOne({ email });

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
export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const { name, phone, password } = req.body;

    const updateData: any = {};

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const deleteProfile = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = (req as any).user.id;

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const uploadProfileImage = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const imageUrl = await uploadToCloudinary(
      req.file,
      "profile-images"
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: imageUrl,
      },
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};