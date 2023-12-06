import express from "express";

import { authGuard, adminGuard } from "../middlewares/authMiddleware.js";
import {
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
const router = express.Router();

router.post("/", authGuard, adminGuard, createPost);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);

export default router;
