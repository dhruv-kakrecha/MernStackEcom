import express from 'express';
import { myOrder, newOrder,getAllOrders ,getSingleOrder,singleOrderDelete,processOrder} from '../controllers/orderController.js';
import { AuthAdmin } from '../middleware/AuthAdmin.js';

const app = express.Router();

app.route("/neworder").post(newOrder);
app.route("/myorder").post(myOrder);
app.route("/allorders").get(AuthAdmin,getAllOrders);
app.route("/:id")
.post(getSingleOrder)
.delete(AuthAdmin,singleOrderDelete)
.put(AuthAdmin,processOrder);

export default app;