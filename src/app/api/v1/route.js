import { NextResponse } from "next/server";

// pages/api/debug-env.js
export default function GET(req, res) {
  return NextResponse.json(process.env); // dumps all env vars
}
