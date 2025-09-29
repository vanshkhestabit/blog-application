import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model";
import { auth } from "@/utils/auth";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const user = await auth(req);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    let posts;

    if (searchParams.has("page")) {
      posts = await Post.aggregate([
        { $match: { postUser: userId } },
        { $sort: { updatedAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);

      return NextResponse.json(
        {
          message: "Post fetched successfully !!",
          page,
          limit,
          data: posts,
        },
        { status: 200 }
      );
    }

    const post = await Post.find({ postUser: user._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { message: "Post Fetched successfully !!.", data: post },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
