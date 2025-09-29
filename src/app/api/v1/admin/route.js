import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { admin } from "@/utils/admin";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const user = await auth(req);
    await admin(user);

    const allPosts = await User.aggregate([
      {
        $match: {
          username: { $ne: user.username },
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "postUser",
          as: "postData",
        },
      },
      {
        $addFields: {
          noOfPosts: {
            $size: "$postData",
          },
        },
      },
      {
        $project: {
          password: 0,
          postData: 0,
        },
      },
    ]);

    return NextResponse.json(
      { message: "All posts fetched", data: allPosts },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
