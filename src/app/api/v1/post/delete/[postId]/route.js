import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const user = await auth(req);
    const { postId } = params;

    if (!postId) {
      return NextResponse.json({ error: "Need postId" }, { status: 402 });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json(
        { error: "Post doesnot exist" },
        { status: 404 }
      );
    }

    if (post.postUser.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Post is created by different user" },
        { status: 402 }
      );
    }

    const removedPost = await post.deleteOne();

    return NextResponse.json(
      { message: "Post deleted successfully !!", data: removedPost },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
