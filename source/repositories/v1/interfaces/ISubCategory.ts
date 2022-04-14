import {
  CreateSubCategoryDTO,
  DeleteSubCategoryDTO,
  UpdateSubCategoryDTO,
} from "@dto/v1/web/SubCategoryDTO";
import { ISubCategory } from "@interfaces/v1/category";
import { ObjectId } from "mongoose";

export interface ISubCategoryRepository {
  create(payload: CreateSubCategoryDTO): Promise<ISubCategory>;
  findById(id: string): Promise<ISubCategory | null>;
  findByParentCategoryId(parentCategoryId: ObjectId): Promise<any>;
  getAll(): Promise<ISubCategory[] | []>;
  update(payload: UpdateSubCategoryDTO): Promise<any>;
  delete(payload: DeleteSubCategoryDTO): Promise<any>;
}
