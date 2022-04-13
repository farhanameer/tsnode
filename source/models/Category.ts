import { ICategory } from "@interfaces/v1/category";
import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
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
});

export default mongoose.model<ICategory>("Category", CategorySchema);
