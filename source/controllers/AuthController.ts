// import AppError from "@utils/AppError";
// import AppResponse from "@utils/AppResponse";
// import AuthValidator from "@validators/AuthValidator";
// import { NextFunction, Request, Response } from "express";

// import bcrypt from "bcrypt";

// import jwt from "jsonwebtoken";
// import UsersRepository from "../repositories/UsersRepository";

// class AuthController {
//   private readonly usersRepository: UsersRepository;

//   constructor() {
//     this.usersRepository = new UsersRepository();
//   }
//   register = async (req: Request, res: Response, next: NextFunction) => {
//     let response = await this.usersRepository.findByEmail(
//       "farhanameer45@gmail.com"
//     );

//     return AppResponse.success(res, {}, "success", 201);
//   };
// }

// export default AuthController;
