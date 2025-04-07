import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as validator from "./auth.validation.js";
import validation from "../../middleware/validation.js";

const router = Router();
router.post(
  "/register",
  validation(validator.registerSchema),
  authController.register
);
router.post("/login", validation(validator.loginSchema), authController.login);
router.get(
  "/:token",
  validation(validator.confirmEmailSchema),
  authController.confirmEmail
);
router.post(
  "/forgetPassword",
  validation(validator.forgetPasswordSchema),
  authController.forgetPassword
);
router.patch(
  "/resetPassword",
  validation(validator.resetPasswordSchema),
  authController.resetPassword
);
export default router;
