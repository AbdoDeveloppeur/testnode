import { Schema, model } from "mongoose";

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: [true, "Brand name Most be unique"],
      minlegth: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    image: String,
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
export const BrandModel = model("Brand", BrandSchema);
