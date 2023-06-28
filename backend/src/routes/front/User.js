/** @format */

import express from "express";
import { UserController } from "../../controllers/front";
const router = express.Router();

router.post("/login", UserController.login);
router.post("/signup", UserController.signup);
router.post("/forgot-password", UserController.requestForgotPassword);
router.post("/reset-password", UserController.resetPassword);
router.get("/verify-password-reset-token", UserController.verifyResetPasswordToken);

export default router;
