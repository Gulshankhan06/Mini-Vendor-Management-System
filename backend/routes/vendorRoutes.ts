import express, { Request, Response } from "express";
import Vendor from "../models/VendorModel";

const router = express.Router();

/* ================= ADD VENDOR ================= */

router.post("/add", async (req: Request, res: Response) => {
  try {
    const {
      vendorName,
      email,
      phone,
      address,
      businessId,
    } = req.body;

    const vendor = await Vendor.create({
      vendorName,
      email,
      phone,
      address,
      businessId,
    });

    return res.status(201).json({
      success: true,
      message: "Vendor Added Successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= GET ALL VENDORS ================= */

router.get("/all", async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      vendors,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= DELETE VENDOR ================= */

router.delete(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const vendorId = req.params.id;

      await Vendor.findByIdAndDelete(vendorId);

      return res.status(200).json({
        success: true,
        message: "Vendor Deleted Successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

/* ================= UPDATE VENDOR ================= */

router.put(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const vendorId = req.params.id;

      const updatedVendor =
        await Vendor.findByIdAndUpdate(
          vendorId,
          req.body,
          {
            new: true,
          }
        );

      return res.status(200).json({
        success: true,
        message: "Vendor Updated Successfully",
        vendor: updatedVendor,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
);

/* ================= VENDOR DASHBOARD ================= */

router.get(
  "/dashboard/:id",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      res.json({
        vendorId: id,
        totalOrders: 25,
        pendingOrders: 8,
        completedOrders: 17,
        monthlySales: 15000,
        totalRevenue: 85000,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;