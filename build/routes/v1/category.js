"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CategoryController_1 = __importDefault(require("@controllers/v1/CategoryController"));
const SubCategoryController_1 = __importDefault(require("@controllers/v1/SubCategoryController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const categoryController = new CategoryController_1.default();
const subCategoryController = new SubCategoryController_1.default();
/* ----------- POST --------------*/
router.post("/", categoryController.create);
router.post("/subcategory", subCategoryController.create);
/* ----------- GET --------------*/
router.get("/", categoryController.get);
router.get("/:parentCategoryId/subcategories", categoryController.getSubCategories);
/* ----------- PUT --------------*/
router.put("/", categoryController.update);
router.put("/subcategory", subCategoryController.update);
/* ----------- DELETE ----------- */
router.delete("/", categoryController.delete);
router.delete("/subcategory", subCategoryController.delete);
module.exports = router;
