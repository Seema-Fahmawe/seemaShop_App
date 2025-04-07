import userModel from "../../../DB/models/user.model.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/catchError.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find();
  if (users.length === 0) {
    return next(new AppError(`no users found `, 401));
  }
  return res.status(200).json({ message: "success", users });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError(`User does not exist`, 404));
  }

  return res.status(200).json({ message: "success" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new AppError(`User does not exist`, 404));
  }
  return res.status(200).json({ message: "success", user });
});
