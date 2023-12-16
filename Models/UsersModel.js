import { Schema, model } from "mongoose";

const users = new Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
});

export const UsersModel = model("users", users);
