import { ISubCategory } from "@interfaces/v1/category";
import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  parentCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);
