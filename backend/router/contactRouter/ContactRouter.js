import express from "express";
import Controller from "../../controller/contactController/ContactController.js";

const router = express.Router();

router.post('/create', Controller.contact);
router.get('/all', Controller.getAllContacts);
router.get('/user/:userId', Controller.getUserContacts);
router.put('/update/:id', Controller.updateContactStatus);

export default router;