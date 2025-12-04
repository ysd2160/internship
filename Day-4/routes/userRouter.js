import { Router } from "express";
import { Login, logout, protectedRoute, Register } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authentication.js";

const router = Router()
router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(logout)
router.route("/protected").post(authMiddleware,protectedRoute)

export default router