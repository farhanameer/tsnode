import { ICategory } from "@interfaces/v1/category";
import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  categoryImage: {
    type: String,
    required: true,
    default: "",
  },
  displayOrder: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  translations: [
    {
      lang: String,
      translation: String,
    },
  ],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
