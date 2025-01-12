import bcrypt from "bcrypt";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import User from "../../models/User";
import ErrorHandler from "../../utills/Error";
import { setCookie } from "../../utills/setCookie";

export const loginController = catchAsyncErrors(async (req, res, next) => {
  //take input
  const { username, password } = req.body;
  
  //if already exist
  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    return next(new ErrorHandler("User not exist", 401));
  }

  //   compare password
  const isPassMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPassMatch) {
    return next(new ErrorHandler("Incorrect Username or password", 401));
  }

  // genrate access token
  const token = existingUser.getAccessToken();
  if (!token) {
    return next(new ErrorHandler("Invalid token", 401));
  }

  //set to cookie
  setCookie(res, token);

  // send resp
  res.status(200).json({
    success: true,
    message: "User logged in  Successfully",
    user: existingUser,
  });
});
