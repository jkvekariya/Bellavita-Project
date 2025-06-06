import express from "express";
import productController from "../../controller/productController/ProductController.js";

const router = express.Router();

router.post('/Create', productController.createProduct);
router.get('/getAll/', productController.getAllProducts);
router.get('/getId/:id', productController.getProductById);
router.get('/getByCategory/:category', productController.getProductsByCategory);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get("/search", productController.searchProduct);

export default router
