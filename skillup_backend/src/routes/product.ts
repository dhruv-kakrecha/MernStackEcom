import express from "express";
import { createNewProduct, deleteSingleProduct, getAdminProdcuts, getCategoriesProdcuts, getLatesteProdcuts, getSearchProduct, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { SingleUpload } from "../middleware/multer.js";
import { AuthAdmin } from "../middleware/AuthAdmin.js";


const app = express.Router();

app.route("/newproduct").post(AuthAdmin, SingleUpload, createNewProduct);
app.route("/latest").get(getLatesteProdcuts);
app.route("/categories").get(getCategoriesProdcuts);
app.route("/admin-products").get(AuthAdmin, getAdminProdcuts);
app.route("/:id")
   .get(getSingleProduct)
   .delete(AuthAdmin, deleteSingleProduct)
   .put(AuthAdmin, SingleUpload, updateProduct);

app.route("/all").get(getSearchProduct);

export default app;