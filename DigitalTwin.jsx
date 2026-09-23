export default function DigitalTwin({ telemetry }) {
  const mode = telemetry?.mode || "NORMAL";

  let colorClass = "normal";

  if (mode === "CRITICAL") {
    colorClass = "critical";
  }

  if (mode === "SAFE MODE") {
    colorClass = "safe";
  }

  if (mode === "WARNING") {
    colorClass = "warning";
  }

  return (
    <section className="dashboard-card digital-twin">
      <div className="section-heading">
        <div>
          <h3>Digital Twin</h3>
          <p>3D mission state visualization</p>
        </div>
      </div>

      <div className="twin-stage">
        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>

        <div className={`cube-satellite ${colorClass}`}>
          <div className="solar-panel left-panel"></div>

          <div className="cube-body">
            <span>ASTRA</span>
            <span>X</span>
          </div>

          <div className="solar-panel right-panel"></div>
        </div>
      </div>

      <div className={`twin-mode ${colorClass}`}>
        {mode}
      </div>
    </section>
  );
}