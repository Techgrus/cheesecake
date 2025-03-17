import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1."],
  },
});

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: { type: shippingAddressSchema, required: false },
    totalCost: {
      type: Number,
      required: true,
      min: [0, "Total cost must be a positive number."],
    },
    orderType: {
      type: String,
      required: true,
      enum: ["pickup", "delivery"],
      default: "pickup",
    },
    pickUpDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.virtual("totalQuantity").get(function () {
  return this.orderItems.reduce((sum, item) => sum + item.quantity, 0);
});

export const Order = mongoose.model("Order", orderSchema);
