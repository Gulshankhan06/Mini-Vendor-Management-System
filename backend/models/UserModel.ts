import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username:string;
  name: string;
  email: string;
  phone?: string;
  password?: string;

  provider: "local" | "google" | "facebook";
  providerId?: string;

  role: "admin" | "vendor";

  isEmailVerified: boolean;

  
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  lowercase: true,
},
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    phone: { type: String, default: null },

    password: { type: String, default: null },

    provider: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
    },

    providerId: { type: String, default: null },

    role: {
      type: String,
      enum: ["admin", "vendor"],
      default: "vendor",
    },

    isEmailVerified: { type: Boolean, default: false },

   
  },
  { timestamps: true }
);


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;