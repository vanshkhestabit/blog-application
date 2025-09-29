"use server";
import { connectDB } from "@/config/db.config";
import { User } from "@/models/user.model";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const auth = async (req) => {
  await connectDB();

  const user = req.headers
    .get("cookie")
    ?.split("accessToken=")[1]
    .split(";")[0];

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { payload } = await jwtVerify(user, SECRET_KEY);
  const userCheck = await User.findById(payload.userID).select("-password");

  if (!userCheck) {
    throw new Error("Unauthorized");
  }

  return userCheck;
};
