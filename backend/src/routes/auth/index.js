/** @format */
import express from "express";
import AuthRouter from "./Auth";

const router = express.Router();

router.use("/", AuthRouter);

export default router;
