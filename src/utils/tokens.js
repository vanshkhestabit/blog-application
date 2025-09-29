import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
  return jwt.sign(
    { userID: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    }
  );
};
