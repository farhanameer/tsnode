
import ICategory from "@interfaces/category";
import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new Schema(
  {


    name :{ type: String}, 


  categoryImage : {type : String},
  isActive : { type: Boolean} ,
   displayOrder : { type : Number},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
