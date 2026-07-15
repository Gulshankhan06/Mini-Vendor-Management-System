import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IProduct extends Document {
  productName: string;
  category: mongoose.Types.ObjectId;
  price: number;
  quantity: number;
   image: string;
}

const productSchema = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    image: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.model<IProduct>(
    "Product",
    productSchema
  );

export default Product;