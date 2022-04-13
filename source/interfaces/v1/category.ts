import mongoose, { Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  categoryImage: string;
  isActive: Boolean;
  displayOrder: number;
}

interface ISubCategory extends Document {
  name: string;
  isActive: Boolean;
  displayOrder: number;
  products: [mongoose.Schema.Types.ObjectId];
  parentCategoryId: mongoose.Schema.Types.ObjectId;
}

export { ICategory, ISubCategory };
