import { UpdateCategoryDTO } from "@dto/v1/CategoryDTO";
import { ICategory, ISubCategory } from "@interfaces/v1/category";
import Category from "@models/Category";
import { ObjectId } from "mongoose";
import * as _ from "lodash";

import { ICategoryRepository } from "./interfaces/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  constructor() {}

  create = async (payload: ICategory): Promise<ICategory> => {
    const result = await Category.create(payload);
    return result;
  };

  findById = async (id: string): Promise<ICategory | null> => {
    const category = await Category.findOne({ _id: id });
    return category;
  };

  getAll = async (): Promise<ICategory[] | []> => {
    const categories = await Category.find();
    return categories;
  };

  update = async (payload: UpdateCategoryDTO): Promise<any> => {
    return new Promise((resolve, reject) => {
      Category.updateOne({ _id: payload.categoryId }, _.omit(payload, ["_id"]))
        .then((result) => resolve(result))
        .catch((e) => reject(e));
    });
  };
}

export default CategoryRepository;
