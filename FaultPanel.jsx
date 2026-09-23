const faults = [
  {
    type: "lowBattery",
    label: "Low Battery"
  },
  {
    type: "highTemperature",
    label: "High Temperature"
  },
  {
    type: "highCurrent",
    label: "High Current"
  },
  {
    type: "imu",
    label: "IMU Instability"
  },
  {
    type: "linkLoss",
    label: "LoRa Link Loss"
  }
];

export default function FaultPanel({ onFault }) {
  return (
    <section className="dashboard-card fault-panel">
      <div className="section-heading">
        <div>
          <h3>Fault Injection Lab</h3>
          <p>Simulate onboard anomalies</p>
        </div>

        <span className="warning-badge">
          DEMO MODE
        </span>
      </div>

      <div className="fault-grid">
        {faults.map((fault) => (
          <button
            key={fault.type}
            className="fault-button"
            onClick={() => onFault(fault.type)}
          >
            {fault.label}
          </button>
        ))}
      </div>

      <button
        className="restore-button"
        onClick={() => onFault("restore")}
      >
        ↻ Restore Nominal State
      </button>
    </section>
  );
}