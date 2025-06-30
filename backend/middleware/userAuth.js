import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorize access" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decode.id;
    next();
  } catch (error) {
    console.log("user auth", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
