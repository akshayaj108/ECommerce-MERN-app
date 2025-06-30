import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const ListProducts = (token) => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/product/list`);
      if (response.data.success) {
        setProductList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("fetch list of product", error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/product/remove`,
        { id: productId },
        { headers: token }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProductList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("remove product", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List table */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product list */}
        {productList.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2  border border-gray-300 text-sm"
          >
            <img className="w-12" src={product.image[0]} alt="" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency} {product.price}
            </p>
            <p
              onClick={() => removeProduct(product._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              <img className="w-4 mx-auto" src={assets.bin_icon} alt="" />
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListProducts;
