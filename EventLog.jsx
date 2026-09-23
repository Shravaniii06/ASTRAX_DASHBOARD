export default function EventLog({ logs = [] }) {
  return (
    <section className="dashboard-card event-log">
      <div className="section-heading">
        <div>
          <h3>Mission Events</h3>
          <p>Latest system activity</p>
        </div>
      </div>

      <div className="log-list">
        {logs.length === 0 && (
          <p className="empty-log">
            Waiting for mission events...
          </p>
        )}

        {logs.slice(0, 5).map((log) => (
          <div className="log-item" key={log.id}>
            <span
              className={`log-indicator ${log.level
                ?.replace(" ", "")
                .toLowerCase()}`}
            ></span>

            <span className="log-event">
              {log.event}
            </span>

            <time>
              {new Date(log.time).toLocaleTimeString()}
            </time>
          </div>
        ))}
      </div>
    </section>
  );
}