const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

/* ================= ADD PRODUCT ================= */

router.post("/add", async (req, res) => {

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

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

});

/* ================= GET ALL PRODUCTS ================= */

router.get("/all", async (req, res) => {

  try {

    const products = await Product.find().sort({
      createdAt: -1,
    });

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

});

/* ================= DELETE PRODUCT ================= */

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

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

});

/* ================= UPDATE PRODUCT ================= */

router.put("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

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

});

module.exports = router;