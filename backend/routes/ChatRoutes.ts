import { Router } from "express";

import {
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/ChatController";

const router = Router();

router.get("/", getChats);

router.get(
  "/messages/:roomId",
  getMessages
);

router.post(
  "/send",
  sendMessage
);

export default router;