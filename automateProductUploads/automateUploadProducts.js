const fs = require("fs");
const path = require("path");
const { products } = require("./productsAssets");
const FormData = require("form-data");
const axios = require("axios");

// import axios from "axios";
// import FormData from "form-data";
// import { products } from "./productsAssets";

async function automateUploadsProducts() {
  for (const product of products) {
    const form = new FormData();
    //append fields
    form.append("name", product.name);
    form.append("description", product.description);
    form.append("price", product.price.toString());
    form.append("category", product.category);
    form.append("subCategory", product.subCategory);
    form.append("sizes", JSON.stringify(product.sizes));
    form.append("bestSeller", String(product.bestSeller || true));
    // add images as fields
    product.image.forEach((img, idx) => {
      const imagePath = path.join(__dirname, "./uploads", img + ".png");
      form.append(`image${idx + 1}`, fs.createReadStream(imagePath));

      // if (fs.existsSync(imagePath)) {
      //   console.log("✅ File exists:", imagePath);
      // } else {
      //   console.log("❌ File does NOT exist:", imagePath);
      // }
    });
    console.log("✅ File exists:", form);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/product/add`,
        form,
        {
          headers: form.getHeaders(),
        }
      );
      console.log(`✅ Product added: ${product.name}`);
    } catch (error) {
      console.error(`❌ `, error.response?.data || error.message);
    }
  }
}
automateUploadsProducts();
