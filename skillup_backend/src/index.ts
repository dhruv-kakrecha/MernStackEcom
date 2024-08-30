import express, { Response, Request,NextFunction } from "express";

// Importing Routes
import userRoute from "./routes/user.js";
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


  //   create a middleware form express use  error handler
    
      app.use(errorMiddleware);
   

app.listen(port, () => {
  console.log(`Express yaaa is working on http://localhost:${port}`);
});
