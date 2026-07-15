import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IVendor extends Document {
  vendorName: string;
  email: string;
  phone: string;
  address: string;
  businessId: string;
   image: string;
}

const vendorSchema: Schema<IVendor> =
  new Schema(
    {
      vendorName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      businessId: {
        type: String,
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

const Vendor: Model<IVendor> =
  mongoose.model<IVendor>(
    "Vendor",
    vendorSchema
  );

export default Vendor;