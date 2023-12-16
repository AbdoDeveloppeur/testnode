import express from "express";
const router = express.Router();
import {
  CreateCategoryValidator,
  DeleteCategoryValidator,
  getCategoryValidator,
  PutCategoryValidator,
} from "../utils/ValidatorsRules/CategoryValidator.js";
import {
  CreateCategory,
  getCategoryById,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
} from "../Controller/CategoryController.js";

router.route("/api").post(CreateCategoryValidator,CreateCategory).get(getCategories);
router
  .route("/api/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(PutCategoryValidator, updateCategoryById)
  .delete(DeleteCategoryValidator,deleteCategoryById);

export default router;
