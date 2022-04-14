import { ITranslations } from "@interfaces/v1/category";

type UpdateCategoryDTO = {
  categoryId: string;
  categoryImage?: string;
  displayOrder?: number;
  isActive?: boolean;
  translations: [ITranslations];
};

type CreateCategoryDTO = {
  categoryImage: string;
  displayOrder?: number;
  isActive?: boolean;
  translations: [ITranslations];
};

type DeleteCategoryDTO = {
  categoryId: string;
};

export { CreateCategoryDTO, UpdateCategoryDTO, DeleteCategoryDTO };
