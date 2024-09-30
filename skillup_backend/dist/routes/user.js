import express from "express";
import { SingleUserDelete, getAllUsers, getSingleUser, newUser } from "../controllers/userController.js";
import { AuthAdmin } from "../middleware/AuthAdmin.js";
const app = express.Router();
// create new User
app.post("/new", newUser);
//   get all users
app.route("/all").get(getAllUsers);
//  get Single User
app.route("/:id").post(AuthAdmin, getSingleUser).delete(SingleUserDelete);
export default app;
