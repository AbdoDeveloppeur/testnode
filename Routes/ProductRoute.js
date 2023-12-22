import express from "express";
const router = express.Router();
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from "../utils/ValidatorsRules/ProductValidation.js";
import {
  CreateProduct,
  getProductById,
  updateProdcutById,
  getAllProducts,
  deleteProductById,
} from "../Controller/ProductController.js";

router.route("/").post(createProductValidator, CreateProduct).get(getAllProducts);
router
  .route("/:id")
  .get(getProductValidator, getProductById)
  .put(updateProductValidator, updateProdcutById)
  .delete(deleteProductValidator, deleteProductById);

export default router;
