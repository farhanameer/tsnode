"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryRepository_1 = __importDefault(require("@repositories/v1/CategoryRepository"));
const SubCategoryRepository_1 = __importDefault(require("@repositories/v1/SubCategoryRepository"));
const AppError_1 = __importDefault(require("@utils/AppError"));
const AppResponse_1 = __importDefault(require("@utils/AppResponse"));
const SubCategoryValidator_1 = __importDefault(require("@validators/v1/web/SubCategoryValidator"));
const GlobalTryCatch_1 = __importDefault(require("middlewares/GlobalTryCatch"));
class SubCategoryController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validationResult = SubCategoryValidator_1.default.create(req.body);
            if (validationResult.error) {
                let validatonError = validationResult.error.details[0].message;
                return next(new AppError_1.default(validatonError, 400));
            }
            let parentCategory = yield this.categoryRepository.findById(req.body.parentCategoryId);
            if (!parentCategory)
                return next(new AppError_1.default("Invalid ParentId provided", 400));
            const newSubCategory = yield this.subCategoryRepository.create(req.body);
            return AppResponse_1.default.success(res, { category: newSubCategory }, "Subcategory category has been created", 201);
        });
        this.getSubCategories = (0, GlobalTryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { parentCategoryId } = req.params;
            const category = yield this.categoryRepository.findById(parentCategoryId);
            if (!category)
                return next(new AppError_1.default("Invalid parentCategoryId provided", 400));
            const subCategories = yield this.subCategoryRepository.findByParentCategoryId(category._id);
            return AppResponse_1.default.success(res, subCategories, "Sub Categories", 201);
        }));
        this.update = (0, GlobalTryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const validationResult = SubCategoryValidator_1.default.update(payload);
            if (validationResult.error) {
                let validatonError = validationResult.error.details[0].message;
                return next(new AppError_1.default(validatonError, 400));
            }
            const category = yield this.subCategoryRepository.findById(payload.subCategoryId);
            if (!category)
                return next(new AppError_1.default("Invalid subCategoryId provided", 400));
            const result = yield this.subCategoryRepository.update(payload);
            if (result) {
                return AppResponse_1.default.success(res, { updatedDocumentCount: result === null || result === void 0 ? void 0 : result.nModified }, result.nModified > 0
                    ? "SubCategory has been updated"
                    : "SubCategory document was not effected", 201);
            }
        }));
        this.delete = (0, GlobalTryCatch_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const validationResult = SubCategoryValidator_1.default.delete(payload);
            if (validationResult.error) {
                let validatonError = validationResult.error.details[0].message;
                return next(new AppError_1.default(validatonError, 400));
            }
            const category = yield this.subCategoryRepository.findById(payload.subCategoryId);
            if (!category)
                return next(new AppError_1.default("Invalid subCategoryId provided", 400));
            const result = yield this.subCategoryRepository.delete(payload);
            if ((result === null || result === void 0 ? void 0 : result.deletedCount) == 1) {
                return AppResponse_1.default.success(res, { deletedDocumentCount: result === null || result === void 0 ? void 0 : result.deletedCount }, "SubCategory has been deleted", 201);
            }
        }));
        this.categoryRepository = new CategoryRepository_1.default();
        this.subCategoryRepository = new SubCategoryRepository_1.default();
    }
}
exports.default = SubCategoryController;
