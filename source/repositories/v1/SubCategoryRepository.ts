import {
  CreateSubCategoryDTO,
  UpdateSubCategoryDTO,
  DeleteSubCategoryDTO,
} from "@dto/v1/web/SubCategoryDTO";
import { ISubCategory } from "@interfaces/v1/category";
import SubCategory from "@models/SubCategory";
import { ObjectId } from "mongoose";
import { ISubCategoryRepository } from "./interfaces/ISubCategory";
import * as _ from "lodash";

class SubCategoryRepository implements ISubCategoryRepository {
  constructor() {}

  create = async (payload: CreateSubCategoryDTO): Promise<ISubCategory> => {
    return new Promise((resolve, reject) => {
      SubCategory.create(payload)
        .then((newSubCategory) => resolve(newSubCategory))
        .catch((e) => reject(e));
    });
  };

  findByParentCategoryId = async (parentCategoryId: ObjectId): Promise<any> => {
    return new Promise((resolve, reject) => {
      SubCategory.find({
        parentCategoryId: parentCategoryId,
      })
        .then((subCategories) => {
          resolve(subCategories);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  findById = async (id: string): Promise<ISubCategory | null> => {
    return new Promise((resolve, reject) => {
      SubCategory.findOne({ _id: id })
        .then((subCategory) => resolve(subCategory))
        .catch((e) => reject(e));
    });
  };

  getAll = async (): Promise<ISubCategory[] | []> => {
    return new Promise((resolve, reject) => {
      SubCategory.find()
        .then((allSubCategories) => resolve(allSubCategories))
        .catch((e) => reject(e));
    });
  };

  update = async (payload: UpdateSubCategoryDTO): Promise<any> => {
    return new Promise((resolve, reject) => {
      SubCategory.updateOne(
        { _id: payload.subCategoryId },
        _.omit(payload, ["_id"])
      )
        .then((result) => resolve(result))
        .catch((e) => reject(e));
    });
  };

  delete = async (payload: DeleteSubCategoryDTO): Promise<any> => {
    return new Promise((resolve, reject) => {
      SubCategory.deleteOne({ _id: payload.subCategoryId })
        .then((result) => resolve(result))
        .catch((e) => reject(e));
    });
  };

  deleteByParentId = async (categoryId: ObjectId): Promise<Number> => {
    const subCategories = await this.findByParentCategoryId(categoryId);
    let deletedSubCategoriesCount = 0;

    for (let i = 0; i < subCategories.length; i++) {
      const result = await this.delete({ subCategoryId: subCategories[i]._id });
      if (result?.deletedCount == 1) {
        deletedSubCategoriesCount = deletedSubCategoriesCount + 1;
      }
    }

    return deletedSubCategoriesCount;
  };
}

export default SubCategoryRepository;
