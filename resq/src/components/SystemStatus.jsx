import '../styles/SystemStatus.css';

const SystemStatus = () => {
  return (
    <section className="dashboard-section status-section">
      <h2>System Status</h2>

      <ul className="status-list">
        <li className="status-item online">
          <span className="status-indicator"></span>
          IoT Network: <strong>Online</strong>
        </li>

        <li className="status-item online">
          <span className="status-indicator"></span>
          ML Analytics: <strong>Active</strong>
        </li>

        <li className="status-item warning">
          <span className="status-indicator"></span>
          Database: <strong>High Load</strong>
        </li>
      </ul>
    </section>
  );
};

export default SystemStatus;
