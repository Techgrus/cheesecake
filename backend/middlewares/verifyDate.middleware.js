import moment from "moment";
import { fetchPickupDays } from "../controllers/pickUpDays.controller.js";

export const verifyDate = async (req, res, next) => {
  try {
    const { date } = req.body;


    if (!date) {
      return res
        .status(400)
        .json({ message: "Date is required in the request body." });
    }

    const providedDate = moment(date, "YYYY-MM-DD", true); // Ensure strict format validation
    if (!providedDate.isValid()) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    if (providedDate.isBefore(moment().startOf("day"))) {
      return res.status(400).json({
        message: "The date cannot be in the past. Please select a valid date.",
      });
    }

    // Get valid pickup days
    const config = await fetchPickupDays();
    const validPickupDays = config.value
      .split(",")
      .map((day) => day.trim().toLowerCase());

    // Check if provided date falls on a valid pickup day
    const dayOfWeek = providedDate.format("dddd").toLowerCase();
    if (!validPickupDays.includes(dayOfWeek)) {
      return res.status(400).json({
        message: `Invalid pickup day. Valid days are: ${validPickupDays.join(
          ", "
        )}`,
      });
    }

    // Check if the order is placed in the current week
    const now = moment();
    const startOfWeek = now.clone().startOf("week"); // Sunday of the current week
    const startOfNextWeek = startOfWeek.clone().add(1, "week"); // Sunday of the next week

    if (providedDate.isBetween(startOfWeek, startOfNextWeek, "day", "[)")) {
      return res.status(400).json({
        message:
          "Orders cannot be placed for the current week. Please select a date for the next week.",
      });
    }

    // Check if the provided date is not more than 2 months from now
    const maxAllowedDate = now.clone().add(2, "months");
    if (providedDate.isAfter(maxAllowedDate)) {
      return res.status(400).json({
        message:
          "The date cannot be more than 2 months from the current date. Please select a valid date.",
      });
    }

    req.body.date = date;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
