import CategoryController from "@controllers/CategoryController";
import express from "express";

const router = express.Router();


const categoryController = new CategoryController();


router.post("/", categoryController.addNewCategory);


export = router;
