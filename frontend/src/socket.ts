import { io } from "socket.io-client";

export const socket = io(
  "https://mini-vendor-management-system.onrender.com"
);