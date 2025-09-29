import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      minLen: ["4", "Username cannot be less than 4 characters"],
    },
    password: {
      type: String,
      required: true,
      minLen: ["5", "Password cannot be less than 5 characters"],
      maxLen: ["16", "Password cannot be more than 16 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
