import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
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
    // check user data 
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId
      }
    })
    if (!user) return res.status(404).json({ message: "User not found" });

    req.session = session;
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    })
  }
};

export const protectAdmin = (req, res, next) => {
  if (req.session.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
