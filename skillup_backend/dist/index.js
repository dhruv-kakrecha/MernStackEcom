import express from "express";
// Importing Routes
import userRoute from "./routes/user.js";
import { ConnectDatase } from "./utils/features.js";
const port = process.env.PORT || 4000;
const app = express();
// middleware start
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
// Using Routes
app.use("/api/v1/user", userRoute);
ConnectDatase();
console.log("Connecting");
app.listen(port, () => {
    console.log(`Express yaaa uuuis working on http://localhost:${port}`);
});
