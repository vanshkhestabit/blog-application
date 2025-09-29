import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { createAccessToken } from "@/utils/tokens";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { username, password, confirmPassword } = body;

    if (
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Username, password and confirm password required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirm password are not equal." },
        { status: 400 }
      );
    }

    const checkUsername = await User.findOne({ username });

    if (checkUsername) {
      return NextResponse.json(
        { error: "Username already exist." },
        { status: 409 }
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPass,
    });

    const accessToken = createAccessToken(newUser);

    const objToSend = {
      username: newUser.username,
      isAdmin: newUser.isAdmin,
      _id: newUser._id,
    };

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    return NextResponse.json(
      { message: "User created and logged in.", data: objToSend },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
