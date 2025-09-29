export function withAuth(handler) {
  return async (req) => {
    try {
      const user = await auth(req);
      return handler(req, user);
    } catch (err) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
