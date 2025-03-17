import express from "express";
import { authenticate, checkAdmin } from "../middlewares/auth.middleware.js";
import {
  getPickUpDays,
  createPickUpDay,
  deletePickUpDays,
  updatePickUpDays,
} from "../controllers/pickUpDays.controller.js";

const router = express.Router();

router.get("/", getPickUpDays);
router.post("/", authenticate, checkAdmin, createPickUpDay);
router.put("/", authenticate, checkAdmin, updatePickUpDays);
router.delete("/", authenticate, checkAdmin, deletePickUpDays);

export default router;
