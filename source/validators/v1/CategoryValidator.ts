import { UpdateCategoryDTO } from "@dto/v1/CategoryDTO";
import { ICategory } from "@interfaces/v1/category";
import Joi from "joi";

class CategoryValidator {
  static create(data: ICategory) {
    const schema = Joi.object<ICategory>({
      name: Joi.string().min(1).required(),
      categoryImage: Joi.string().min(1).required(),
      displayOrder: Joi.number().positive().min(1).optional(),
      isActive: Joi.boolean().optional(),
    });
    return schema.validate(data);
  }

  static update(payload: UpdateCategoryDTO) {
    const schema = Joi.object<UpdateCategoryDTO>({
      categoryId: Joi.string().hex().length(24).required(),
      name: Joi.string().min(1).optional(),
      categoryImage: Joi.string().min(1).optional(),
      displayOrder: Joi.number().positive().min(1).optional(),
      isActive: Joi.boolean().optional(),
    });
    return schema.validate(payload);
  }
}

export default CategoryValidator;
