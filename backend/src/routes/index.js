/** @format */

import express from "express";
import AdminRoutes from "./admin";
import AuthRoutes from "./auth";
import EventRoutes from "./events";
import CreatePageRoutes from "./createPage"

const router = express.Router();

router.use("/admin", AdminRoutes);
router.use("/auth", AuthRoutes);
router.use("/events", EventRoutes);
router.use("/createpage",CreatePageRoutes)

export default router;
