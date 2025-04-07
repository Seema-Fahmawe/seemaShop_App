import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/catchError.js";

const validation = (schema) => {
  return asyncHandler((req, res, next) => {
    const inputsData = { ...req.body, ...req.query, ...req.params };
    const validationResult = schema.validate(inputsData, { abortEarly: false });
    if (validationResult?.error) {
      return res.status(400).json({
        message: "validation error",
        error: validationResult.error.details,
      });
    }
    next();
  });
};

export default validation;
