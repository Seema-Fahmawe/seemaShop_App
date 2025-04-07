import { Router } from "express";
import * as userController from "./user.controller.js";
import validation from "../../middleware/validation.js";
import * as validator from "./user.validation.js";
import auth from "../../middleware/auth.middleware.js";
const router = Router();
router.get("/", userController.getAllUsers);
router.delete(
  "/:id",
  validation(validator.deleteUserSchema),
  userController.deleteUser
);
router.put(
  "/:id",
  validation(validator.updateUserSchema),
  userController.updateUser
);
export default router;
