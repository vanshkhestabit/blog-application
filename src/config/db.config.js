import mongoose from "mongoose";

let connection = null;

export const connectDB = async () => {
  if (connection) {
    return;
  }
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/blog");
    connection = db.connections[0].readyState;
  } catch (error) {
    console.log(error.message);
    return;
  }
};
