import asyncHandler from "../utils/catchError.js";
import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";
import userModel from "../../DB/models/user.model.js";

const auth = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new AppError(`unauthenticated token`, 401));
    }
    const decoded = verifyToken(token, `${process.env.loginToken}`);
    const user = await userModel.findById(decoded.id);
    if (!accessRoles.includes(user.role)) {
      return next(new AppError(`Unauthorized access`, 403));
    }
    req.id = decoded.id;
    next();
  });
};

export default auth;
