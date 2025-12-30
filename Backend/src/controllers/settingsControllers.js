import { Settings } from "../models/Settings.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching settings." });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const settings = await Settings.findOneAndUpdate({}, updates, {
      new: true,
      upsert: true,
    });
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating settings." });
  }
};
