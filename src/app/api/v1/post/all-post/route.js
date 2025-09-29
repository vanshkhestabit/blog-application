import { connectDB } from "@/config/db.config";
import { Post } from "@/models/post.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postUser",
          foreignField: "_id",
          as: "postUserData",
        },
      },
      {
        $limit: 3,
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return NextResponse.json(
      { message: "Post fetched successfully !!", data: post },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
