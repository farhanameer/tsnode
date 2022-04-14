import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  UpdateCategoryDTO,
} from "@dto/v1/web/CategoryDTO";
import { ICategory } from "@interfaces/v1/category";
import Category from "@models/Category";
import * as _ from "lodash";

import { ICategoryRepository } from "./interfaces/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  constructor() {}

  create = async (payload: CreateCategoryDTO): Promise<ICategory> => {
    return new Promise((resolve, reject) => {
      Category.create(payload)
        .then((newCategory) => resolve(newCategory))
        .catch((e) => reject(e));
    });
  };

  findById = async (id: string): Promise<ICategory | null> => {
    return new Promise((resolve, reject) => {
      Category.findOne({ _id: id })
        .then((category) => resolve(category))
        .catch((e) => reject(e));
    });
  };

  getAll = async (): Promise<ICategory[] | []> => {
    return new Promise((resolve, reject) => {
      Category.find()
        .then((allCategories) => resolve(allCategories))
        .catch((e) => reject(e));
    });
  };

  update = async (payload: UpdateCategoryDTO): Promise<any> => {
    return new Promise((resolve, reject) => {
      Category.updateOne({ _id: payload.categoryId }, _.omit(payload, ["_id"]))
        .then((result) => resolve(result))
        .catch((e) => reject(e));
    });
  };

  delete = async (payload: DeleteCategoryDTO): Promise<any> => {
    return new Promise((resolve, reject) => {
      Category.deleteOne({ _id: payload.categoryId })
        .then((result) => resolve(result))
        .catch((e) => reject(e));
    });
  };
}

export default CategoryRepository;
