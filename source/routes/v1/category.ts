import CategoryController from "@controllers/v1/CategoryController";
import SubCategoryController from "@controllers/v1/SubCategoryController";
import express, { NextFunction } from "express";
import tryCatch from "middlewares/GlobalTryCatch";

const router = express.Router();

const categoryController = new CategoryController();
const subCategoryController = new SubCategoryController();

/* ----------- POST --------------*/
router.post("/", categoryController.create as any);
router.post("/subcategory", subCategoryController.create as any);

/* ----------- GET --------------*/
router.get("/", categoryController.get as any);
router.get(
  "/:parentCategoryId/subcategories",
  categoryController.getSubCategories as any
);

/* ----------- PUT --------------*/
router.put("/", categoryController.update as any);
router.put("/subcategory", subCategoryController.update as any);

/* ----------- DELETE ----------- */
router.delete("/", categoryController.delete as any);
router.delete("/subcategory", subCategoryController.delete as any);

export = router;
