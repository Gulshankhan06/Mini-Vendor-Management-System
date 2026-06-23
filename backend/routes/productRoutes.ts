import express, { Request, Response } from "express";

import Product from "../models/ProductModel";
import Category from "../models/CategoryModel";


const router = express.Router();

/* ================= ADD PRODUCT ================= */

router.post("/add", async (req: Request, res: Response) => {
  try {
    const {
      productName,
      category,
      price,
      quantity,
    } = req.body;

    // Check category exists
    const existingCategory =
      await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      productName,
      category,
      price,
      quantity,
    });

    // Update category product count
    await Category.findByIdAndUpdate(category, {
      $inc: { totalProducts: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= GET ALL PRODUCTS ================= */

router.get("/all", async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= DELETE PRODUCT ================= */

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Safe category count update
    const category = await Category.findById(
      product.category
    );

    if (category) {
      category.totalProducts = Math.max(
        0,
        (category.totalProducts || 0) - 1
      );

      await category.save();
    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* ================= UPDATE PRODUCT ================= */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const oldProduct = await Product.findById(req.params.id);

    if (!oldProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const oldCategory = oldProduct.category.toString();
    const newCategory = req.body.category;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // If category changed
    if (newCategory && oldCategory !== newCategory) {
      await Category.findByIdAndUpdate(oldCategory, {
        $inc: { totalProducts: -1 },
      });

      await Category.findByIdAndUpdate(newCategory, {
        $inc: { totalProducts: 1 },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
/* ================= CATEGORY PRODUCTS ================= */

router.get(
  "/category/:categoryId",
  async (req: Request, res: Response) => {
    try {
      const products = await Product.find({
        category: req.params.categoryId,
      }).populate("category", "name");

      return res.status(200).json({
        success: true,
        products,
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

export default router;