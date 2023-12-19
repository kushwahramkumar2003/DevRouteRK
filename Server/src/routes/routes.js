import express from "express";
import userRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import commentRoutes from "./comment.routes.js";
const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export default router;
