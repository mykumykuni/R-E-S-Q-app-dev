import { useState } from 'react';

import '../styles/IncidentsTable.css';

const IncidentsTable = ({ incidents }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = incidents.filter(item => {
    const matchesSearch =
      item.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.method.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="dashboard-section history-section">
      <h2>Recent Incidents</h2>

      <div className="incidents-controls">
        <input
          type="text"
          className="incidents-search"
          placeholder="Search incidents..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="incidents-filter"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="resolved">Resolved</option>
          <option value="investigating">Investigating</option>
        </select>
      </div>

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
          {filtered.length > 0 ? filtered.map(item => (
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
          )) : (
            <tr>
              <td colSpan="6" className="no-results">No incidents match your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default IncidentsTable;
