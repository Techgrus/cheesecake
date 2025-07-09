import express from "express";
import {
  contactUsEmail,
  eventEmail,
  wholeSaleContact,
} from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/contactUs", contactUsEmail);
router.post("/eventMail", eventEmail);
router.post("/wholeSaleContact", wholeSaleContact);

export default router;
