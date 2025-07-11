import express from "express";
import {
  addToCart,
  getUserCart,
  updateUserCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);

cartRouter.post("/add", authUser, addToCart);

cartRouter.post("/update", authUser, updateUserCart);

export default cartRouter;
