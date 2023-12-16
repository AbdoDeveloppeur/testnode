import express from "express";
const router = express.Router();
import {
  CreateUser,
  DeleteUser,
  getUserByEmail,
} from "../Controller/UsersController.js";

router.post("/add", CreateUser);
router.get("/login", getUserByEmail);

router.delete("/:userId", DeleteUser);
export default router;
