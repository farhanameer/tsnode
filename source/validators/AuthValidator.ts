import Joi, { ObjectSchema } from "joi";
import { IUser } from "@interfaces/user";
import AppError from "@utils/AppError";

class AuthValidator {
  static register(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().email().required().messages({
        "string.base": "email should be a string",
        "any.required": "email is required",
        "email.base": "email should be a valid one",
      }),
      password: Joi.string().required().messages({
        "string.base": "password should be a string",
        "any.required": "password is required",
      }),
    });
    return schema.validate(data);
  }
  static login(data: IUser) {
    const schema = Joi.object<IUser>({
      email: Joi.string().email().required().messages({
        "string.base": "email should be a string",
        "any.required": "email is required",
        "email.base": "email should be a valid one",
      }),
      password: Joi.string().required().messages({
        "string.base": "password should be a string",
        "any.required": "password is required",
      }),
    });
    return schema.validate(data);
  }
}

export default AuthValidator;
