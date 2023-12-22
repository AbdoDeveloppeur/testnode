import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/ValidatorMiddleware.js";

export const CreateBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name id Required")
    .isLength({ min: 3 })
    .withMessage("min length is  3 characters")
    .isLength({ max: 15 })
    .withMessage("max length is 15 Characters"),
  validatorMiddleware,
];


export const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id Format"),
  validatorMiddleware,
];

export const PutBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  validatorMiddleware,
];

export const DeleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id Format"),
  validatorMiddleware,
];
