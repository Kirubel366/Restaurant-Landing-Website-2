import express from "express";
import {
  listAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", listAllCategories);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
