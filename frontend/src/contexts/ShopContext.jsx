import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

export const ShopContext = createContext();
//
const ShopContextProvider = ({ children }) => {
  const backendurl = backendUrl;
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("fetch products", error);
      toast.error(error.message);
    }
  };

  const addToCart = async (itemId, size) => {
    if (size) {
      let cartData = structuredClone(cartItems);

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
      setCartItems(cartData);
      if (token) {
        try {
          const response = await axios.post(
            `${backendUrl}/api/v1/cart/add`,
            { itemId, size },
            { headers: { token: token } }
          );
        } catch (error) {
          console.log("add tocart", error);
          toast.error(error.message);
        }
      }
    } else {
      console.log("Please Select Size");
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const sizeOfItem in cartItems[items]) {
        if (cartItems[items][sizeOfItem] > 0) {
          totalCount += cartItems[items][sizeOfItem];
        }
      }
    }
    return totalCount;
  };

  const updateCartQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartToatlAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let cartDetails = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          totalAmount += cartDetails.price * cartItems[items][item];
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    fetchProducts,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateCartQuantity,
    getCartToatlAmount,
    navigate,
    backendurl,
    token,
    setToken,
    products,
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
