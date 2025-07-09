import Configuration from "../models/configuration.model.js";

export const updateMaxCakesPerWeek = async (req, res) => {
  try {
    const { maxCakesPerWeek } = req.body;

    if (maxCakesPerWeek === undefined) {
      return res
        .status(400)
        .json({ error: "Max cakes per week cannot be empty." });
    } else if (maxCakesPerWeek < 0) {
      return res
        .status(400)
        .json({ error: "Max cakes per week cannot be negative." });
    }

    // Find existing config
    let config = await Configuration.findOne({ key: "max_cakes_per_week" });

    if (!config) {
      // Create a new configuration if it doesn't exist
      const newConfig = new Configuration({
        key: "max_cakes_per_week",
        value: maxCakesPerWeek,
      });
      await newConfig.save();
      return res.status(201).json(newConfig);
    }

    config.value = maxCakesPerWeek;
    await config.save();

    return res.status(200).json(config);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
