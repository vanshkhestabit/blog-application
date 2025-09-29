export const admin = async (user) => {
  if (!user.isAdmin) {
    throw new Error("Unauthorized");
  }
};
