import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utills/Error";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: { [key: string]: any };
  path?: string;
}

export const  globalErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MongoDB CastError
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid Path: ${err.path}`;
    err = new ErrorHandler( message,400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue || {}).join(", ")} entered`;
    err = new ErrorHandler( message,400);
  }

  // Invalid JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid web token. Please try again.";
    err = new ErrorHandler( message,400);
  }

  // Expired JWT Token
  if (err.name === "TokenExpiredError") {
    const message = "Web token has expired. Please try again with a valid token.";
    err = new ErrorHandler( message,400);
  }

  res.status(err.statusCode ?? 500).json({
    success: false,
    message: err.message,
  });
};

