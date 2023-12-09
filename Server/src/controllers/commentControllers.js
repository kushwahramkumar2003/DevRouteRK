import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const createComment = asyncHandler(async (req, res) => {
  const { desc, slug, parent, replyOnUser } = req.body;

  const post = await Post.findOne({ slug: slug });

  if (!post) {
    throw new CustomError("Post was not found", 404);
  }

  const newComment = new Comment({
    user: req.user._id,
    desc,
    post: post._id,
    parent,
    replyOnUser,
  });

  const savedComment = await newComment.save();

  res.status(201).json(savedComment);
});
