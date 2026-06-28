import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  senderName: string;

  receiverId: string;
  receiverName: string;

  roomId: string;

  message: string;
}

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },

    senderName: {
      type: String,
      required: true,
    },

    receiverId: {
      type: String,
      required: true,
    },

    receiverName: {
      type: String,
      required: true,
    },

    roomId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt auto add hoga
  }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;