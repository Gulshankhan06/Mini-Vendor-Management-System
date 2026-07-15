import express from "express";

import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
} from "../controllers/productController";
import upload from "../middleware/upload";

const router = express.Router();

/* ================= ADD PRODUCT ================= */

router.post(
  "/add",
  upload.single("image"),
  addProduct
);
/* ================= GET ALL PRODUCTS ================= */

router.get("/all", getAllProducts);

/* ================= DELETE PRODUCT ================= */

router.delete("/:id", deleteProduct);

/* ================= UPDATE PRODUCT ================= */

router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);
/* ================= CATEGORY PRODUCTS ================= */

router.get(
  "/category/:categoryId",
  getProductsByCategory
);

export default router;