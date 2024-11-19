import mongoose from "mongoose";
import dotenv from "dotenv";

import products from "./data.js";
import Product from "../models/product.js";

dotenv.config({ path: "backend/config/config.env" });
const dbURI = process.env.DB_LOCAL_URI;

const seedProducts = async () => {
  try {
    await mongoose.connect(dbURI);

    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are added");
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
