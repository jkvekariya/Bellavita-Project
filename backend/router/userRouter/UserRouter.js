import express from "express";
import UserController from "../../controller/userController/UserController.js";
import getUser from "../../Middlewear/getUser.js";
import adminMiddleware from "../../Middlewear/Adminmiddleware.js";

const router = express.Router();

router.post("/Create", UserController.userData);
router.post("/Login", UserController.loginData); 
router.get("/allUser", getUser,adminMiddleware, UserController.getAllUsers); 
router.put("/:userId/role", getUser,adminMiddleware, UserController.updateUserRole);
router.get("/getcurrentuser",getUser,UserController.getCurrentUser)
router.post("/save-address", getUser, UserController.saveAddress);
router.delete("/delete/:userId", getUser, adminMiddleware, UserController.deleteUser);


export default router;
