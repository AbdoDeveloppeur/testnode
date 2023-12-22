import { CategoryModel } from "../Models/CategoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";  

//** =======> Create_New_category <========
export const CreateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if category already exists in the database by its name or slug
  let category = await CategoryModel.findOne({
    $or: [{ name }, { slug: slugify(name, { lower: true }) }],
  });

  // If the category already exists, you may want to handle this case accordingly.
  if (category) {
    return next(new ApiError(`Category already exists at name ${name}`, 400));
  }

  // Create a new category
  category = await CategoryModel.create({
    name,
    slug: slugify(name, { lower: true }),
  });

  res.status(201).json({ data: category });
});
//** =======>  get _All_category  <========
export const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 2; // Number of items per page, default is 10

  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find().skip(skip).limit(limit);

  res.status(200).json({
    data: categories,
    pageInfo: {
      currentPage: page,
      limit: limit,
    },
  });
});

// ** =======>   Get_Specific_Category  <========
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);

  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404));
  }
  return res.status(200).json({
    data: category,
  });
});

// ** =======>  Update_Specific_Category  <========
export const updateCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body; // Assuming you're sending updated data in the request body

  // Validate that the required fields are provided
  if (!name) {
    res
      .status(400)
      .json({ message: "Name is required for updating the category" });
    return;
  }

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    id,
    { name },
    { new: true } // Returns the updated document
  );

  !updatedCategory && next(new ApiError("Category not found", 404));

  res.status(200).json({
    data: updatedCategory,
    message: "Category updated successfully",
  });
});

//** =========> Delete_Specefic_Category  <========
export const deleteCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedCategory = await CategoryModel.findByIdAndDelete(id);

  if (!deletedCategory) {
    return next(new ApiError("Category not found", 404));
  }

  res.status(204).json({
    message: "Category deleted successfully",
  });
});
