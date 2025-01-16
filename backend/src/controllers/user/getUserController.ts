import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import User from "../../models/User";
import ErrorHandler from "../../utills/Error";

export const getUserController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
    res.status(200).json({
        success:true,
        data:user
    })
  }
);
