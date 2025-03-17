import { Order } from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const transformOrderData = async (order) => {
  try {
    const user = await User.findById(order.user);
    const userName = user ? user.name : "John Doe";
    const userEmail = user ? user.email : "example@gmail.com";

    const orderItems = await Promise.all(
      order.orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        return {
          product: product ? product.name : "Unknown Product", // Default if product not found
          quantity: item.quantity,
          price: product ? product.price : 0, // Default price if product not found
        };
      })
    );

    // Format pickUpDate
    const pickUpDate = new Date(order.pickUpDate).toLocaleDateString();

    // Return transformed order data
    return {
      user: userName,
      email: userEmail,
      orderItems,
      totalCost: order.totalCost,
      orderType: order.orderType,
      pickUpDate,
    };
  } catch (error) {
    console.error("Error transforming order data:", error);
    throw error;
  }
};

export const createCartOrder = async ({ body }) => {
  try {
    const { orderItems, shippingAddress, totalCost, orderType, date } = body;

    if (!orderItems || orderItems.length === 0) {
      return { error: "Order items cannot be empty." };
    }

    const simplifiedOrderItems = orderItems.map((item) => ({
      product: item.product_id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: body.user_id,
      orderItems: simplifiedOrderItems,
      shippingAddress,
      totalCost,
      orderType,
      pickUpDate: date,
    });

    const savedOrder = await order.save();
    return {
      order_id: savedOrder._id,
      order: await transformOrderData(savedOrder),
    };
  } catch (error) {
    return { error: error.message };
  }
};
