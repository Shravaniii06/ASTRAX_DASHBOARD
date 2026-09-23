import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function TelemetryChart({ history }) {
  return (
    <section className="dashboard-card telemetry-chart">
      <div className="section-heading">
        <div>
          <h3>Telemetry Trend</h3>
          <p>Live health data stream</p>
        </div>

        <span className="mini-badge">
          LAST 12 PACKETS
        </span>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={history}>
          <CartesianGrid
            stroke="#1e3e56"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="time"
            stroke="#7393a9"
            fontSize={10}
          />

          <YAxis
            stroke="#7393a9"
            fontSize={10}
          />

          <Tooltip
            contentStyle={{
              background: "#0b1d2d",
              border: "1px solid #2f5a78",
              borderRadius: "10px",
              color: "#e9f6ff"
            }}
          />

          <Line
            type="monotone"
            dataKey="battery"
            stroke="#2de3c5"
            strokeWidth={3}
            dot={false}
            name="Battery (V)"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#a78bfa"
            strokeWidth={3}
            dot={false}
            name="Temperature (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}