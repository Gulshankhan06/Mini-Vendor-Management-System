import { Request, Response } from "express";
import Message from "../models/MessageModel";

/* ================= SEND MESSAGE ================= */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const {
      senderId,
      senderName,
      receiverId,
      receiverName,
      roomId,
      message,
    } = req.body;

    const newMessage = new Message({
      senderId,
      senderName,
      receiverId,
      receiverName,
      roomId,
      message,
    });

    await newMessage.save();

    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error,
    });
  }
};

/* ================= GET MESSAGES ================= */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error,
    });
  }
};

/* ================= DELETE MESSAGE ================= */
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Message deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting message",
      error,
    });
  }
};