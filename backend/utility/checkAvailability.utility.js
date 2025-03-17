import configuration from "../models/configuration.model.js";
import { Order } from "../models/order.model.js";

export const checkAvailability = async (date, quantity) => {
  const maxCakesPerWeek = await configuration.findOne({
    key: "max_cakes_per_week",
  });

  if (!maxCakesPerWeek) {
    throw new Error("Max cakes per week not set.");
  }

  const orders = await Order.find({
    pickUpDate: date,
  });

  let totalCakesOrdered = 0;

  orders.forEach((order) => {
    totalCakesOrdered += order.orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  });

  return totalCakesOrdered + quantity <= maxCakesPerWeek.value;
};
