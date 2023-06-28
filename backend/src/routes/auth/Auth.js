/** @format */

import express from "express";
import { AuthController } from "../../controllers/auth";
import { verifyToken } from "../../util";
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/forgot-password", AuthController.requestForgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/verify-password-reset-token", AuthController.verifyResetPasswordToken);
router.post("/change-password", verifyToken, AuthController.changePassword);
router.post("/me",verifyToken, AuthController.getProfileDetails);

export default router;
