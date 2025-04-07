import userModel from "../../../DB/models/user.model.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/catchError.js";
import sendEmail from "../../utils/sendEmail.js";

import jwt from "jsonwebtoken";
import { compare, hash } from "../../utils/hashAndCompare.js";
import {
  generateToken,
  verifyToken,
} from "../../utils/generateAndVerifyToken.js";
import { customAlphabet } from "nanoid";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashPassword = hash(password);
  if (await userModel.findOne({ email })) {
    return next(new AppError(`User ${name} already exists`, 401));
  }
  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  const token = generateToken({ email }, `${process.env.registerToken}`);
  const html = `<div>wlcome ${name}</div>
   <p>Please verify your email by clicking the link below:</p>
   <a href="${req.protocol}://${req.headers.host}/${token}">Confirm Email</a>`;
  await sendEmail(email, "confirm email", html);
  return res.status(201).json({ message: "success", user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError(`invalid data`, 404));
  }
  if (!user.confirmEmail) {
    return next(new AppError(`Email not confirmed`, 401)); // add this line to check if user has confirmed email before login  // you can add your custom error message here based on your application requirements.  // For example, you can return a message saying "Please confirm your email before logging in." instead of just 401.  // If you want to continue to return 401, you can remove this line.  // If you want to add more checks or actions, you can add them here.  // For example, you can check if the user has a verified phone number before allowing them to log in.  // You can also add a check to see if the user has a verified address before allowing them to log in.  // You can also add a check to see if the user has a verified social media account before allowing them to log in.  // You can also add a check to see if the user has a
  }
  if (user.status == "inactive") {
    return next(new AppError(`your account is blocked`, 401)); // add this line to check if user is inactive before allowing them to log in  // you can add your custom error message here based on your application requirements.  // For example, you can return a message saying "Your account is inactive. Please contact support." instead of just 401.  // If you want to continue to return 401, you can remove this line.  // If you want to add more checks or actions, you can add them here.  // For example, you can check if the user has a verified phone number before allowing them to log in.  // You can also add a check to see if the user has a verified address before allowing them to log in.  // You can also add a check to see if the user has a verified social media account before allowing them to log in.  // You can also add a check to see if the
  }
  const isMatch = compare(password, user.password);
  if (!isMatch) {
    return next(new AppError(`invalid data`, 401));
  }
  const token = jwt.sign(
    { id: user.id, userName: user.name, role: user.role, status: user.status },
    `${process.env.loginToken}`
  );
  return res.status(200).json({ message: "success", token });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = verifyToken(token, `${process.env.registerToken}`);
  if (!decoded?.email) {
    return next(new AppError(`invalid token`, 401));
  }
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email },
    { confirmEmail: true },
    { new: true }
  );
  if (!user) {
    return next(new AppError(`User does not exist`, 404));
  }
  return res.status(200).json({ message: "Email confirmed successfully" });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let code = customAlphabet("123456789", 6);
  code = code();
  const user = await userModel.findOneAndUpdate(
    { email },
    { code },
    { new: true }
  );
  if (!user) {
    return next(new AppError(`User does not exist`, 404));
  }
  const html = `<p>code is ${code}</p>`;
  await sendEmail(email, "forget Password", html);
  return res.status(200).json({ message: "success", user });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  let { email, code, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError(`User does not exist`, 404));
  }
  if (user.code !== code) {
    return next(new AppError(`invalid code`, 401));
  }
  password = hash(password);
  user.password = password;
  user.code = null;
  await user.save();
  return res.status(200).json({ message: "Password reset successfully" });
});
