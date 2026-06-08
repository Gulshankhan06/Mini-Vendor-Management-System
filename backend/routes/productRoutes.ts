import express, {
  Request,
  Response,
} from "express";

import Product from "../models/Product";

const router = express.Router();

/* ================= ADD PRODUCT ================= */

router.post(
  "/add",
  async (req: Request, res: Response) => {
    try {
      const {
        productName,
        category,
        price,
        quantity,
      } = req.body;

      const product = await Product.create({
        productName,
        category,
        price,
        quantity,
      });

      return res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product,
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

/* ================= GET ALL PRODUCTS ================= */

router.get(
  "/all",
  async (req: Request, res: Response) => {
    try {
      const products =
        await Product.find().sort({
          createdAt: -1,
        });

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

/* ================= DELETE PRODUCT ================= */

router.delete(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Product Deleted Successfully",
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

/* ================= UPDATE PRODUCT ================= */

router.put(
  "/:id",
  async (req: Request, res: Response) => {
    try {
      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Product Updated Successfully",
        product: updatedProduct,
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