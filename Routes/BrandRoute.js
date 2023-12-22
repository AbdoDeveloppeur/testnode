import express from "express";
const router = express.Router();
import {
  CreateBrandValidator,
  getBrandValidator,
  PutBrandValidator,
  DeleteBrandValidator,
} from "../utils/ValidatorsRules/BrandValidation.js";
import {
  CreateBrand,
  getBrandById,
  getBrand,
  updateBrandById,
  deleteBrandById,
} from "../Controller/BrandController.js";

router.route("/").post(CreateBrandValidator, CreateBrand).get(getBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(PutBrandValidator, updateBrandById)
  .delete(DeleteBrandValidator, deleteBrandById);

export default router;
