import { Router } from "express";
import { getMissionSnapshot } from "../services/telemetryService.js";

const router = Router();

router.get("/status", (req, res) => {
  const snapshot = getMissionSnapshot();

  res.json(snapshot.telemetry);
});

router.get("/logs", (req, res) => {
  const snapshot = getMissionSnapshot();

  res.json(snapshot.logs);
});

export default router;