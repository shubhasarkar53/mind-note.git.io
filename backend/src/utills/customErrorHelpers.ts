import { NextFunction } from "express";
import mongoose from "mongoose";
import ErrorHandler from "./Error";

export function isCorrectIdFormat(id: string, next: NextFunction) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format", 400));
  }
}
