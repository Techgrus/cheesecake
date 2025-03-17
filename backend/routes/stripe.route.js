import express from "express";
import {
  handleCancel,
  handleSuccess,
} from "../controllers/stripe.controller.js";

const router = express.Router();

router.get("/cancel/:order_id", handleCancel);
router.get("/success/:user_id/:order_id", handleSuccess);

export default router;
