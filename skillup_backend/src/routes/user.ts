import express from "express";
import { newUser } from "../controllers/userController.js";

const app = express.Router();
// create new User
 app.post("/new",newUser);

//   get all users
app.get("/all")

 export default app;