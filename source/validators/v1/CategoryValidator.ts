import ICategory from "@interfaces/category";
import Joi, { ObjectSchema } from "joi";



class CategoryValidator {
  static create(data: ICategory) {
    const schema = Joi.object<ICategory>({
      name : Joi.string().required().messages({
          'any.required' : 'category name is required'
      }) ,
      categoryImage : Joi.string().required().messages({
        "any.required" : 'category image is required'
      }) ,
      isActive : Joi.boolean().required().messages({
          'any.required' : 'is active is a required field'
      })
    });
    return schema.validate(data);
  }
  
}

export default CategoryValidator;
