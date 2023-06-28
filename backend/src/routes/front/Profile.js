/** @format */

import express from "express";
import { ProfileController } from "../../controllers/front";
import { validatePostBody, verifyToken } from "../../util";

const router = express.Router();

router.post("/change-password", verifyToken, ProfileController.changePassword);

export default router;
