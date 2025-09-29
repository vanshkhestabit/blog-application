import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { postContent, postTitle } = body;

    const user = await auth(req);

    if (
      !postContent ||
      postContent.trim() === "" ||
      !postTitle ||
      !postTitle.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Post content and PostTitle are required" },
        { status: 401 }
      );
    }

    const post = await Post.create({
      postUser: user._id,
      postContent,
      postTitle,
    });

    if (!post) {
      return res.status(400).json({ error: "Error while creating post" });
    }

    return NextResponse.json(
      { message: "Post created successfully !!.", data: post },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
