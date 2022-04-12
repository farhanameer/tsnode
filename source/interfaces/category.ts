import { Document } from "mongoose";

export default interface ICategory extends Document {
  name : string;
  categoryImage : string;
  isActive : Boolean;
  displayOrder : number;
}






