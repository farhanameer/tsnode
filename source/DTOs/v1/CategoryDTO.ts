type UpdateCategoryDTO = {
  categoryId: string;
  name?: string;
  categoryImage?: string;
  displayOrder?: number;
  isActive?: boolean;
};

type CreateCategoryDTO = {
  name: string;
  categoryImage: string;
  displayOrder?: number;
  isActive?: boolean;
};

export { CreateCategoryDTO, UpdateCategoryDTO };
