import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      // type: String,
      // required: true,

      type: Schema.Types.Mixed,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
      required: false,
    },
    categories: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

const Post = model("Post", PostSchema);
export default Post;
