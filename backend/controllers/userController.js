import userModel from "../models/users.js";
import createToken from "../helper/createToken.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("first", email);
    const user = await userModel.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (isMatchPassword) {
      const token = createToken(user._id);
      return res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("login user err", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const isExists = await userModel.findOne({ email: email });
    if (isExists) {
      return res.json({ success: false, message: "User Already exists" });
    }
    // validating input
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email id",
      });
    }
    if (password.length < 7) {
      return res.json({
        success: false,
        message: "Please generate strong password",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
      name,
      email,
      password: hashPassword,
    });
    const newUser = await user.save();
    const token = createToken(newUser._id);
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log("register err", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_ID &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized access" });
    }
  } catch (error) {
    console.log("admin login err", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { loginUser, registerUser, adminLogin };
