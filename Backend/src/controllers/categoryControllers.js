import { Category } from "../models/Category.js";

export const listAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories." });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { value, label, description } = req.body;
    if (!value || !label) return res.status(400).json({ message: "Value and label are required." });
    const newCategory = await Category.create({ value, label, description });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding category." });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: "Category not found." });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found." });
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category." });
  }
};
