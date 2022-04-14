import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  categoryImage: string;
  isActive: Boolean;
  displayOrder: number;
  translations: ITranslations[];
}

interface ISubCategory extends Document {
  isActive: Boolean;
  displayOrder: number;
  products: [mongoose.Schema.Types.ObjectId];
  parentCategoryId: mongoose.Schema.Types.ObjectId;
  translations: ITranslations[];
}

interface ITranslations {
  lang: String;
  translation: String;
}

export { ICategory, ISubCategory, ITranslations };
