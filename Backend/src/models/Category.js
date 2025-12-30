import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
