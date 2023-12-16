import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      unique: [true, "Most be unique"],
      minlegth: [4, "min length is 3"],
      maxlength: [8, "max length is 8"],
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
