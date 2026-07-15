import { Request, Response } from "express";
import Vendor from "../models/VendorModel";
import uploadToCloudinary from "../utils/uploadToCloudinary";

/* ================= ADD VENDOR ================= */

export const addVendor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const {
  vendorName,
  email,
  phone,
  address,
  businessId,
} = req.body;

let image = "";

if (req.file) {
  image = await uploadToCloudinary(
    req.file,
    "vendors"
  );
}

    const vendor = await Vendor.create({
  vendorName,
  email,
  phone,
  address,
  businessId,
  image,
});
    res.status(201).json({
      success: true,
      message: "Vendor Added Successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL VENDORS ================= */

export const getAllVendors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalVendors = await Vendor.countDocuments();

    const vendors = await Vendor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      vendors,
      currentPage: page,
      totalPages: Math.ceil(totalVendors / limit),
      totalVendors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE VENDOR ================= */

export const deleteVendor = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const vendorId = req.params.id;

    await Vendor.findByIdAndDelete(vendorId);

    res.status(200).json({
      success: true,
      message: "Vendor Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE VENDOR ================= */

export const updateVendor = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const vendorId = req.params.id;

  const updateData: any = {
  ...req.body,
};

if (req.file) {
  updateData.image = await uploadToCloudinary(
    req.file,
    "vendors"
  );
}

const updatedVendor =
  await Vendor.findByIdAndUpdate(
    vendorId,
    updateData,
    {
      returnDocument: "after",
    }
  );

    res.status(200).json({
      success: true,
      message: "Vendor Updated Successfully",
      vendor: updatedVendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= VENDOR DASHBOARD ================= */

export const vendorDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
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
};
export const getVendorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const getVendorByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vendor = await Vendor.findOne({
      email: req.params.email,
    });

    if (!vendor) {
      res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};