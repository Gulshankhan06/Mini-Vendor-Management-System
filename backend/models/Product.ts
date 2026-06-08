import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IProduct extends Document {
  productName: string;
  category: string;
  price: number;
  quantity: number;
}

const productSchema: Schema<IProduct> =
  new Schema(
    {
      productName: {
        type: String,
        required: true,
      },

      category: {
        type: String,
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