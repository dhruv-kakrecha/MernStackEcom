import express from "express";
// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import { ConnectDatase } from "./utils/features.js";
import { errorMiddleware } from "./middleware/error.js";
const port = process.env.PORT || 4000;
const app = express();
ConnectDatase();
// middleware start
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
// Using Routes 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
//   create a middleware form express use  error handler
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Express yaaa is workingtttt on http://localhost:${port}`);
});
