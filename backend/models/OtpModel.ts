import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;

  userData: {
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "vendor";
  };
}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    userData: {
      username: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        default: "",
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        default: "vendor",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Otp: Model<IOtp> = mongoose.model<IOtp>(
  "Otp",
  otpSchema
);

export default Otp;