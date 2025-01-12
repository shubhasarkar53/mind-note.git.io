import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utills/Error";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { catchAsyncErrors } from "./catchAsyncErrors";

export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { SessionID } = req.cookies;

    if (!SessionID) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    const decoded = jwt.verify(SessionID, process.env.JWT_SECRET as string);
    if (!decoded) {
      return next(new ErrorHandler("Invalid token payload", 400));
    }

    // @ts-ignore
    const user = User.findById(decoded.userId);
    // @ts-ignore
    req.user = user;

    next();
  }
);
