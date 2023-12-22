import { BrandModel } from "../Models/BrandsModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";

//** =======> Create_New_Brand <========
export const CreateBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if category already exists in the database by its name or slug
  let brand = await BrandModel.findOne({
    $or: [{ name }, { slug: slugify(name, { lower: true }) }],
  });

  // If the category already exists, you may want to handle this case accordingly.
  if (brand) {
    return next(new ApiError(`Brand already exists at name ${name}`, 400));
  }

  // Create a new category
  brand = await BrandModel.create({
    name,
    slug: slugify(name, { lower: true }),
  });

  res.status(201).json({ data: brand });
});
//** =======>  get Brands  <========
export const getBrand = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 2; // Number of items per page, default is 10

  const skip = (page - 1) * limit;

  const Brands = await BrandModel.find().skip(skip).limit(limit);

  res.status(200).json({
    data: Brands,
    pageInfo: {
      currentPage: page,
      limit: limit,
    },
  });
});

// ** =======>   Get_Specific_Brand  <========
export const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brands = await BrandModel.findById(id);

  if (!brands) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));
  }
  return res.status(200).json({
    data: brands,
  });
});

// ** =======>  Update_Specific_Category  <========
export const updateBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body; // Assuming you're sending updated data in the request body

  // Validate that the required fields are provided
  if (!name) {
    res
      .status(400)
      .json({ message: "Name is required for updating the category" });
    return;
  }

  const updatedBrand = await BrandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name, { lower: true }) },
    { new: true } // Returns the updated document
  );

  !updatedBrand && next(new ApiError("Brand not found", 404));

  res.status(200).json({
    data: updatedBrand,
    message: "Brand updated successfully",
  });
});

//** =========> Delete_Specefic_Category  <========
export const deleteBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await BrandModel.findByIdAndDelete(id);

  if (!deletedBrand) {
    return next(new ApiError("Brand not found", 404));
  }

  res.status(204).json({
    message: "Brand deleted successfully",
  });
});
