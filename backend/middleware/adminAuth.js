import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminAuth = (req, res, next) => {
  console.log("=== ADMIN AUTH MIDDLEWARE ===");
  console.log("VERIFY SECRET =", process.env.JWT_SECRET);

  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER =", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN =", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED =", decoded);

    req.admin = decoded;
    next();
  } catch (error) {
    console.log("JWT VERIFY ERROR =", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
