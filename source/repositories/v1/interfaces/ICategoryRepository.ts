import { ICategory } from "@interfaces/v1/category";
import { ObjectId } from "mongoose";
import { UpdateCategoryDTO } from "@dto/v1/CategoryDTO";

export interface ICategoryRepository {
  findById(id: string): Promise<ICategory | null>;
  create(payload: ICategory): Promise<ICategory>;
  getAll(): Promise<ICategory[] | []>;
  update(payload: UpdateCategoryDTO): Promise<any>;
}
