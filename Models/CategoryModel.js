import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: [true, "Most be unique"],
      minlegth: [3, "min length is 3"],
      maxlength: [15, "max length is 8"],
    },
    image: String,
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);
export const CategoryModel = model("Category", CategorySchema);
