import { Router } from "express";
import { injectFault } from "../services/telemetryService.js";

const router = Router();

router.post("/:type", async (req, res) => {
  try {
    const updatedTelemetry = await injectFault(req.params.type);

    res.status(200).json(updatedTelemetry);
  } catch (error) {
    res.status(500).json({
      error: "Unable to inject fault",
      message: error.message
    });
  }
});

export default router;