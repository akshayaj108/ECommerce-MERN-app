import express from "express";
const orderRouter = express.Router();
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateUserOrdersStatus,
  userOrders,
  veryfyStripePayment,
} from "../controllers/orderController.js";
import authUser from "../middleware/userAuth.js";
import checkIsAdmin from "../middleware/adminAuth.js";

//Admin features
orderRouter.get("/list", checkIsAdmin, allOrders);
orderRouter.post("/status", checkIsAdmin, updateUserOrdersStatus);

//Place order / Payment features
orderRouter.post("/place-order", authUser, placeOrder);
orderRouter.post("/place-order/stripe", authUser, placeOrderStripe);
orderRouter.post("place-order/razorpay", authUser, placeOrderRazorpay);

//User feature
orderRouter.get("/user-orders", authUser, userOrders);

//verify payment
orderRouter.post("/verify/stripe", authUser, veryfyStripePayment);

export default orderRouter;
