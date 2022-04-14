import {
  UpdateSubCategoryDTO,
  CreateSubCategoryDTO,
  DeleteSubCategoryDTO,
} from "@dto/v1/web/SubCategoryDTO";
import { ISubCategory } from "@interfaces/v1/category";
import CategoryRepository from "@repositories/v1/CategoryRepository";
import SubCategoryRepository from "@repositories/v1/SubCategoryRepository";
import AppError from "@utils/AppError";
import AppResponse from "@utils/AppResponse";
import SubCategoryValidator from "@validators/v1/web/SubCategoryValidator";
import tryCatch from "middlewares/GlobalTryCatch";

import { NextFunction, Request, Response } from "express";

class SubCategoryController {
  private readonly subCategoryRepository: SubCategoryRepository;
  private readonly categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subCategoryRepository = new SubCategoryRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const validationResult = SubCategoryValidator.create(
      req.body as CreateSubCategoryDTO
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
      req.body as CreateSubCategoryDTO
    );
    return AppResponse.success(
      res,
      { category: newSubCategory },
      "Subcategory category has been created",
      201
    );
  };

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
    const payload = req.body as UpdateSubCategoryDTO;
    const validationResult = SubCategoryValidator.update(payload);

    if (validationResult.error) {
      let validatonError = validationResult.error.details[0].message;
      return next(new AppError(validatonError, 400));
    }

    const category = await this.subCategoryRepository.findById(
      payload.subCategoryId
    );
    if (!category)
      return next(new AppError("Invalid subCategoryId provided", 400));

    const result = await this.subCategoryRepository.update(payload);
    if (result) {
      return AppResponse.success(
        res,
        { updatedDocumentCount: result?.nModified },
        result.nModified > 0
          ? "SubCategory has been updated"
          : "SubCategory document was not effected",
        201
      );
    }
  });

  delete = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as DeleteSubCategoryDTO;
    const validationResult = SubCategoryValidator.delete(payload);

    if (validationResult.error) {
      let validatonError = validationResult.error.details[0].message;
      return next(new AppError(validatonError, 400));
    }

    const category = await this.subCategoryRepository.findById(
      payload.subCategoryId
    );
    if (!category)
      return next(new AppError("Invalid subCategoryId provided", 400));

    const result = await this.subCategoryRepository.delete(payload);
    if (result?.deletedCount == 1) {
      return AppResponse.success(
        res,
        { deletedDocumentCount: result?.deletedCount },
        "SubCategory has been deleted",
        201
      );
    }
  });
}

export default SubCategoryController;
