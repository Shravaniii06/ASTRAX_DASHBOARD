import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import telemetryRoutes from "./routes/telemetry.js";
import faultRoutes from "./routes/faults.js";
import missionRoutes from "./routes/mission.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "ASTRA-X Mission Control API",
    status: "online",
    message: "Backend is running successfully"
  });
});

app.use("/api/telemetry", telemetryRoutes);
app.use("/api/faults", faultRoutes);
app.use("/api/mission", missionRoutes);

app.listen(PORT, () => {
  console.log(`🚀 ASTRA-X Backend running on http://localhost:${PORT}`);
});