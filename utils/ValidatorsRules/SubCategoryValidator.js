import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/ValidatorMiddleware.js";

export const CreateSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name id Required")
    .isLength({ min: 2, max: 32 })
    .withMessage("Name must be between 3 and 50 characters"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];
export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id Format"),
  validatorMiddleware,
];

export const PutSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id"),
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  validatorMiddleware,
];

export const DeleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id Format"),
  validatorMiddleware,
];
