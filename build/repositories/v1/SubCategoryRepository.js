"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const SubCategory_1 = __importDefault(require("@models/SubCategory"));
const _ = __importStar(require("lodash"));
class SubCategoryRepository {
    constructor() {
        this.create = (payload) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.create(payload)
                    .then((newSubCategory) => resolve(newSubCategory))
                    .catch((e) => reject(e));
            });
        });
        this.findByParentCategoryId = (parentCategoryId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.find({
                    parentCategoryId: parentCategoryId,
                })
                    .then((subCategories) => {
                    resolve(subCategories);
                })
                    .catch((e) => {
                    reject(e);
                });
            });
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.findOne({ _id: id })
                    .then((subCategory) => resolve(subCategory))
                    .catch((e) => reject(e));
            });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.find()
                    .then((allSubCategories) => resolve(allSubCategories))
                    .catch((e) => reject(e));
            });
        });
        this.update = (payload) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.updateOne({ _id: payload.subCategoryId }, _.omit(payload, ["_id"]))
                    .then((result) => resolve(result))
                    .catch((e) => reject(e));
            });
        });
        this.delete = (payload) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                SubCategory_1.default.deleteOne({ _id: payload.subCategoryId })
                    .then((result) => resolve(result))
                    .catch((e) => reject(e));
            });
        });
        this.deleteByParentId = (categoryId) => __awaiter(this, void 0, void 0, function* () {
            const subCategories = yield this.findByParentCategoryId(categoryId);
            let deletedSubCategoriesCount = 0;
            for (let i = 0; i < subCategories.length; i++) {
                const result = yield this.delete({ subCategoryId: subCategories[i]._id });
                if ((result === null || result === void 0 ? void 0 : result.deletedCount) == 1) {
                    deletedSubCategoriesCount = deletedSubCategoriesCount + 1;
                }
            }
            return deletedSubCategoriesCount;
        });
    }
}
exports.default = SubCategoryRepository;
