import express, {
  Request,
  Response,
} from "express";

import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db";

import vendorRoutes from "./routes/vendorRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

/* ================= DATABASE CONNECTION ================= */

connectDB();

/* ================= APP ================= */

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);

app.use("/api/vendors", vendorRoutes);

app.use("/api/products", productRoutes);

/* ================= HOME ROUTE ================= */

app.get(
  "/",
  (req: Request, res: Response) => {
    res.send(
      "Backend Running Successfully"
    );
  }
);

/* ================= SERVER ================= */

const PORT: number = Number(
  process.env.PORT
) || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});