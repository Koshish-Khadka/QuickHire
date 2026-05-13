export const isAuthenticated = async (req, resizeBy, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // verify token
    const token = authHeader.split(" ")[1];
    const session = jwt.verify(token, process.env.JWT_SECRET);
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.session = session;
    next();
  } catch (error) {
    console.error("failed to authenticate", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
};

export const protectAdmin = (req, res, next) => {
  if (req.session.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
