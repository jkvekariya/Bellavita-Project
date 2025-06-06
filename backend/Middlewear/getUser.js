import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/userModel/UserModel.js";

dotenv.config();

const getUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader?.replace("Bearer ", "");
    console.log("Extracted token:", token);

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    console.log("Decoded token:", decoded);

    if (!decoded?.id) return res.status(401).json({ message: "Invalid token payload" });

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default getUser;
