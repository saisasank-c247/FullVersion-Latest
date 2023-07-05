/** @format */
import express from "express";
import { getDetails, getDetailsById, insertDetails, removeDetails, updateDetails } from "../../controllers/createPage/CreatePage";


const router = express.Router();


router.post("/insert",insertDetails);
router.get("/getAll",getDetails);
router.get("/getById/:id",getDetailsById);
router.put("/update/:id",updateDetails);
router.delete("/delete/:id",removeDetails)



export default router;
