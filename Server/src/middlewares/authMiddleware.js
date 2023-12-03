import config from "../config/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomError from "../utils/CustomError.js";

export const authGuard = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log("token : ", token);

      const { id } = jwt.verify(token, config.JWT_SECRET);
      // console.log("id : ", id);
      req.user = await User.findById(id).select("-password");
      // console.log("req.user : ", req.user);
      next();
    } catch (error) {
      throw new CustomError("Not authorized, Token failed", 401);
    }
  } else {
    throw new CustomError("Not authorized, no token", 401);
  }
});
