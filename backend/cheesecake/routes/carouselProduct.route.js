import express from "express";
import {
  createCarouselProduct,
  deleteCarouselProduct,
  getCarouselProducts,
  getCarouselProductById,
  updateCarouselProduct,
} from "../controllers/carouselProduct.controller.js";
import { authenticate, checkAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, checkAdmin, createCarouselProduct);

router.get("/", getCarouselProducts);

router.get("/:id", getCarouselProductById);

router.delete("/:id", authenticate, checkAdmin, deleteCarouselProduct);

router.put("/:id", authenticate, checkAdmin, updateCarouselProduct);

export default router;
