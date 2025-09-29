import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const body = await req.json();
    const { postContent, postTitle } = body;
    const { postId } = params;

    const user = await auth(req);

    if (!postId) {
      return NextResponse.json({ error: "Need postId" }, { status: 402 });
    }

    if (!postContent || !postTitle) {
      return NextResponse.json(
        { error: "Need post content ot title." },
        { status: 402 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json(
        { error: "Post doesnot exist." },
        { status: 404 }
      );
    }

    if (post.postUser.toString() !== user._id.toString()) {
      return NextResponse.json({ error: "Not authorized." }, { status: 402 });
    }

    if (postTitle === post.postTitle && postContent === post.postContent) {
      return NextResponse.json(
        { message: "Nothing to update.", data: post },
        { status: 201 }
      );
    }

    if (postContent) {
      post.postContent = postContent;
    }

    if (postTitle) {
      post.postTitle = postTitle;
    }

    const updatedPost = await post.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Post Updated Successfully !!.", data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
