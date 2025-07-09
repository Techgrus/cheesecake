import mongoose from "mongoose";
import CarouselProduct from "../models/carouselProduct.model.js";
import Product from "../models/product.model.js";

export const createCarouselProduct = async (req, res) => {
  const productID = req.body.productID;
  if (!productID) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide product ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID." });
  }

  // Check if product already exists in carousel
  const existingCarouselProduct = await CarouselProduct.findOne({
    product: productID,
  });
  if (existingCarouselProduct) {
    return res
      .status(400)
      .json({ success: false, message: "Product already exists in carousel" });
  }

  try {
    const product = await Product.findById(productID);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const newCarouselProduct = new CarouselProduct({
      product,
    });

    await newCarouselProduct.save();
    res.status(201).json({ success: true, data: newCarouselProduct });
  } catch (error) {
    console.error("Error in creating carousel product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCarouselProducts = async (req, res) => {
  try {
    const carouselProducts = await CarouselProduct.find().populate("product");
    res.status(200).json({ success: true, data: carouselProducts });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCarouselProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid carousel product id" });
  }

  try {
    const deletedCarouselProduct = await CarouselProduct.findByIdAndDelete(id);
    if (!deletedCarouselProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Carousel product deleted" });
  } catch (error) {
    console.error("Error in deleting carousel product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCarouselProductById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid carousel product id" });
  }

  try {
    const carouselProduct = await CarouselProduct.findById(id).populate(
      "product"
    );

    if (!carouselProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel product not found" });
    }

    res.status(200).json({ success: true, data: carouselProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCarouselProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid carousel product id" });
  }

  try {
    const carouselProduct = await CarouselProduct.findById(id);

    if (!carouselProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Carousel product not found" });
    }

    const productID = req.body.productID;
    if (!productID) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide product ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(productID)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID." });
    }

    const product = await Product.findById(productID);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if product already exists in carousel
    const existingCarouselProduct = await CarouselProduct.findOne({
      product: productID,
    });
    if (existingCarouselProduct) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Product already exists in carousel",
        });
    }

    carouselProduct.product = product;
    await carouselProduct.save();
    res.status(200).json({ success: true, data: carouselProduct });
  } catch (error) {
    console.error("Error in updating carousel product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
