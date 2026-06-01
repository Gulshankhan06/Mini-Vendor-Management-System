const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= IMPORT ROUTES ================= */

const vendorRoutes = require("./routes/vendorRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

/* ================= APP ================= */

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

/* ================= DATABASE CONNECTION ================= */

const connectDB = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");

  } catch (error) {

    console.log("MongoDB Connection Error:");

    console.log(error.message);

    process.exit(1);

  }

};

connectDB();

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);

app.use("/api/vendors", vendorRoutes);

app.use("/api/products", productRoutes);

/* ================= HOME ROUTE ================= */

app.get("/", (req, res) => {

  res.send("Backend Running Successfully");

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});