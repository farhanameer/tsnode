import CategoryController from "@controllers/v1/CategoryController";
import SubCategoryController from "@controllers/v1/SubCategoryController";
import express from "express";

const router = express.Router();

const categoryController = new CategoryController();
const subCategoryController = new SubCategoryController();

/* ----------- POST --------------*/
// Add a new Category
router.post("/", categoryController.create);

// Add a New Sub Category
router.post("/subcategory", subCategoryController.create);

/* ----------- GET --------------*/
// Get All Categories
router.get("/", categoryController.get);

// Get All SubCategories of A Particular Category
router.get(
  "/:parentCategoryId/subcategories",
  categoryController.getSubCategories
);

/* ----------- PUT --------------*/
// Update a particular Category
router.put("/", categoryController.update);

// Update a particular subcategory
// router.put(
//   "/:parentCategoryId/subcategories",
//   categoryController.getSubCategories
// );

export = router;
