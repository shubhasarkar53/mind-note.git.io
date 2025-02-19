import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import User from "../../models/User";
import ErrorHandler from "../../utills/Error";
import { setCookie } from "../../utills/setCookie";

export const signUpController = catchAsyncErrors(async (req, res, next) => {
  console.log("here");
  //take input
  console.log(req.body);
  const { username, password, fullname } = req.body;

  //if already exist
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return next(new ErrorHandler("User already exist", 400));
  }
  //make an enty
  console.log("make a enrty");
  const newUser = new User({
    fullname: fullname,
    username: username,
    password: password,
  });

  await newUser.save();

  // genrate access token
  const token = newUser.getAccessToken();
  if (!token) {
    return next(new ErrorHandler("Invalid token", 401));
  }

  //set to cookie
  setCookie(res, token);
  //send res
  console.log("new user sregisterd");
  res.status(201).json({
    success: true,
    message: "User Signed Up Successfully",
    user: newUser,
  });
});
