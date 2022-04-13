import { ISubCategory } from "@interfaces/v1/category";
import SubCategory from "@models/SubCategory";
import { ObjectId } from "mongoose";
import { ISubCategoryRepository } from "./interfaces/ISubCategory";

class SubCategoryRepository implements ISubCategoryRepository {
  constructor() {}

  create = async (payload: ISubCategory): Promise<ISubCategory> => {
    const result = await SubCategory.create(payload);
    return result;
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
}

export default SubCategoryRepository;
