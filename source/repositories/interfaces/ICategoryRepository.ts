import ICategory from "@interfaces/category";


export interface ICategoryRepository {
  create(payload : ICategory): Promise<ICategory>;
}
