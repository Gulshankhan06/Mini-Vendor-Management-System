import express from "express";

import {
  addVendor,
  getAllVendors,
  deleteVendor,
  updateVendor,
  vendorDashboard,
  getVendorById,
  getVendorByEmail,
} from "../controllers/vendorController";

import upload from "../middleware/upload";

const router = express.Router();

/* ================= ADD VENDOR ================= */
router.post(
  "/add",
  upload.single("image"),
  addVendor
);

/* ================= GET ALL VENDORS ================= */
router.get("/all", getAllVendors);

/* ================= GET VENDOR BY EMAIL ================= */
router.get("/email/:email", getVendorByEmail);

/* ================= VENDOR DASHBOARD ================= */
router.get("/dashboard/:id", vendorDashboard);

/* ================= GET SINGLE VENDOR ================= */
router.get("/:id", getVendorById);

/* ================= UPDATE VENDOR ================= */
router.put(
  "/:id",
  upload.single("image"),
  updateVendor
);

/* ================= DELETE VENDOR ================= */
router.delete("/:id", deleteVendor);

export default router;