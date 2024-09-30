import dotenv from "dotenv";
import cors from "cors";

// ENV variables
dotenv.config({ path: '../.env' });

import express, { Response, Request, NextFunction } from "express";
import morgan from "morgan";
import Stripe from "stripe";

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentAndCoupan from "./routes/payment.js";
import diagramRoute from "./routes/digram.js";


import { ConnectDatase } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
import NodeCache from "node-cache";
import path from "path";



const port = process.env.PORT || 4000;
// const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_URL = "mongodb://127.0.0.1:27017/skillup_backend";
const stripkey = 'sk_test_51O1fG8SJsVzdiJ8ms6tSQZaFzqZXPGIGBoN5ZIbQGAafrB97qbv76PjkeGOIsmpZHcbvCf7Cs6EJ66IEqNo5RVgh00QlCK8RvZ'

export const strip = new Stripe(stripkey);
export const nodeCache = new NodeCache();



const app = express();
ConnectDatase(MONGO_URL);


//  corse pol icy alow 
app.use(cors());
// middleware start
app.use(express.json());
// morgan use a middleware 

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment&coupan", paymentAndCoupan);
app.use("/api/v1/diagram", diagramRoute);

//   create a middleware form express use  error handler

app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Express yaaa is workingtttt on http://localhost:${port}`);
});
