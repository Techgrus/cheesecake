import express from "express";
import { authenticate, checkAdmin } from "../middlewares/auth.middleware.js";
import { updateMaxCakesPerWeek } from "../controllers/maxCakesPerWeek.controller.js";

const router = express.Router();

router.post("/", authenticate, checkAdmin, updateMaxCakesPerWeek);

export default router;
