import express from "express";
import {
  listAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemControllers.js";

const router = express.Router();


router.get("/", listAllMenuItems);
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
