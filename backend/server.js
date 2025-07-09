import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cokkieParser from "cookie-parser";

import productRoutes from "./routes/product.route.js";
import carouselProductRoutes from "./routes/carouselProduct.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import pickUpDaysRoutes from "./routes/pickUpDays.route.js";
import maxCakesPerWeekRoutes from "./routes/maxCakesPerWeek.route.js";
import mailRoutes from "./routes/mail.route.js";
import stripeRoutes from "./routes/stripe.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cokkieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carousel-products", carouselProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/pick-up-days", pickUpDaysRoutes);
app.use("/api/max-cakes-per-week", maxCakesPerWeekRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/stripe", stripeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
