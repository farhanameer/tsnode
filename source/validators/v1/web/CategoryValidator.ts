import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  DeleteCategoryDTO,
} from "@dto/v1/web/CategoryDTO";
import { ITranslations } from "@interfaces/v1/category";
import Joi from "joi";

class CategoryValidator {
  static create(data: CreateCategoryDTO) {
    const schema = Joi.object<CreateCategoryDTO>({
      categoryImage: Joi.string().trim().uri().required(),
      displayOrder: Joi.number().positive().min(1).optional(),
      isActive: Joi.boolean().optional(),
      translations: Joi.array()
        .items(
          Joi.object<ITranslations>({
            lang: Joi.string().trim().min(1).required(),
            translation: Joi.string().trim().min(1).required(),
          })
        )
        .min(1)
        .required(),
    });
    return schema.validate(data);
  }

  static update(payload: UpdateCategoryDTO) {
    const schema = Joi.object<UpdateCategoryDTO>({
      categoryId: Joi.string().trim().hex().length(24).required(),
      categoryImage: Joi.string().trim().uri().optional(),
      displayOrder: Joi.number().positive().min(1).optional(),
      isActive: Joi.boolean().optional(),
      translations: Joi.array()
        .items(
          Joi.object<ITranslations>({
            lang: Joi.string().trim().min(1).required(),
            translation: Joi.string().trim().min(1).required(),
          })
        )
        .optional(),
    });
    return schema.validate(payload);
  }

  static delete(payload: DeleteCategoryDTO) {
    const schema = Joi.object<DeleteCategoryDTO>({
      categoryId: Joi.string().trim().hex().length(24).required(),
    });
    return schema.validate(payload);
  }
}

export default CategoryValidator;
