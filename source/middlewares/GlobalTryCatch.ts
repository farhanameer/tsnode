import { NextFunction, Response } from "express";
import ApplicationRequest from "@customtypes/ApplicationRequest";

const tryCatch =
  (fn: Function) =>
  (req: ApplicationRequest, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next).catch(next));

export default tryCatch;
