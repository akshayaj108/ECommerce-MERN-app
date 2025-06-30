import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const AddProduct = (token) => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestSeller: false,
    sizes: [],
    images: {},
  });

  const handleImages = (e) => {
    setProductData((prev) => ({
      ...prev,
      images: { ...prev.images, [e.target.id]: e.target.files[0] },
    }));
  };

  const handleInputChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "bestSeller" ? e.target.checked : e.target.value,
    }));
  };

  const handleSizes = (size) => {
    setProductData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("subCategory", productData.subCategory);
      formData.append("bestSeller", productData.bestSeller);
      formData.append("sizes", JSON.stringify(productData.sizes));
      productData.images.image1 &&
        formData.append("image1", productData.images["image1"]);
      productData.images.image2 &&
        formData.append("image2", productData.images["image2"]);
      productData.images.image3 &&
        formData.append("image3", productData.images["image3"]);
      productData.images.image4 &&
        formData.append("image4", productData.images["image4"]);
      const response = await axios.post(
        `${backendUrl}/api/v1/product/add`,
        formData,
        { headers: token }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setProductData({
          name: "",
          description: "",
          price: "",
          category: "Men",
          subCategory: "Topwear",
          bestSeller: false,
          sizes: [],
          images: {},
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("add product data", error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Upload */}
      <div>
        <p>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                !productData.images.image1
                  ? assets.upload_area
                  : URL.createObjectURL(productData.images.image1)
              }
              alt=""
            />
            {/* setImage1(e.target.files[0]) */}
            <input onChange={handleImages} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                !productData.images.image2
                  ? assets.upload_area
                  : URL.createObjectURL(productData.images.image2)
              }
              alt=""
            />
            <input onChange={handleImages} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                !productData.images.image3
                  ? assets.upload_area
                  : URL.createObjectURL(productData.images.image3)
              }
              alt=""
            />
            <input onChange={handleImages} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                !productData.images.image4
                  ? assets.upload_area
                  : URL.createObjectURL(productData.images.image4)
              }
              alt=""
            />
            <input onChange={handleImages} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      {/* Input Details */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={handleInputChange}
          value={productData?.name}
          name="name"
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={handleInputChange}
          value={productData?.description}
          name="description"
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write description here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={handleInputChange}
            name="category"
            className="w-full px-3 py-2 mb-4"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            onChange={handleInputChange}
            name="subCategory"
            className="w-full px-3 py-2 mb-4"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={handleInputChange}
            value={productData.price}
            className="w-full px-3 py-2 sm:w-[120px]"
            name="price"
            type="number"
            placeholder="25"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => handleSizes("S")} name="S">
            <p
              className={`${
                productData.sizes.includes("S") ? "bg-red-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div onClick={() => handleSizes("M")}>
            <p
              className={`${
                productData.sizes.includes("M") ? "bg-red-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div onClick={() => handleSizes("L")}>
            <p
              className={`${
                productData.sizes.includes("L") ? "bg-red-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div onClick={() => handleSizes("XL")}>
            <p
              className={`${
                productData.sizes.includes("XL") ? "bg-red-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div onClick={() => handleSizes("XXL")}>
            <p
              className={`${
                productData.sizes.includes("XXL")
                  ? "bg-red-200"
                  : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={handleInputChange}
          type="checkbox"
          name="bestSeller"
          checked={productData.bestSeller}
        />
        <label className="cursor-pointer" htmlFor="bestSeller">
          {" "}
          Add to Bestseller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
