import { Server, Socket } from "socket.io";
import Message from "../models/MessageModel";

interface MessageData {
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  roomId: string;
  message: string;
}

const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("✅ User Connected:", socket.id);

    // JOIN ROOM
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log("📌 Joined room:", roomId);
    });

    // SEND MESSAGE
    socket.on("send-message", async (data: MessageData) => {
      try {
        const {
          senderId,
          senderName,
          receiverId,
          receiverName,
          roomId,
          message,
        } = data;

        if (!message || !roomId) return;

        const newMessage = new Message({
          senderId,
          senderName,
          receiverId,
          receiverName,
          roomId,
          message,
        });

        await newMessage.save();

        // REAL-TIME EMIT
        io.to(roomId).emit("receive-message", newMessage);

      } catch (error) {
        console.error("❌ Socket message error:", error);
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};

export default setupSocket;