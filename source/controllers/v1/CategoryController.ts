import { UpdateCategoryDTO } from "@dto/v1/CategoryDTO";
import { ICategory } from "@interfaces/v1/category";
import CategoryRepository from "@repositories/v1/CategoryRepository";
import SubCategoryRepository from "@repositories/v1/SubCategoryRepository";
import AppError from "@utils/AppError";
import AppResponse from "@utils/AppResponse";
import CategoryValidator from "@validators/v1/CategoryValidator";

import { NextFunction, Request, Response } from "express";

class CategoryController {
  private readonly categoryRepository: CategoryRepository;
  private readonly subCategoryRepository: SubCategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subCategoryRepository = new SubCategoryRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = CategoryValidator.create(req.body as ICategory);

      if (validationResult.error) {
        let validatonError = validationResult.error.details[0].message;
        return next(new AppError(validatonError, 400));
      }

      const newCategory = await this.categoryRepository.create(
        req.body as ICategory
      );
      return AppResponse.success(
        res,
        { category: newCategory },
        "Parent category has been created",
        201
      );
    } catch (error) {
      return next(new AppError(JSON.stringify(error), 400));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryRepository.getAll();
      return AppResponse.success(res, categories, "Parent Categories", 201);
    } catch (error) {
      return next(new AppError(JSON.stringify(error), 400));
    }
  };

  getSubCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { parentCategoryId } = req.params;

      const category = await this.categoryRepository.findById(parentCategoryId);
      if (!category)
        return next(new AppError("Invalid parentCategoryId provided", 400));

      const subCategories =
        await this.subCategoryRepository.findByParentCategoryId(category._id);
      return AppResponse.success(res, subCategories, "Sub Categories", 201);
    } catch (error) {
      return next(new AppError(JSON.stringify(error), 400));
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body.payload as UpdateCategoryDTO;
      const validationResult = CategoryValidator.update(payload);

      if (validationResult.error) {
        let validatonError = validationResult.error.details[0].message;
        return next(new AppError(validatonError, 400));
      }

      const category = await this.categoryRepository.findById(
        payload.categoryId
      );
      if (!category)
        return next(new AppError("Invalid categoryId provided", 400));

      const result = await this.categoryRepository.update(payload);
      if (result?.ok) {
        return AppResponse.success(
          res,
          { modifiedDocument: result?.nModified },
          "Category has been updated",
          201
        );
      }
    } catch (error) {
      return next(new AppError(JSON.stringify(error), 400));
    }
  };
}

export default CategoryController;
