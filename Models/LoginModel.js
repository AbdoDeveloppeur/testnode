import { Schema, model } from "mongoose";

const LoginSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
    },
  },
  { timestamps: true }
);
export const CategoryModel = model("Login", LoginSchema);
