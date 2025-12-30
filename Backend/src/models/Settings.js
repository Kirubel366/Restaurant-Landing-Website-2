import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  enableItemDescription: {
    type: Boolean,
    default: true,
  },
  enableCategoryDescription: {
    type: Boolean,
    default: true,
  },
  enableVideoFeature: {
    type: Boolean,
    default: false,
  },
  videoLink: {
    type: String,
    default: "",
  },
});

export const Settings = mongoose.model("Settings", settingsSchema);
