import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  roomId: string;
  vendorId: string;
  vendorName: string;
  lastMessage: string;
}

const chatSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    vendorId: {
      type: String,
      required: true,
    },

    vendorName: {
      type: String,
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChat>("Chat", chatSchema);