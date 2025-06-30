import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/products.js";

async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;

    // Filter out null values
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    //images upload on cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    });

    await productData.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", productData });
    console.log("products dat uploaded successfully");
  } catch (error) {
    console.log("add product err", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function listProduct(req, res) {
  try {
    const products = await productModel.find({});
    if (products.length) {
    }
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("list product", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function removeProduct(req, res) {
  try {
    const products = await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log("remove product", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function singleProductDeatil(req, res) {
  try {
    const { productId } = req.body;
    const productDetails = await productModel.findById(productId);
    res.status(200).json({ success: true, productDetails });
  } catch (error) {
    console.log("single product details", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { addProduct, listProduct, removeProduct, singleProductDeatil };
