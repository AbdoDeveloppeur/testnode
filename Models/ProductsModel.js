import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      unique: [true, "Most be unique product title"],
      minlegth: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short Product  description"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity product is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Product price is required"],
      max: [20000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    colors: [String],
    images: [String],
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to parent  Category"],
    },
    subcategory: [
      {
        type: Schema.ObjectId,
        ref: "SubCategory",
      },
    ],

    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating Must be above or equal 1.0 "],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const ProductModel = model("Product", ProductSchema);
