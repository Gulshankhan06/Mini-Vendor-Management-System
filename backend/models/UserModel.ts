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
  image:string;

  
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  lowercase: true,
   minlength: 3,
  maxlength: 20,
  match: /^[a-zA-Z0-9_]{3,20}$/,
},
    name: { type: String, required: true, trim: true , match: /^[A-Za-z ]{2,50}$/,},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true ,  match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
},

    phone: { type: String, default: null, match: /^[6-9]\d{9}$/, },

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

image: {
  type: String,
  default: "",
},
   
  },
  { timestamps: true }
);


const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;