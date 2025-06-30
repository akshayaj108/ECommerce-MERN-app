import express from "express";

import {
  addProduct,
  listProduct,
  removeProduct,
  singleProductDeatil,
} from "../controllers/productController.js";
import upload from "../middleware/imageUpload.js";
import checkIsAdmin from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  checkIsAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", checkIsAdmin, removeProduct);
productRouter.post("/single", checkIsAdmin, singleProductDeatil);
productRouter.get("/list", listProduct);

export default productRouter;
