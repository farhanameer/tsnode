
import ICategory from "@interfaces/category";
import Category from "@models/Category";

import { ICategoryRepository } from "./interfaces/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {

  constructor(){

  }
  async create(payload: ICategory): Promise<ICategory> {
     const result =  await Category.create(payload);
     return result;
  }
}

export default CategoryRepository;
