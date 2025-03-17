import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { createCartOrder } from "../utility/createCartOrder.utility.js";
import { checkAvailability } from "../utility/checkAvailability.utility.js";
import { makePayment } from "../utility/payment.utility.js";

export const getCart = async (req, res) => {
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOne({ user_id }).populate("items.product_id");
    if (cart === null) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found for this user." });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addItemToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user._id;

  if (!product_id || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Please provide product ID and quantity",
    });
  }

  if (quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Quantity must be greater than 0" });
  }

  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOne({ user_id });
    const product = await Product.findOne({ _id: product_id });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const itemTotal = product.price * quantity;

    let newCart;

    if (cart) {
      //Checks if the item already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.product_id.toString() === product._id.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * product.price;
      } else {
        cart.items.push({
          product_id: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          total: itemTotal,
        });
      }

      cart.total_price = cart.items.reduce((acc, item) => acc + item.total, 0);
      await cart.save();
    } else {
      newCart = new Cart({
        user_id,
        items: [
          {
            product_id,
            name: product.name,
            price: product.price,
            quantity,
            total: product.price * quantity,
          },
        ],
        total_price: product.price * quantity,
      });

      await newCart.save();
    }

    res.status(201).json({
      success: true,
      data: cart || newCart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    //Checks if the item exists in the cart
    const itemIndex = cart.items.findIndex((item) => {
      return item.product_id.toString() === product_id.toString();
    });

    if (itemIndex > -1) {
      if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
        cart.items[itemIndex].total =
          cart.items[itemIndex].quantity * cart.items[itemIndex].price;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      //Recalculates the total price of the cart
      cart.total_price = cart.items.reduce((acc, item) => acc + item.total, 0);
      await cart.save();
      res.status(200).json({
        success: true,
        data: cart,
        message: "Product removed from cart",
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Product not found in the cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const cartCheckout = async (req, res) => {
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const totalQuantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const orderDate = req.body.date;
    if (!(await checkAvailability(orderDate, totalQuantity))) {
      return res.status(400).json({
        message: "The maximum number of cakes for the week has been reached.",
      });
    }

    const orderItems = cart.items;
    const totalCost = cart.total_price;
    const orderType = "pickup";
    const date = orderDate;

    const { order_id, order } = await createCartOrder({
      body: { user_id, orderItems, totalCost, orderType, date },
    });

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Order creation failed" });
    } else {
      const sessionUrl = await makePayment(order_id, user_id, order);
      res.json({ success: true,url: sessionUrl });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
