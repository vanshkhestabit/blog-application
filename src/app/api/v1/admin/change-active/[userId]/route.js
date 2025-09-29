import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { admin } from "@/utils/admin";
import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "Need postId" }, { status: 402 });
    }

    const user = await auth(req);
    await admin(user);

    const userToChange = await User.findById(userId);

    if (!userToChange) {
      return NextResponse.json(
        { error: "User doesnot exist." },
        { status: 404 }
      );
    }

    userToChange.isActive = !userToChange.isActive;

    const changeUser = await userToChange.save({ validateBeforeSave: false });

    if (!changeUser) {
      return NextResponse.json(
        { error: "Server error while updating user status" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully !!", data: changeUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
