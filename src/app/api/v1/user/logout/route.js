import { connectDB } from "@/config/db.config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const cookieStore = await cookies();
    cookieStore.set("accessToken", "", {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });
    return NextResponse.json({ message: "User logged out." }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
