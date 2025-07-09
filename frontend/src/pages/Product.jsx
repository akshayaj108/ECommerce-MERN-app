import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [firstImage, setFirstImage] = useState("");
  const [selextedSize, setSelectSize] = useState("");
  const [sizeSelected, setSizeSelected] = useState(false);

  const fetchProductData = async () => {
    const data = products.find((item) => item._id === productId);
    setProductData(data);
    setFirstImage(data.image[0]);
    return null;
  };
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const checkIsSelected = (item) => {
    setSizeSelected(false);
    setSelectSize(item);
  };
  const addCart = () => {
    if (selextedSize) {
      addToCart(productData._id, selextedSize);
    } else {
      setSizeSelected(true);
    }
  };
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col gap-6 sm:gap-12 sm:flex-row">
        {/* Product Image Section */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-3">
          {/* Thumbnail Images */}
          <div className="flex w-full sm:w-[18.7%] gap-2 sm:gap-0 sm:flex-col overflow-x-auto sm:overflow-y-auto sm:justify-start">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setFirstImage(item)}
                className="w-24 h-24 object-cover rounded cursor-pointer flex-shrink-0 sm:w-full sm:h-auto sm:mb-3"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={firstImage}
              alt="Selected Product"
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
        {/* Product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <p className="pl-2">(300)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            {/* selext product size option feature */}
            <p>Select Size</p>
            <div className="flex-gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => checkIsSelected(item)}
                  key={index}
                  className={`border border-gray-200 bg-gray-200 rounded-sm mr-2 py-2 px-4 ${
                    selextedSize === item && "border-orange-500"
                  }`}
                >
                  {item}
                </button>
              ))}
              {sizeSelected ? (
                <p className=" text-red-500">Please Select Size</p>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* add to cart */}
          <button
            onClick={addCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Geniune Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy Return & Exchange Policy applicable within 7 Days </p>
          </div>
        </div>
      </div>
      {/* product description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-200 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-200 px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex- flex-col gap-4 border border-gray-100 px-6 py-6 text-sm text-gray-500">
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            exercitationem, quo quae cupiditate, odio obcaecati neque
            aspernatur, repellat sit suscipit ipsam expedita mollitia itaque
            possimus! Ad?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit,
            eveniet? Velit, modi optio fugiat corrupti ea rem voluptatem et eum!
          </p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
