import express from "express";
import passport from "../config/passport";

import {
  register,
  login,
  verifyEmailOtp,
  googleCallback,
  getCurrentUser,
  profile,
  updateProfile,
  deleteProfile,
  uploadProfileImage,
} from "../controllers/authController";

import { authMiddleware } from "../middleware/authMiddleware";
import upload from "../middleware/upload";

const router = express.Router();

/* ================= REGISTER ================= */

router.post("/verify-email", verifyEmailOtp);
router.post("/register", register);

/* ================= LOGIN ================= */

router.post("/login", login);

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
  googleCallback
);

/* ================= USER ================= */

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

router.get(
  "/profile",
  authMiddleware,
  profile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);

router.delete(
  "/profile",
  authMiddleware,
  deleteProfile
);

export default router;