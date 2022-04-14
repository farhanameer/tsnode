import {
  UpdateCategoryDTO,
  CreateCategoryDTO,
  DeleteCategoryDTO,
} from "@dto/v1/web/CategoryDTO";
import CategoryRepository from "@repositories/v1/CategoryRepository";
import SubCategoryRepository from "@repositories/v1/SubCategoryRepository";
import AppError from "@utils/AppError";
import AppResponse from "@utils/AppResponse";
import CategoryValidator from "@validators/v1/web/CategoryValidator";

import { NextFunction, Request, Response } from "express";
import tryCatch from "middlewares/GlobalTryCatch";

class CategoryController {
  private readonly categoryRepository: CategoryRepository;
  private readonly subCategoryRepository: SubCategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subCategoryRepository = new SubCategoryRepository();
  }

  create = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = CategoryValidator.create(
      req.body as CreateCategoryDTO
    );

    if (validationResult.error) {
      let validatonError = validationResult.error.details[0].message;
      return next(new AppError(validatonError, 400));
    }
    const newCategory = await this.categoryRepository.create(
      req.body as CreateCategoryDTO
    );
    return AppResponse.success(
      res,
      { category: newCategory },
      "Parent category has been created",
      201
    );
  });

  get = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await this.categoryRepository.getAll();
    return AppResponse.success(res, categories, "Parent Categories", 201);
  });

  getSubCategories = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
      const { parentCategoryId } = req.params;

      const category = await this.categoryRepository.findById(parentCategoryId);
      if (!category)
        return next(new AppError("Invalid parentCategoryId provided", 400));

      const subCategories =
        await this.subCategoryRepository.findByParentCategoryId(category._id);
      return AppResponse.success(res, subCategories, "Sub Categories", 201);
    }
  );

  update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as UpdateCategoryDTO;
    const validationResult = CategoryValidator.update(payload);

    if (validationResult.error) {
      let validatonError = validationResult.error.details[0].message;
      return next(new AppError(validatonError, 400));
    }

    const category = await this.categoryRepository.findById(payload.categoryId);
    if (!category)
      return next(new AppError("Invalid categoryId provided", 400));

    const result = await this.categoryRepository.update(payload);
    if (result) {
      return AppResponse.success(
        res,
        { updatedDocumentCount: result?.nModified },
        result.nModified > 0
          ? "Category has been updated"
          : "Category document was not effected",
        201
      );
    }
  });

  delete = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as DeleteCategoryDTO;
    const validationResult = CategoryValidator.delete(payload);

    if (validationResult.error) {
      let validatonError = validationResult.error.details[0].message;
      return next(new AppError(validatonError, 400));
    }

    const category = await this.categoryRepository.findById(payload.categoryId);
    if (!category)
      return next(new AppError("Invalid categoryId provided", 400));

    const result = await this.categoryRepository.delete(payload);
    const deletedSubCategories =
      await this.subCategoryRepository.deleteByParentId(category._id);

    return AppResponse.success(
      res,
      {
        deletedCategory: result?.deletedCount,
        deletedSubCategories: deletedSubCategories,
      },
      "Category has been deleted",
      201
    );
  });
}

export default CategoryController;
