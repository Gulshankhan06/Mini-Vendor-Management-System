import express, {
  Request,
  Response,
} from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

const router = express.Router();

// REGISTER API

router.post(
  "/register",
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        phone,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      return res.status(201).json({
        message:
          "User Registered Successfully",
        user,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// LOGIN API

router.post(
  "/login",
  async (req: Request, res: Response) => {
    try {
      const { email, password } =
        req.body;

      const user =
        await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Credentials",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        message: "Login Successful",
        token,
        user,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;