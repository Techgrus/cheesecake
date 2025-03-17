import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  cartCheckout,
} from "../controllers/cart.controller.js";
import { verifyDate } from "../middlewares/verifyDate.middleware.js";

const router = express.Router();

router.get("/", authenticate, getCart);

router.post("/addItem", authenticate, addItemToCart);

router.post("/removeItem", authenticate, removeItemFromCart);

router.post("/checkout", authenticate, verifyDate, cartCheckout);

export default router;
