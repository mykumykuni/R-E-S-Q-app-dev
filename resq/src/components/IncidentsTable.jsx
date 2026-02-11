const IncidentsTable = ({ incidents }) => {
  return (
    <section className="dashboard-section history-section">
      <h2>Recent Incidents</h2>

      <table className="incidents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Type</th>
            <th>Location</th>
            <th>Detection Method</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.location}</td>
              <td>{item.method}</td>
              <td>{item.time}</td>
              <td>
                <span className={`status-badge ${item.status}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default IncidentsTable;
