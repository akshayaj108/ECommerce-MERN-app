import jwt from "jsonwebtoken";

const craeteToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export default craeteToken;
