import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db";

import vendorRoutes from "./routes/vendorRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import chatRoutes from "./routes/ChatRoutes";

import passport from "./config/passport";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const httpServer = createServer(app);

/* ================= SOCKET ================= */
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    console.log("Joined room:", roomId);
  });

  // real-time message
  socket.on("send-message", (data) => {
    io.to(data.roomId).emit("receive-message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ================= ROUTES ================= */
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log("Server running on port", PORT);
});