import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Order = () => {
  const { currency, token, backendurl } = useContext(ShopContext);
  const [userOrderData, setUserOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(
        `${backendurl}/api/v1/order/user-orders`,
        { headers: { token: token } }
      );
      console.log("users orders ", response.data.userOrders);
      if (response.data.success) {
        const orders = response.data.userOrders;
        let allOrdersItem = [];
        orders.map((order) => {
          order.items.map((item) => {
            (item["status"] = order.status),
              (item["payment"] = order.payment),
              (item["paymentMethod"] = order.paymentMethod);
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setUserOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log("load user order", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {userOrderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-gray-100 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex item-center gap-1 mt-1 text-base text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gary-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gary-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border border-gray-100 px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
