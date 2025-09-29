import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
      required: true,
      minLen: ["10", "Post cannot be less than 10 characters"],
      maxLen: ["200", "Post Content cannot be more than 200 characters"],
    },
    postTitle: {
      type: String,
      required: true,
      minLen: ["5", "Post Title cannot be less than 5 characters"],
      maxLen: ["50", "Post Title cannot be more than 50 characters"],
    },
    postUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
