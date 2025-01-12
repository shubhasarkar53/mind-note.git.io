import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import User from "../../models/User";
import ErrorHandler from "../../utills/Error";
import { signUpInputSchema } from "../../validators/authValidator";

export const signUpController = catchAsyncErrors(async (req, res, next) => {
    //take input
    const { username, password } = req.body;
    //validate ZOD
    const validateUserInfo = signUpInputSchema.parse({ username, password });
    //if already exist
    const existingUser = await User.findOne({username});

    if (existingUser) {
      return next(new ErrorHandler("User already exist", 400));
    }
    //make an enty
    const newUser = new User({
      username:validateUserInfo.username,
      password:validateUserInfo.password
    });

    await newUser.save();
    //send res

    res.status(201).json({
      success: true,
      message: "User Signed Up Successfully",
      user: newUser,
    });
  })