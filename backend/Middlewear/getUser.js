import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/userModel/UserModel.js";

dotenv.config();

const getUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.log("No Authorization header found");
      return res.status(401).json({ message: "No token provided" });
    }

    // Handle "Bearer " case-insensitively and also handle cases where only the token is sent
    let token = authHeader;
    if (authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.slice(7).trim();
    }

    if (!token) {
      console.log("Empty token received");
      return res.status(401).json({ message: "No token provided" });
    }

    if (!process.env.JWT_SECREAT_KEY) {
      console.error("CRITICAL: JWT_SECREAT_KEY is not defined in .env");
      return res.status(500).json({ message: "Internal server error: auth config missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);

    if (!decoded?.id) {
      console.log("Invalid token payload: no id found", decoded);
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      console.log(`User not found for id: ${decoded.id}`);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    next();
  } catch (error) {
    console.error("JWT verification error details:", {
      message: error.message,
      name: error.name,
      tokenReceived: req.header("Authorization") ? "Yes (masked)" : "No"
    });

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expired: true });
    }

    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};


export default getUser;
