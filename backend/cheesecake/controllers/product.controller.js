import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { deleteUploadedFile } from "../utility/file.utility.js";

export const createProduct = async (req, res) => {
  const product = await req.body;

  if (
    !product.name ||
    !product.price ||
    !product.imageURL ||
    !product.description
  ) {
    if (req.body.imageURL) {
      deleteUploadedFile(req.body.imageURL);
    }
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  if (product.price <= 0) {
    if (req.body.imageURL) {
      deleteUploadedFile(req.body.imageURL);
    }
    return res
      .status(400)
      .json({ success: false, message: "Price should be greater than 0" });
  }

  const { imageURL, name, price, description, tags } = req.body;

  // Parse the tags field from JSON string to an array of objects
  
  let parsedTags = [];
  if(tags){
    parsedTags = JSON.parse(tags);
  }

  const newProduct = new Product({
    imageURL,
    name,
    price,
    description,
    tags: parsedTags,
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product: ", error.message);
    if (req.body.imageURL) {
      deleteUploadedFile(req.body.imageURL);
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID." });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const oldImageURL = product.imageURL || null;

  if (
    !product.name ||
    !product.price ||
    !product.imageURL ||
    !product.description
  ) {
    if (req.imageURL) {
      deleteUploadedFile(req.imageURL);
    }
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields of product.",
    });
  }

  try {
    // This will be true only when the middleware saves a new image.
    if (req.imageURL) {
      product.imageURL = req.imageURL;
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      if (req.imageURL) {
        deleteUploadedFile(req.imageURL);
      }
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete the old image file
    if (oldImageURL && oldImageURL !== updatedProduct.imageURL) {
      deleteUploadedFile(oldImageURL);
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in updating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    // Delete the uploaded file
    deleteUploadedFile(deletedProduct.imageURL);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
