import orderModel from "../models/order.js";
import userModel from "../models/users.js";
import Stripe from "stripe";
const currency = "inr";
const deliveryCharge = 10;
//initialize gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing order through th cash on delivery
async function placeOrder(req, res) {
  try {
    const { items, amount, address } = req.body;
    const userId = req.id;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log("place order by cod =", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// placing order through the stripe
async function placeOrderStripe(req, res) {
  try {
    const userId = req.id;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("place order by stripe gateway =", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// placing order through the razorpay
async function placeOrderRazorpay(req, res) {}
// All orders data for admin
async function allOrders(req, res) {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("get all users orders in admin", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// All orders data of user
async function userOrders(req, res) {
  try {
    const userId = req.id;
    const userOrders = await orderModel.find({ userId });
    res.json({ success: true, userOrders });
  } catch (error) {
    console.log("get user orders", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// Upadate user order status by admin
async function updateUserOrdersStatus(req, res) {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log("update order status", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
//to verify payment complete or not if not then remove data from db
async function veryfyStripePayment(req, res) {
  try {
    const userId = req.id;
    const { orderId, success } = req.body;
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log("verify order stripe payment", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateUserOrdersStatus,
  veryfyStripePayment,
};
