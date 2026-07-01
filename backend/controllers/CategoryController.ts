import { Request, Response } from "express";
import Category from "../models/CategoryModel";
import Product from "../models/ProductModel";

// ==========================
// CREATE CATEGORY
// ==========================
export const createCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      description,
      parent,
      status,
    } = req.body;

    // Validate category name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    // Check duplicate category name
    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    // Parent category exists or not
    if (parent) {
      const parentCategory = await Category.findById(
        parent
      );

      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found.",
        });
      }
    }

    // Create category
    const category = await Category.create({
      name: name.trim(),
      description: description || "",
      parent: parent || null,
      status: status || "Active",
      totalProducts: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error: any) {
    console.error("Create Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==========================
// GET ALL CATEGORIES
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
      .populate("parent", "name")
      .sort({ createdAt: -1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat: any) => {
        const count = await Product.countDocuments({
          category: cat._id,
        });

        return {
          ...cat.toObject(),
          totalProducts: count,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categoriesWithCount,
    });
  } catch (error: any) {
    console.error("Get Categories Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
// ==========================
// UPDATE CATEGORY
 // ==========================
export const updateCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      parent,
      status,
    } = req.body;

    // Category exists or not
    const existingCategory =
      await Category.findById(id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Prevent self parent
    if (parent && parent === id) {
      return res.status(400).json({
        success: false,
        message:
          "A category cannot be its own parent.",
      });
    }

    // Check parent exists
    if (parent) {
      const parentCategory = await Category.findById(
        parent
      );

      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found.",
        });
      }
    }

    // Update
    const updatedCategory =
      await Category.findByIdAndUpdate(
        id,
        {
          name: name?.trim(),
          description,
          parent: parent || null,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error("Update Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==========================
// DELETE CATEGORY
// ==========================
export const deleteCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category =
      await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Check child categories
    const hasChildren =
      await Category.findOne({
        parent: id,
      });

    if (hasChildren) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category because it contains subcategories.",
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: any) {
    console.error("Delete Category Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};