import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

const logoutController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("SessionID", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out !!",
    });
  }
);

export default logoutController;
