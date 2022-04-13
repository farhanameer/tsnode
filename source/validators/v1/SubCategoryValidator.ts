import { ISubCategory } from "@interfaces/v1/category";
import Joi from "joi";

class SubCategoryValidator {
  static create = (data: ISubCategory) => {
    const schema = Joi.object<ISubCategory>({
      name: Joi.string().min(1).required(),
      displayOrder: Joi.number().positive().min(1),
      isActive: Joi.boolean(),
      parentCategoryId: Joi.string().hex().length(24).required(),
    });
    return schema.validate(data);
  };
}

export default SubCategoryValidator;
