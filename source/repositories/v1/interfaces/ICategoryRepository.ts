import { ICategory } from "@interfaces/v1/category";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  DeleteCategoryDTO,
} from "@dto/v1/web/CategoryDTO";

export interface ICategoryRepository {
  findById(id: string): Promise<ICategory | null>;
  create(payload: CreateCategoryDTO): Promise<ICategory>;
  getAll(): Promise<ICategory[] | []>;
  update(payload: UpdateCategoryDTO): Promise<any>;
  delete(payload: DeleteCategoryDTO): Promise<any>;
}
