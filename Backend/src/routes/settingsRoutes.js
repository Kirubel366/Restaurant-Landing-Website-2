import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsControllers.js";

const router = express.Router();

router.get("/", getSettings);
router.patch("/", updateSettings);

export default router;
