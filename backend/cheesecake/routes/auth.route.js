import { register, login, logout,isLogin } from "../controllers/auth.controller.js";
import { uploadProfileImage } from "../middlewares/multer.middleware.js";
import express from "express";

const router = express.Router();

router.post("/register", uploadProfileImage, register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/islogin", isLogin);

export default router;
