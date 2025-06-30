import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Verify = () => {
  const { navigate, token, setCartItems, backendurl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendurl}/api/v1/order/verify/stripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("orders");
      }
    } catch (error) {
      console.log("stripe payment verification", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token]);
  return;
};

export default Verify;
