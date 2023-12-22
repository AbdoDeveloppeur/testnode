import { SubCategoryModel } from "../Models/SubCategoryModel.js"; //Model of Subcategory
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";

// ** =====> Set categoryId From Params Into Body

export const setCategoryidInBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//** =======> Create_New_Subcategory <========
export const CreateSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;

  // Check if category already exists in the database by its name or slug
  let SubCategory = await SubCategoryModel.findOne({
    $or: [{ name }, { slug: slugify(name, { lower: true }) }],
  });

  if (SubCategory) {
    return next(
      new ApiError(`SubCategory already exists at name ${name}`, 400)
    );
  }

  // Create a new category
  SubCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name, { lower: true }),
    category,
  });

  res.status(201).json({ data: SubCategory });
});

//** =======>  get _All_Subcategory  <========
export const getSubCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 2; // Number of items per page, default is 10
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  const Subcategories = await SubCategoryModel.find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name-_id" });

  res.status(200).json({
    data: Subcategories,
    pageInfo: {
      currentPage: page,
      limit: limit,
    },
  });
});

// ** =======>   Get_Specific_SubCategory  <========
export const getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const Subcategory = await SubCategoryModel.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name-_id",
  // }); // Replace 'category' with the actual field name in your SubCategoryModel that references the CategoryModel

  if (!Subcategory) {
    return next(new ApiError(`No SubCategory for this id ${id}`, 404));
  }
  return res.status(200).json({
    data: Subcategory,
  });
});

// ** =======>  Update_Specific_SubCategory  <========
export const updateSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body; // Assuming you're sending updated data in the request body

  // Validate that the required fields are provided
  if (!name) {
    res.status(400).json({
      message: "name fo Subcategory is required for updating the Subcategory",
    });
    return;
  }

  const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name, { lower: true }), category },
    { new: true } // Returns the updated document
  );

  !updatedSubCategory && next(new ApiError("SubCategory not found", 404));

  res.status(200).json({
    data: updatedSubCategory,
    message: "SubCategory updated successfully",
  });
});

//** =========> Delete_Specefic_SubCategory  <========
export const deleteSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);

  if (!deletedSubCategory) {
    return next(new ApiError("SubCategory not found", 404));
  }

  res.status(204).send({
    message: "SubCategory deleted successfully",
  });
});
