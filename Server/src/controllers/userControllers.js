import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import CustomError from "../utils/CustomError.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  //   console.log("req.body : ", req.body);
  const { name, email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });

  if (user) {
    // return res.status(400).json({
    //   success: false,
    //   message: "User already exists",
    // });

    throw new CustomError("User already exists");
  }

  //creating a new user

  user = await User.create({
    name,
    email,
    password,
  });

  console.log("User : ", user);

  //   user.password = undefined;
  const token = await user.generateJWT();

  console.log("Token : ", token);
  res.status(201).json({
    success: true,
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User does not exists", 403);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new CustomError("Invalid Credentials", 403);
  }
  user.password = undefined;
  const token = await user.generateJWT();

  console.log("Token : ", token);
  res.status(201).json({
    message: "Login Successful",
    success: true,
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
    token,
  });
});

export const userProfile = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  user.password = undefined;
  res.status(201).json({
    success: true,
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const token = await updatedUser.generateJWT();

    res.status(200).json({
      success: true,
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      verified: updatedUser.verified,
      admin: updatedUser.admin,
      token,
    });
  } else {
    throw new CustomError("User not found", 404);
  }
});
