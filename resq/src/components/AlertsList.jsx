const AlertsList = ({ alerts, onAcknowledge }) => {
  return (
    <section className="dashboard-section alerts-section">
      <h2>Active Alerts</h2>

      {alerts.map(alert => (
        <article
          key={alert.id}
          className={`alert-item ${alert.priority}`}
        >
          <div className="alert-info">
            <h3>{alert.title}</h3>
            <p>Location: {alert.location}</p>
            <span className="timestamp">{alert.time}</span>
          </div>

          <button
            className="acknowledge-btn"
            onClick={() => onAcknowledge(alert.id)}
          >
            Acknowledge
          </button>
        </article>
      ))}
    </section>
  );
};

export default AlertsList;
