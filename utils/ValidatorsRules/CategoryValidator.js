import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/ValidatorMiddleware.js";

export const CreateCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name id Required")
    .isLength({ min: 3, max: 8 })
    .withMessage("Name must be between 3 and 50 characters"),
  validatorMiddleware,
];
export const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];

export const PutCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  validatorMiddleware,
];


export const DeleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];