import { Satellite, Radio } from "lucide-react";

export default function Header({ telemetry }) {
  const isConnected = telemetry?.loraConnected;

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-logo">
          <Satellite size={24} />
        </div>

        <div>
          <h2>ASTRA-X</h2>
          <p>Autonomous Mission Control</p>
        </div>
      </div>

      <div className={`live-status ${isConnected ? "online" : "offline"}`}>
        <span className="live-dot"></span>

        <span className="live-text">
          LIVE TELEMETRY
        </span>

        <Radio size={15} />

        <span className="link-text">
          {isConnected ? "LINK ACTIVE" : "LINK INTERRUPTED"}
        </span>
      </div>
    </header>
  );
}