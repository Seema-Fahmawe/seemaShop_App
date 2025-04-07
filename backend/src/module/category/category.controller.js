import slugify from "slugify";
import asyncHandler from "../../utils/catchError.js";
import categoryModel from "../../../DB/models/category.model.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  req.body.slug = slugify(name, "_");
  req.body.createdBy = req.id;
  req.body.updatedBy = req.id;
  const category = await categoryModel.create(req.body);
  return res.status(201).json({ message: "success", category });
});

export const getAllCategory = asyncHandler(async (req, res, next) => {
    
});
