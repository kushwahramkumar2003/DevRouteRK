import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";
import CustomError from "../utils/CustomError.js";
import uploadImageToCloudinary from "../utils/imageUploder.js";
import config from "../config/index.js";

export const createPost = asyncHandler(async (req, res) => {
  console.log("req : ", req);
  const post = new Post({
    title: "sample title",
    caption: "sample caption",
    slug: uuidv4(),
    body: {
      type: "doc",
      content: [],
    },
    photo: "",
    user: req.user._id,
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

export const updatePost = asyncHandler(async (req, res) => {
  console.log("req.body : ", req.body);
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    res.status(404);
    throw new CustomError("Post not found", 404);
  }

  if (req.files && req.files.postPicture) {
    const img = req.files.postPicture;

    if (!img) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    let uploadDetails = await uploadImageToCloudinary(img, config.FOLDER_NAME);
    console.log("upload details : " + uploadDetails);

    post.photo = uploadDetails.secure_url;

    const { title, caption, body, tags, categories } = JSON.parse(
      req.body.document
    );

    console.log("title : ", title);

    post.title = title || post.title;
    post.caption = caption || post.caption;
    post.body = body || post.body;
    post.tags = tags || post.tags;
    post.categories = categories || post.categories;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } else {
    console.log("no image");
    post.photo = "";
    const { title, caption, body, tags, categories } = JSON.parse(
      req.body.document
    );

    post.title = title || post.title;
    post.caption = caption || post.caption;
    post.body = body || post.body;
    post.tags = tags || post.tags;
    post.categories = categories || post.categories;

    const updatedPost = await post.save();

    console.log("updatedPost : ", updatedPost);

    res.json(updatedPost);
  }
});
