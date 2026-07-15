import { Request, Response } from "express";
import Product from "../models/ProductModel";
import Category from "../models/CategoryModel";
import uploadToCloudinary from "../utils/uploadToCloudinary";

/* ================= ADD PRODUCT ================= */

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const {
  productName,
  category,
  price,
  quantity,
} = req.body;

let image = "";

if (req.file) {
  image = await uploadToCloudinary(
    req.file,
    "products"
  );
}
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }
const product = await Product.create({
  productName,
  category,
  price,
  quantity,
  image,
});
    
    await Category.findByIdAndUpdate(category, {
      $inc: { totalProducts: 1 },
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL PRODUCTS ================= */

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    const category = await Category.findById(product.category);

    if (category) {
      category.totalProducts = Math.max(
        0,
        (category.totalProducts || 0) - 1
      );

      await category.save();
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= UPDATE PRODUCT ================= */

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const oldProduct = await Product.findById(req.params.id);

    if (!oldProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    const oldCategory = oldProduct.category.toString();
    const newCategory = req.body.category;
const updateData: any = {
  ...req.body,
};

if (req.file) {
  updateData.image = await uploadToCloudinary(
    req.file,
    "products"
  );
}

const updatedProduct =
  await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      returnDocument: "after",
    }
  );
   

    if (newCategory && oldCategory !== newCategory) {
      await Category.findByIdAndUpdate(oldCategory, {
        $inc: { totalProducts: -1 },
      });

      await Category.findByIdAndUpdate(newCategory, {
        $inc: { totalProducts: 1 },
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= CATEGORY PRODUCTS ================= */

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
    }).populate("category", "name");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};