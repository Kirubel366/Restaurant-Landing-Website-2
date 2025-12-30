import { MenuItem } from "../models/MenuItem.js";


export const listAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ name: 1 });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching menu items." });
  }
};


export const addMenuItem = async (req, res) => {
  try {
    const { name, price, categoryId, description, available } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: "Name, price, and categoryId are required." });
    }

    const newItem = await MenuItem.create({
      name,
      price,
      categoryId,
      description,
      available,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding menu item." });
  }
};


export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating menu item." });
  }
};


export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting menu item." });
  }
};
