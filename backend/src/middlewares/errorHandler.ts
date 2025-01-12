import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utills/Error";
export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = err.message || "Internal server error";
  const statusCode = (err as ErrorHandler).statusCode;
  console.error(err.stack);
  res.status(statusCode).json({ success: false, message: message });
}
