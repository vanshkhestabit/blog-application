import { auth } from "@/utils/auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const user = await auth(req);
    return NextResponse.json(
      { message: "User verified.", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
