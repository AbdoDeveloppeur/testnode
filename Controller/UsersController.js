import { UsersModel } from "../Models/UsersModel.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
//import { LoginModel } from "../Models/LoginModel.js";

export const CreateUser = async (req, res) => {
  try {
    const { username, age } = req.body;
    const user = new UsersModel({ username, age });
    await user.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.errors });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const DeleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  // Check if the user exists
  const user = await UsersModel.findById(userId);
  if (!user) {
    return next(ApiError("User not found", 404));
  }

  res.status(200).json({ message: "User deleted successfully" });
});

// ** ========> Find_User_By_Email
export const getUserByEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await LoginModel.findOne({ email });

  if (!user) {
    return next(new ApiError(`No user found with email: ${email}`, 404));
  }

  return res.status(200).json({
    data: user,
  });
});
