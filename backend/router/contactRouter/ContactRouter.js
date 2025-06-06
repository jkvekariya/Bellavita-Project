import express from "express";
import Controller from "../../controller/contactController/ContactController.js";

const router = express.Router();

router.post('/create',Controller.contact);

export default router;