import { IUser } from "@interfaces/v1/user";
import { Request } from "express";

interface ApplicationRequest extends Request {
  loggedInUser: IUser;
}

export default ApplicationRequest;
