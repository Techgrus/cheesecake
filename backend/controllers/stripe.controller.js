import { Order } from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import { transformOrderData } from "../utility/createCartOrder.utility.js";
import { sendEmail } from "../utility/sendMail.utility.js"; // Ensure you import sendEmail
import mongoose from "mongoose";

export const handleCancel = async (req, res) => {
  const order_id = req.params.order_id;
  const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000"; // Fallback base URL

  if (!mongoose.Types.ObjectId.isValid(order_id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid order ID" });
  }

  try {
    const order = await Order.findByIdAndDelete(order_id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Redirect to the cart page after successful cancellation
    const cartPageUrl = `${BASE_URL}/cart`;
    return res.redirect(cartPageUrl);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const handleSuccess = async (req, res) => {
  const user_id = req.params.user_id;
  const order_id = req.params.order_id;
  const BASE_URL = process.env.FRONTEND_URL || "http://localhost:3000"; // Fallback base URL

  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(order_id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid order ID" });
  }

  try {
    const order = await Order.findById(order_id);
    const user = await User.findById(user_id);

    if (!order || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Order or User not found." });
    }

    const transformedOrder = await transformOrderData(order);

    await sendEmail(
      user.email,
      "Order Confirmation",
      "userOrderPlaced",
      transformedOrder
    );

    await sendEmail(
      process.env.RCV_EMAIL,
      "New Order",
      "newOrderNotification",
      transformedOrder
    );

    const cart = await Cart.findOne({ user_id: user_id });
    if (cart) {
      cart.items = [];
      cart.total_price = 0;
      await cart.save();
    }

    // Redirect to the home page after successful payment
    const homePageUrl = `${BASE_URL}/home`;
    return res.redirect(homePageUrl);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
