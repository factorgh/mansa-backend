import User from "../models/user.model.js";

import jwt from "jsonwebtoken";
import { promisify } from "util";
import sendEmail from "../utils/email.js";
import crypto from "crypto";

const signJwt = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};
const signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signJwt(newUser._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send("Please provide a valid email or password");

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.correctPass(password, user.password))) {
      return res.status(404).send("Invalid username or password");
    }
    const token = signJwt(user._id);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    user.password = undefined;
    res.status(200).json({
      status: "success",
      user,
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("fail to login.Please try again");
  }
};

const protectedRoute = async (req, res, next) => {
  ///Check if token exist and is there
  let token;
  if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }
  //Check if token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded)
    return next(new AppError("Invalid token.Please login again", 400));

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(400).send("Invalid user");
  }
  ///If user exist grant acccess
  req.user = currentUser;
  next();
};

const restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have permission to perform this task"),
        403
      );
    }
    next();
  };
};

///Pasword updates
const forgotPassword = async (req, res, next) => {
  ///1)Get user and check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("User doesnt exist "));

  ///2)Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  console.log(user.email);

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/${resetToken}`;
  const message = `Please send a PATCH request to the link ${resetUrl} with your new password.Please if you did not forget password ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Please update your password(it expires in 10mins)",
      message,
    });
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Please check your email for token",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("Email sending failed .Please try again later", 500)
    );
  }
};

const resetPassword = async (req, res, next) => {
  //1)Get user based on reset token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //2)Check if reset token has expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Invalid token", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  //4)Login user and send a new token
  const token = signJwt(user._id);
  res.cookie;
  res.status(201).json({
    status: "success",
    token,
  });
};

const updatePassword = async (req, res, next) => {
  ///Get logged In user
  const user = await User.findById(req.user.id).select("+password");

  if (!user)
    return next(
      new AppError(
        "User doesnt exist please .Pleasae login to have access",
        400
      )
    );

  ///Check if user password is correct
  if (!(await user.correctPass(req.body.currentPassword, user.password))) {
    return next(new AppError("Invalid password .Please login again ", 401));
  }

  //Update user details and save user details
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  ///Finally logged In
  const token = signJwt(user._id);
  res.status(201).json({
    status: "success",
    token,
  });
};

export const logout = (req, res) => {
  res.cookie("jwt", "loggedOut", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(200).json({ status: "success" });
};
export default {
  signup,
  login,
  protectedRoute,
  restrictedTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
};
