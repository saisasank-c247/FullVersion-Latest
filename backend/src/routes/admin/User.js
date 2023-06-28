/** @format */

import express from "express";
import { UserController } from "../../controllers/admin";
import { verifyAdminToken } from "../../util";
const router = express.Router();

router.get("/list", verifyAdminToken, UserController.list);
router.patch("/update-status", verifyAdminToken, UserController.updateStatus);
router.delete("/delete/:id", verifyAdminToken, UserController.deleteUser);

export default router;
