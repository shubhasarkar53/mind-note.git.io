import mongoose , {Document} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  password: string;
  isPremium?: boolean;
  getAccessToken: () => string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (!this.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods.getAccessToken = function () {
  const id = this._id;

  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: "10h",
  });

  return token;
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
