import express from "express";

import { authGuard } from "../middlewares/authMiddleware.js";
import { createComment } from "../controllers/commentControllers.js";
const router = express.Router();

router.post("/", authGuard, createComment);

export default router;
