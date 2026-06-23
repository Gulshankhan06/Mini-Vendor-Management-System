import { Request, Response } from "express";
import Chat from "../models/ChatModel";
import Message from "../models/MessageModel";
import { io } from "../server";

/* GET CHATS */
export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chats" });
  }
};

/* GET MESSAGES */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

/* SEND MESSAGE */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, roomId, message } = req.body;

    const newMsg = await Message.create({
      senderId,
      receiverId,
      roomId,
      message,
    });

    let chat = await Chat.findOne({ roomId });

    if (!chat) {
      chat = await Chat.create({
        roomId,
        vendorId: receiverId,
        vendorName: "Vendor",
        lastMessage: message,
      });
    } else {
      chat.lastMessage = message;
      await chat.save();
    }

    io.to(roomId).emit("receive-message", newMsg);

    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};