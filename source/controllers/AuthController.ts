import AppError from "@utils/AppError";
import AppResponse from "@utils/AppResponse";
import AuthValidator from "@validators/AuthValidator";
import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "@repositories/UsersRepository";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class AuthController {
  public userRepository: UsersRepository;
  
  constructor() {
    this.userRepository = new UsersRepository();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    this.userRepository.findByEmail("shehroz@gmail.com");
  }
}

export { AuthController };
