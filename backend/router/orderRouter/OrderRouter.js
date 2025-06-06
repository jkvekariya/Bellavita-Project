import express from "express";
import orderController from "../../controller/orderController/OrderController.js";
import getUser from "../../Middlewear/getUser.js";
import adminMiddleware from "../../Middlewear/Adminmiddleware.js";

const router = express.Router();

router.post('/place', getUser, orderController.createOrder);
router.get('/getAllOrder', getUser, orderController.getAllOrder);
router.get("/orders/:orderId", orderController.getOrderById);
router.put('/updateStatus/:id', adminMiddleware, orderController.updateOrderStatus);
router.get('/myOrders', getUser, orderController.getUserOrders);


export default router;