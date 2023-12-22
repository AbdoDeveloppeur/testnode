import { Mongoose, Schema, model } from "mongoose";

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim:true,
      required: [true, "SubCategory is required"],
      unique: [true, "SubCategory Most be unique"],
      minlegth: [2, "min length is 2 For SubCategory"],
      maxlength: [32, "max length is 8"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent  Category"],
    },
  },
  { timestamps: true }
);
export const SubCategoryModel = model("SubCategory", SubCategorySchema);
