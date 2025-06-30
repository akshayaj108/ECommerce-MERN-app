import jwt from "jsonwebtoken";

async function checkIsAdmin(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken !== process.env.ADMIN_ID + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.log("admin auth err", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export default checkIsAdmin;
