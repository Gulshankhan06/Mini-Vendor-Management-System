import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/ChatController";

const router = express.Router();

/* SEND MESSAGE */
router.post("/send", sendMessage);

/* GET MESSAGES */
router.get("/:roomId", getMessages);

/* DELETE MESSAGE */
router.delete("/:id", deleteMessage);

export default router;