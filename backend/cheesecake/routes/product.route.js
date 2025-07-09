import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import {
  uploadProductImage,
  updateProductImage,
} from "../middlewares/multer.middleware.js";
import { authenticate, checkAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, checkAdmin, uploadProductImage, createProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", authenticate, checkAdmin, updateProductImage, updateProduct);

router.delete("/:id", authenticate, checkAdmin, deleteProduct);

export default router;
