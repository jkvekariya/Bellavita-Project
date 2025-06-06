import UserModel from "../../model/userModel/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const UserController = {

    async userData(req, res) {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists..." });
            }

            const user = new UserModel({
                name,
                email,
                password,
                role: role || "USER"
            });
            await user.save();

            res.json({ message: "User Created..." });
        } catch (error) {
            console.log("Error in userData:", error);
            res.json({ message: error });
        }
    },

    async loginData(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Please fill in all fields." });
            }

            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ message: "Invalid email or password." }); // generic message
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log("Incorrect password");
                return res.status(401).json({ message: "Invalid email or password." });
            }

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECREAT_KEY,
                { expiresIn: "1h" }
            );

            res.json({
                token,
                message: "Login successfully...",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.log("Error in loginData:", error);
            res.status(500).json({ message: "Server error during login." });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find({}, { password: 0 });
            res.json(users);
        } catch (error) {
            console.log("Error in getAllUsers:", error);
            res.status(500).json({ message: "Error fetching users" });
        }
    },

    async updateUserRole(req, res) {
        try {
            const { userId } = req.params;
            const { role } = req.body;

            if (!["ADMIN", "USER"].includes(role)) {
                return res.status(400).json({ message: "Invalid role" });
            }

            if (req.user.id === userId && role !== "ADMIN") {
                return res.status(400).json({ message: "Cannot demote yourself" });
            }

            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { role },
                { new: true, select: '-password' }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json({
                message: "Role updated successfully",
                user: updatedUser
            });
        } catch (error) {
            console.log("Error in updateUserRole:", error);
            res.status(500).json({ message: "Error updating role" });
        }
    },

    async getCurrentUser(req, res) {
        try {
            const user = await UserModel.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error("Error getting user:", error);
            res.status(500).json({ message: "Server error" });
        }

    },
    async saveAddress(req, res) {
        try {
            const { fullName, email, line1, city, state, pincode } = req.body;
            const userId = req.user.id; 

            if (!fullName || !email || !line1 || !city || !state || !pincode) {
                return res.status(400).json({ message: "All fields are required." });
            }

            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            const newAddress = { fullName, email, line1, city, state, pincode };
            user.addresses.push(newAddress);
            await user.save();

            return res.status(200).json({
                message: "Address saved successfully",
                addresses: user.addresses,
            });
        } catch (error) {
            console.error("Error saving address:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

};

export default UserController;