import { useEffect, useState } from "react";

import {
  Thermometer,
  BatteryCharging,
  Activity,
  Compass
} from "lucide-react";

import { api } from "./services/api.js";

import Header from "./components/Header.jsx";
import StatusCard from "./components/StatusCard.jsx";
import TelemetryChart from "./components/TelemetryChart.jsx";
import FaultPanel from "./components/FaultPanel.jsx";
import CommunicationPanel from "./components/CommunicationPanel.jsx";
import DigitalTwin from "./components/DigitalTwin.jsx";
import EventLog from "./components/EventLog.jsx";

export default function App() {
  const [missionData, setMissionData] = useState(null);
  const [chartHistory, setChartHistory] = useState([]);
  const [error, setError] = useState("");

  async function loadMissionData() {
    try {
      const data = await api.getTelemetry();

      setMissionData(data);
      setError("");

      const current = data.telemetry;

      setChartHistory((previousHistory) => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], {
            minute: "2-digit",
            second: "2-digit"
          }),
          battery: current.battery,
          temperature: current.temperature
        };

        return [
          ...previousHistory.slice(-11),
          newPoint
        ];
      });
    } catch (err) {
      setError(
        "Backend unavailable. Start backend with: npm run dev"
      );
    }
  }

  async function handleFault(type) {
    try {
      await api.injectFault(type);

      await loadMissionData();
    } catch (err) {
      setError("Unable to inject fault. Check backend connection.");
    }
  }

  useEffect(() => {
    loadMissionData();

    const interval = setInterval(() => {
      loadMissionData();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const telemetry = missionData?.telemetry;

  return (
    <>
      <Header telemetry={telemetry} />

      <main className="main-content">
        {error && (
          <div className="connection-error">
            ⚠️ {error}
          </div>
        )}

        <section className="hero-section">
          <div className="hero-text">
            <p className="eyebrow">
              MISSION / LEO-DEMO-01
            </p>

            <h1>
              Satellite Health
              <span> at a glance.</span>
            </h1>

            <p className="hero-description">
              Real-time onboard intelligence, autonomous
              response, and resilient CubeSat telemetry.
            </p>
          </div>

          <div
            className={`health-ring ${
              telemetry?.health < 60 ? "low-health" : ""
            }`}
          >
            <small>HEALTH SCORE</small>

            <strong>
              {telemetry?.health ?? "--"}
              <em>%</em>
            </strong>

            <span>
              {telemetry?.mode ?? "CONNECTING"}
            </span>
          </div>
        </section>

        <section className="status-grid">
          <StatusCard
            label="THERMAL"
            value={telemetry?.temperature ?? "--"}
            unit="°C"
            icon={<Thermometer size={20} />}
            tone="purple"
            subtitle="Internal sensor"
          />

          <StatusCard
            label="BATTERY"
            value={telemetry?.battery ?? "--"}
            unit="V"
            icon={<BatteryCharging size={20} />}
            tone="green"
            subtitle="EPS health"
          />

          <StatusCard
            label="CURRENT"
            value={telemetry?.current ?? "--"}
            unit="A"
            icon={<Activity size={20} />}
            tone="orange"
            subtitle="Load draw"
          />

          <StatusCard
            label="ORIENTATION"
            value={telemetry?.imu ?? "--"}
            unit="°"
            icon={<Compass size={20} />}
            tone="cyan"
            subtitle="IMU deviation"
          />
        </section>

        <section className="dashboard-grid">
          <TelemetryChart history={chartHistory} />

          <DigitalTwin telemetry={telemetry} />

          <FaultPanel onFault={handleFault} />

          <CommunicationPanel telemetry={telemetry} />

          <EventLog logs={missionData?.logs} />
        </section>
      </main>

      <footer>
        ASTRA-X • AUTONOMOUS • FAULT-TOLERANT • REAL-TIME
      </footer>
    </>
  );
}