import { ISubCategory } from "@interfaces/v1/category";
import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema({
  parentCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
  },

  translations: [
    {
      translation: String,
      lang: String,
    },
  ],
});

export default mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);
