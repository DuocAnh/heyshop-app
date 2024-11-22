import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getProducts = async (req, res) => {
  const resPerPage = 8;

  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductCount,
    products,
  });
};

export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
};

export const getProductDetails = async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  console.log(product);
  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.status(200).json({
    product,
  });
};

export const updateProduct = async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    message: "Product Deleted",
  });
};
