import express from "express";
import { authenticate, checkAdmin } from "../middlewares/auth.middleware.js";
import { verifyDate } from "../middlewares/verifyDate.middleware.js";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  getAllOrders,
  getUpcomingOrders,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", authenticate, checkAdmin, getAllOrders);
router.get("/my-orders", authenticate, getUserOrders);
router.get("/upcoming-orders", authenticate, checkAdmin, getUpcomingOrders);
router.get("/:id", authenticate, getOrderById);
router.post("/", authenticate, checkAdmin, verifyDate, createOrder);
router.delete("/:id", authenticate, checkAdmin, deleteOrder);

export default router;
