import { ProductModel } from "../Models/ProductsModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";

//** =======> Create_New_category <========
export const CreateProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  const product = await ProductModel.create(req.body);
  return res.status(201).json({
    data: product,
  });
});
//** =======>  get _All_category  <========
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 2; // Number of items per page, default is 10

  const skip = (page - 1) * limit;

  const products = await ProductModel.find()
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name-_id" });

  res.status(200).json({
    data: products,
    pageInfo: {
      currentPage: page,
      limit: limit,
    },
  });
});

// ** =======>   Get_Specific_Category  <========
export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id).populate({
    path: "category",
    select: "name-_id",
  });

  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  return res.status(200).json({
    data: product,
  });
});

// ** =======>  Update_Specific_Category  <========
export const updateProdcutById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return next(new ApiError("Product Not found", 404));
  }

  res.status(200).json({
    data: updatedProduct,
    message: "Product updated successfully",
  });
});

//** =========> Delete_Specefic_Category  <========
export const deleteProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deleteProduct = await ProductModel.findByIdAndDelete(id);

  if (!deleteProduct) {
    return next(new ApiError("Product not found", 404));
  }

  res.status(204).json({
    message: "Product deleted successfully",
  });
});
