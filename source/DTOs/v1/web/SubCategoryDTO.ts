import { ITranslations } from "@interfaces/v1/category";

type UpdateSubCategoryDTO = {
  subCategoryId: string;
  categoryImage?: string;
  displayOrder?: number;
  isActive?: boolean;
  translations?: [ITranslations];
};

type CreateSubCategoryDTO = {
  parentCategoryId: string;
  displayOrder?: number;
  isActive?: boolean;
  translations: [ITranslations];
};

type DeleteSubCategoryDTO = {
  subCategoryId: string;
};

export { CreateSubCategoryDTO, UpdateSubCategoryDTO, DeleteSubCategoryDTO };
