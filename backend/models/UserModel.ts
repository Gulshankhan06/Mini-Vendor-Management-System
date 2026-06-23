import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;

  provider: "local" | "google" | "facebook";
  providerId?: string;

  role: "admin" | "vendor";

  isEmailVerified: boolean;

  emailOtp?: string | null;
  emailOtpExpires?: Date | null;
}

const userSchema: Schema<IUser> = new Schema(
  {
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

    emailOtp: { type: String, default: null },
    emailOtpExpires: { type: Date, default: null },
  },
  { timestamps: true }
);


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;