/** @format */
import express from "express";
import { getEvents, insertEvent, removeEvent, updateEvent } from "../../controllers/Calendar/Calendar";

const router = express.Router();

router.get("/getAll", getEvents);
router.post("/insert", insertEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", removeEvent);

export default router;
