import { Document } from "mongoose";

export default interface ITask extends Document {
  name: string;
  userId: string;
}
