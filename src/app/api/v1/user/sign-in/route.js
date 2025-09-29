import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { createAccessToken } from "@/utils/tokens";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { username, password } = body;

    if (username.trim() === "" || password.trim() === "") {
      return NextResponse.json(
        { error: "Username and password required." },
        { status: 400 }
      );
    }

    const checkUsername = await User.findOne({ username });

    if (!checkUsername) {
      return NextResponse.json(
        { error: "Username doesnot exist." },
        { status: 404 }
      );
    }

    if (!checkUsername.isActive) {
      return NextResponse.json(
        { error: "User is not active by the admin." },
        { status: 402 }
      );
    }

    const match = await bcrypt.compare(password, checkUsername.password);

    if (!match) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const accessToken = createAccessToken(checkUsername);

    const objToSend = {
      username: checkUsername.username,
      isAdmin: checkUsername.isAdmin,
      _id: checkUsername._id,
      accessToken
    };

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return NextResponse.json(
      { message: "User logged in.", data: objToSend },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
