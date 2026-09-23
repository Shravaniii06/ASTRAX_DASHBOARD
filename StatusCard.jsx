export default function StatusCard({
  label,
  value,
  unit,
  icon,
  tone = "cyan",
  subtitle
}) {
  return (
    <div className={`status-card ${tone}`}>
      <div className="status-card-top">
        <span>{label}</span>

        <div className="status-icon">
          {icon}
        </div>
      </div>

      <div className="status-value">
        {value}
        <small>{unit}</small>
      </div>

      <p>{subtitle}</p>
    </div>
  );
}