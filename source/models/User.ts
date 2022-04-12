import { Schema, Document, connection } from "mongoose";

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const UsersModel = connection.model(
  "User",
  UserSchema,
  "user-collection"
);
