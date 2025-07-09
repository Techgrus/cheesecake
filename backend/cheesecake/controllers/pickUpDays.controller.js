import configuration from "../models/configuration.model.js";

export const createPickUpDay = async (req, res) => {
  const { key, value } = req.body;

  try {
    // Validate the input days
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let days = value.split(",").map((day) => day.trim());

    days = [...new Set(days)]; // Remove duplicates

    const invalidDays = days.filter((day) => !validDays.includes(day));

    if (invalidDays.length > 0) {
      return res.status(400).json({
        message:
          'Invalid days. Please provide a comma-separated list of valid days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"',
      });
    }

    // Check if the key already exists
    const existingConfig = await configuration.findOne({ key });
    if (existingConfig) {
      return res
        .status(400)
        .json({ message: "Configuration key already exists" });
    }

    // Save the configuration
    const config = new configuration({ key, value: days.join(",") });
    const createdConfig = await config.save();
    res.status(201).json(createdConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchPickupDays = async () => {
  try {
    const config = await configuration.findOne({ key: "pickup_days" });
    if (!config) {
      throw new Error("Pickup days not found");
    }
    return config;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPickUpDays = async (req, res) => {
  try {
    const config = await fetchPickupDays();

    res.status(200).json(config);
  } catch (error) {
    if (error.message === "Pickup days not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updatePickUpDays = async (req, res) => {
  const { value } = req.body;

  try {
    // Validate the input days
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let days = value.split(",").map((day) => day.trim());

    days = [...new Set(days)]; // Remove duplicates

    const invalidDays = days.filter((day) => !validDays.includes(day));

    if (invalidDays.length > 0) {
      return res.status(400).json({
        message:
          'Invalid days. Please provide a comma-separated list of valid days: "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"',
      });
    }

    // Update the configuration
    const config = await configuration.findOne({ key: "pickup_days" });
    if (!config) {
      return res.status(404).json({ message: "Pickup days not found" });
    }

    config.value = days.join(",");
    const updatedConfig = await config.save();
    res.status(200).json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePickUpDays = async (req, res) => {
  try {
    const config = await configuration.findOneAndDelete({ key: "pickup_days" });
    if (!config) {
      return res.status(404).json({ message: "Pickup days not found" });
    }

    res.status(200).json({ message: "Pickup days deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
