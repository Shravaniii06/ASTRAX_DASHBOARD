export function evaluateTelemetry(telemetry) {
  const issues = [];

  const {
    temperature,
    battery,
    current,
    imu,
    loraConnected
  } = telemetry;

  if (battery < 6.8) {
    issues.push("Low battery detected");
  }

  if (temperature > 40) {
    issues.push("High temperature detected");
  }

  if (current > 0.7) {
    issues.push("High current consumption");
  }

  if (imu > 15) {
    issues.push("Orientation instability detected");
  }

  if (!loraConnected) {
    issues.push("LoRa communication link lost");
  }

  let healthScore = 100;

  healthScore -= Math.max(0, 7.8 - battery) * 20;
  healthScore -= Math.max(0, temperature - 28) * 1.4;
  healthScore -= Math.max(0, current - 0.42) * 25;

  if (imu > 10) {
    healthScore -= 12;
  }

  if (!loraConnected) {
    healthScore -= 8;
  }

  healthScore = Math.round(
    Math.max(0, Math.min(100, healthScore))
  );

  let mode = "NORMAL";

  if (healthScore < 40) {
    mode = "SAFE MODE";
  } else if (healthScore < 60) {
    mode = "CRITICAL";
  } else if (healthScore < 80) {
    mode = "WARNING";
  }

  const sdBackup = !loraConnected || healthScore < 60;
  const priorityTelemetry = healthScore < 60;

  return {
    health: healthScore,
    mode,
    issues,
    sdBackup,
    priorityTelemetry
  };
}