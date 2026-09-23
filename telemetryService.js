import { db } from "../config/firebase.js";
import { evaluateTelemetry } from "./healthEngine.js";

let telemetry = {
  temperature: 26.4,
  battery: 7.8,
  current: 0.42,
  imu: 2.1,
  light: 74,
  loraConnected: true
};

let logs = [];

function getTime() {
  return new Date().toISOString();
}

function createLog(event, level) {
  const log = {
    id: Date.now(),
    time: getTime(),
    event,
    level
  };

  logs.unshift(log);

  if (logs.length > 40) {
    logs = logs.slice(0, 40);
  }

  return log;
}

export async function updateTelemetry(newData = {}, event = "Telemetry updated") {
  telemetry = {
    ...telemetry,
    ...newData
  };

  const healthResult = evaluateTelemetry(telemetry);

  telemetry = {
    ...telemetry,
    ...healthResult,
    updatedAt: getTime()
  };

  const newLog = createLog(event, telemetry.mode);

  if (db) {
    try {
      await db.ref("astra-x/currentTelemetry").set(telemetry);
      await db.ref("astra-x/eventLogs").push(newLog);
    } catch (error) {
      console.log("Firebase write failed:", error.message);
    }
  }

  return telemetry;
}

export function getMissionSnapshot() {
  return {
    telemetry,
    logs
  };
}

export async function injectFault(type) {
  const faultMap = {
    lowBattery: {
      battery: 6.4,
      temperature: 45.8
    },

    highTemperature: {
      temperature: 48.5
    },

    highCurrent: {
      current: 0.92
    },

    imu: {
      imu: 24
    },

    linkLoss: {
      loraConnected: false
    },

    restore: {
      temperature: 26.4,
      battery: 7.8,
      current: 0.42,
      imu: 2.1,
      light: 74,
      loraConnected: true
    }
  };

  const data = faultMap[type] || {};

  const event =
    type === "restore"
      ? "Nominal mission state restored"
      : `Fault injected: ${type}`;

  return updateTelemetry(data, event);
}

await updateTelemetry({}, "ASTRA-X Mission Control initialized");