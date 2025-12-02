import { Router } from "express";
import { Register } from "./userController.js";
import { User } from "./userModel.js";
const router = Router()
router.route("/register").post(Register)

export default router