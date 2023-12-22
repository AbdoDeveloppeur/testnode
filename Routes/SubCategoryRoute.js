import express from "express";
const router = express.Router({mergeParams:true});
import {
  CreateSubCategory,
  deleteSubCategoryById,
  getSubCategories,
  getSubCategoryById,
  setCategoryidInBody,
  updateSubCategoryById,
} from "../Controller/SubCategoryController.js";
import {
  CreateSubCategoryValidator,
  DeleteSubCategoryValidator,
  getSubCategoryValidator,
} from "../utils/ValidatorsRules/SubCategoryValidator.js";

router
  .route("/")
  .post(setCategoryidInBody,CreateSubCategoryValidator, CreateSubCategory)
  .get(getSubCategories);
router
  .route("/api/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .delete(DeleteSubCategoryValidator,deleteSubCategoryById)
  .put(updateSubCategoryById);

export default router;
