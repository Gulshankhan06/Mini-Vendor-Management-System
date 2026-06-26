import { Request, Response } from "express";
import Chat from "../models/ChatModel";
import Message from "../models/MessageModel";
import { io } from "../server";

/* ================= GET CHATS ================= */

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().sort({
      updatedAt: -1,
    });

    return res.json(chats);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch chats",
    });
  }
};

/* ================= GET MESSAGES ================= */

export const getMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({
      roomId,
    }).sort({
      createdAt: 1,
    });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

/* ================= SEND MESSAGE ================= */

export const sendMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      senderId,
      receiverId,
      roomId,
      message,
    } = req.body;

    if (!message.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      roomId,
      message,
    });

    let chat = await Chat.findOne({
      roomId,
    });

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

    // ✅ ONLY ONE EMIT
    io.to(roomId).emit(
      "receive-message",
      newMessage
    );

    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({
      message: "Error sending message",
    });
  }
};