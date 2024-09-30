import express from 'express';
import { newCoupan, applyDiscount, getAllCoupans, deleteCoupan, createPayment } from '../controllers/payment&CoupanController.js';
import { AuthAdmin } from '../middleware/AuthAdmin.js';


const app = express.Router();

app.route("/payment").post(createPayment);
app.route("/new").post(newCoupan);
app.route("/discount").post(AuthAdmin, applyDiscount);
app.route("/allcoupan").get(AuthAdmin, getAllCoupans);
app.route("/:id").delete(AuthAdmin, deleteCoupan);

export default app;