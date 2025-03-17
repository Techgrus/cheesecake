import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { checkAvailability } from "../utility/checkAvailability.utility.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalCost,
      orderType,
      date,
      quantity,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "Order items cannot be empty." });
    }

    if (!quantity) {
      return res.status(400).json({ error: "Quantity is required." });
    } else if (quantity < 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive number." });
    }

    if (!(await checkAvailability(date, quantity))) {
      return res.status(400).json({
        error: "The maximum number of cakes for the week has been reached.",
      });
    }

    const simplifiedOrderItems = orderItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: req.user._id,
      orderItems: simplifiedOrderItems,
      shippingAddress,
      totalCost,
      orderType,
      pickUpDate: date,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID.ID" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("orderItems.product", "_id name price imageURL");

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product"
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "_id name price imageURL");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingOrders = async (req, res) => {
  try {
    const currentDate = new Date();
    const orders = await Order.find({ pickUpDate: { $gt: currentDate } })
      .populate("user", "name email")
      .populate("orderItems.product", "_id name price imageURL");
    if (orders.length === 0) {
      return res.status(404).json({ message: "No upcoming orders found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid order ID.De" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
