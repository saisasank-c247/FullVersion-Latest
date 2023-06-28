/** @format */
import express from "express";
import UserRouter from "./User";
import ProfileRouter from "./Profile";

const router = express.Router();

router.use("/", UserRouter);
router.use("/", ProfileRouter);

export default router;
