import { Router } from "express";
import {
  updateTelemetry,
  getMissionSnapshot
} from "../services/telemetryService.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(getMissionSnapshot());
});

router.post("/", async (req, res) => {
  try {
    const updatedTelemetry = await updateTelemetry(
      req.body,
      "Live telemetry received"
    );

    res.status(200).json(updatedTelemetry);
  } catch (error) {
    res.status(500).json({
      error: "Unable to update telemetry",
      message: error.message
    });
  }
});

export default router;