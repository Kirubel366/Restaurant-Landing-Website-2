import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
