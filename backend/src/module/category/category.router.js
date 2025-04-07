import { Router } from "express";
import * as categoryController from "./category.controller.js";
import auth from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/", auth(["admin"]), categoryController.createCategory);
export default router;
