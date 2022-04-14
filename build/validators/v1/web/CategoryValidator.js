"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class CategoryValidator {
    static create(data) {
        const schema = joi_1.default.object({
            categoryImage: joi_1.default.string().trim().uri().required(),
            displayOrder: joi_1.default.number().positive().min(1).optional(),
            isActive: joi_1.default.boolean().optional(),
            translations: joi_1.default.array()
                .items(joi_1.default.object({
                lang: joi_1.default.string().trim().min(1).required(),
                translation: joi_1.default.string().trim().min(1).required(),
            }))
                .min(1)
                .required(),
        });
        return schema.validate(data);
    }
    static update(payload) {
        const schema = joi_1.default.object({
            categoryId: joi_1.default.string().trim().hex().length(24).required(),
            categoryImage: joi_1.default.string().trim().uri().optional(),
            displayOrder: joi_1.default.number().positive().min(1).optional(),
            isActive: joi_1.default.boolean().optional(),
            translations: joi_1.default.array()
                .items(joi_1.default.object({
                lang: joi_1.default.string().trim().min(1).required(),
                translation: joi_1.default.string().trim().min(1).required(),
            }))
                .optional(),
        });
        return schema.validate(payload);
    }
    static delete(payload) {
        const schema = joi_1.default.object({
            categoryId: joi_1.default.string().trim().hex().length(24).required(),
        });
        return schema.validate(payload);
    }
}
exports.default = CategoryValidator;
