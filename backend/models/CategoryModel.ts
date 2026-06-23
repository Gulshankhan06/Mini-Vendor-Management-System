import mongoose, { Schema, Document } from "mongoose";

// ==========================
// CATEGORY INTERFACE
// ==========================
export interface ICategory extends Document {
  name: string;
  description?: string;
  parent?: mongoose.Types.ObjectId | null;
  status?: "Active" | "Inactive";
  totalProducts?: number;
}

// ==========================
// CATEGORY SCHEMA
// ==========================
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    totalProducts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// MODEL EXPORT
// ==========================
export default mongoose.model<ICategory>(
  "Category",
  categorySchema
);