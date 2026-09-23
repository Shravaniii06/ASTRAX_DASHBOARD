import {
  Radio,
  Database,
  Cloud
} from "lucide-react";

export default function CommunicationPanel({ telemetry }) {
  const isLoRaConnected = telemetry?.loraConnected;
  const isBackupActive = telemetry?.sdBackup;

  return (
    <section className="dashboard-card communication-panel">
      <div className="section-heading">
        <div>
          <h3>Data Resilience</h3>
          <p>Telemetry and mission-data protection</p>
        </div>
      </div>

      <div className="communication-pipeline">
        <div
          className={`pipeline-step ${
            isLoRaConnected ? "active" : "inactive"
          }`}
        >
          <Radio size={23} />

          <strong>LoRa Link</strong>

          <small>
            {isLoRaConnected
              ? "Connected"
              : "Interrupted"}
          </small>
        </div>

        <span className="pipeline-arrow">→</span>

        <div
          className={`pipeline-step ${
            isBackupActive ? "backup-active" : ""
          }`}
        >
          <Database size={23} />

          <strong>SD Backup</strong>

          <small>
            {isBackupActive
              ? "Active"
              : "Ready"}
          </small>
        </div>

        <span className="pipeline-arrow">→</span>

        <div className="pipeline-step active">
          <Cloud size={23} />

          <strong>Cloud Sync</strong>

          <small>Gateway Online</small>
        </div>
      </div>
    </section>
  );
}