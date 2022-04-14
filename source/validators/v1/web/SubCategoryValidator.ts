import {
  CreateSubCategoryDTO,
  UpdateSubCategoryDTO,
  DeleteSubCategoryDTO,
} from "@dto/v1/web/SubCategoryDTO";
import { ISubCategory, ITranslations } from "@interfaces/v1/category";
import Joi from "joi";

class SubCategoryValidator {
  static create = (payload: CreateSubCategoryDTO) => {
    const schema = Joi.object<CreateSubCategoryDTO>({
      displayOrder: Joi.number().positive().min(1),
      isActive: Joi.boolean(),
      parentCategoryId: Joi.string().hex().length(24).required(),
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
    return schema.validate(payload);
  };

  static update(payload: UpdateSubCategoryDTO) {
    const schema = Joi.object<UpdateSubCategoryDTO>({
      subCategoryId: Joi.string().trim().hex().length(24).required(),
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

  static delete(payload: DeleteSubCategoryDTO) {
    const schema = Joi.object<DeleteSubCategoryDTO>({
      subCategoryId: Joi.string().trim().hex().length(24).required(),
    });
    return schema.validate(payload);
  }
}

export default SubCategoryValidator;
