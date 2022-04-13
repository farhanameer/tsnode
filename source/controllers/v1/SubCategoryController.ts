import { ISubCategory } from "@interfaces/v1/category";
import CategoryRepository from "@repositories/v1/CategoryRepository";
import SubCategoryRepository from "@repositories/v1/SubCategoryRepository";
import AppError from "@utils/AppError";
import AppResponse from "@utils/AppResponse";
import SubCategoryValidator from "@validators/v1/SubCategoryValidator";

import { NextFunction, Request, Response } from "express";

class SubCategoryController {
  private readonly subCategoryRepository: SubCategoryRepository;
  private readonly categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subCategoryRepository = new SubCategoryRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = SubCategoryValidator.create(
        req.body as ISubCategory
      );

      if (validationResult.error) {
        let validatonError = validationResult.error.details[0].message;
        return next(new AppError(validatonError, 400));
      }

      let parentCategory = await this.categoryRepository.findById(
        req.body.parentCategoryId
      );
      if (!parentCategory)
        return next(new AppError("Invalid ParentId provided", 400));

      const newSubCategory = await this.subCategoryRepository.create(
        req.body as ISubCategory
      );
      return AppResponse.success(
        res,
        { category: newSubCategory },
        "Subcategory category has been created",
        201
      );
    } catch (error) {
      return next(new AppError(JSON.stringify(error), 400));
    }
  };
}

export default SubCategoryController;
