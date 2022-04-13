import { ISubCategory } from "@interfaces/v1/category";
import { ObjectId } from "mongoose";

export interface ISubCategoryRepository {
  create(payload: ISubCategory): Promise<ISubCategory>;
  findByParentCategoryId(parentCategoryId: ObjectId): Promise<any>;
}
