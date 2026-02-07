import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>R-E-S-Q Dashboard</h1>
                <div className="user-profile" onClick={toggleDropdown}>
                    <span>Admin</span>
                    <span className={`dropdown-icon ${showDropdown ? 'rotate' : ''}`}>▼</span>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={onLogout} className="logout-btn">Logout</button>
                        </div>
                    )}
                </div>
            </header>

            <main className="dashboard-content">
                {/* Summary Cards */}
                <section className="summary-section">
                    <div className="summary-card">
                        <h3>Active Sensors</h3>
                        <p className="summary-value">124</p>
                    </div>
                    <div className="summary-card">
                        <h3>Response Team</h3>
                        <p className="summary-value">8</p>
                    </div>
                </section>

                {/* Active Alerts List */}
                <section className="dashboard-section alerts-section">
                    <h2>Active Alerts</h2>
                    <article className="alert-item high-priority">
                        <div className="alert-info">
                            <h3>Fire Detected - Zone A</h3>
                            <p>Location: Sector 4 - Warehouse</p>
                            <span className="timestamp">10:42 AM</span>
                        </div>
                        <button className="acknowledge-btn" onClick={() => alert('Alert Acknowledged')}>
                            Acknowledge
                        </button>
                    </article>
                    <article className="alert-item medium-priority">
                        <div className="alert-info">
                            <h3>Smoke Detected - Zone B</h3>
                            <p>Location: Office Block 2</p>
                            <span className="timestamp">10:45 AM</span>
                        </div>
                        <button className="acknowledge-btn" onClick={() => alert('Alert Acknowledged')}>
                            Acknowledge
                        </button>
                    </article>
                </section>

                <div className="dashboard-grid-row">
                    {/* Live Camera Preview */}
                    <section className="dashboard-section camera-section">
                        <h2>Live Camera Preview</h2>
                        <div className="camera-placeholder">
                            <p>Live Feed - Site Cam 1</p>
                        </div>
                    </section>

                    {/* System Status Panel */}
                    <section className="dashboard-section status-section">
                        <h2>System Status</h2>
                        <ul className="status-list">
                            <li className="status-item online">
                                <span className="status-indicator"></span> IoT Network: <strong>Online</strong>
                            </li>
                            <li className="status-item online">
                                <span className="status-indicator"></span> ML Analytics: <strong>Active</strong>
                            </li>
                            <li className="status-item warning">
                                <span className="status-indicator"></span> Database: <strong>High Load</strong>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Recent Incidents Table */}
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
                            <tr>
                                <td>#INC-001</td>
                                <td>Fire</td>
                                <td>Zone A - North</td>
                                <td>Heat Sensor</td>
                                <td>09:15 AM</td>
                                <td><span className="status-badge resolved">Resolved</span></td>
                            </tr>
                            <tr>
                                <td>#INC-002</td>
                                <td>Smoke</td>
                                <td>Zone C - Lobby</td>
                                <td>Camera AI</td>
                                <td>08:30 AM</td>
                                <td><span className="status-badge investigating">Investigating</span></td>
                            </tr>
                            <tr>
                                <td>#INC-003</td>
                                <td>Gas Leak</td>
                                <td>Zone B - Kitchen</td>
                                <td>Gas Sensor</td>
                                <td>Yesterday</td>
                                <td><span className="status-badge resolved">Resolved</span></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
