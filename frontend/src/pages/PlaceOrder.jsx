import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  console.log("payment method --------", method);
  const {
    navigate,
    backendurl,
    token,
    cartItems,
    setCartItems,
    getCartCount,
    products,
    deliveryFee,
    getCartToatlAmount,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const orderPlaceSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartToatlAmount() + deliveryFee,
      };
      switch (method) {
        //cod
        case "cod":
          const response = await axios.post(
            `http://localhost:4000/api/v1/order/place-order`,
            orderData,
            { headers: { token } }
          );
          if (response?.data?.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response?.data?.message);
          }
          break;
        case "stripe":
          console.log("executing stripe method");
          const responseStripe = await axios.post(
            `${backendurl}/api/v1/order/place-order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("place order error", error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={orderPlaceSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        {/* Delivery Form */}
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={formData.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          onChange={onChangeHandler}
          name="address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={formData.address}
          type="text"
          placeholder="Address/Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.city}
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.zipcode}
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={formData.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={formData.phone}
          type="number"
          placeholder="Contact Number"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* Payment UI */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Methods */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-gray-100 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-100 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit
              required"
              // onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
