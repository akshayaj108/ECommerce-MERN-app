//add product to uiser cart

import userModel from "../models/users.js";

async function addToCart(req, res) {
  try {
    const { itemId, size } = req.body;
    const userDetail = await userModel.findById(req.id);
    if (!userDetail) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = await userDetail.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userDetail._id, { cartData });
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log("update cart", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
async function updateUserCart(req, res) {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await userModel.findById(req.id);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userData._id, { cartData });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log("update cart", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
async function getUserCart(req, res) {
  try {
    const userData = await userModel.findById(req.id);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = await userData.cartData;
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log("get user cart", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { addToCart, updateUserCart, getUserCart };
