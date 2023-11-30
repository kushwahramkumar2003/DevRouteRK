import express from "express";

import { authGuard } from "../middlewares/authMiddleware.js";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);

export default router;
