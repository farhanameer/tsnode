import * as mongoose from "mongoose";

interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  isDeleted: boolean;
}

export { IUser };
