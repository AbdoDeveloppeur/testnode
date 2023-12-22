import { Mongoose, Schema, model } from "mongoose";

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "This email is existe"],
      lowercase: true,
    },
    phone: string,
    profileImg: string,
    password: {
      type: string,
      minlength: [6, "Too short password"],
    },
    role: {
      type: string,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
export const UsersModel = model("Users", UsersSchema);
