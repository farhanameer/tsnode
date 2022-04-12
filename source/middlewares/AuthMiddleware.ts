// import User from "@models/User";
// import AppError from "@utils/AppError";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// class AuthMiddleware {
//   static async isLoggedIn(req: Request, res: Response, next: NextFunction) {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }
//     if (!token) {
//       return next(new AppError("unauthorized", 401));
//     }

//     const secret = process.env.JWT_SECRET || "simple";
//     const decodedToken = jwt.verify(token, secret) as { id: string };

//     const loggedInUser = await User.findById(decodedToken.id);
//     if (!loggedInUser) return next(new AppError("unathorized", 401));
//     res.locals.user = { id: loggedInUser._id, email: loggedInUser.email };

//     next();
//   }
// }

// export default AuthMiddleware;
