import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout, alerts = [], onAcknowledgeAlert }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => {
      const nextState = !prev;
      if (nextState) {
        setShowUserDropdown(false);
      }
      return nextState;
    });
  };

  const handleToggleUserDropdown = () => {
    setShowUserDropdown((prev) => {
      const nextState = !prev;
      if (nextState) {
        setShowNotifications(false);
      }
      return nextState;
    });
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>R-E-S-Q Dashboard</h1>
      </div>

      <nav className="header-nav">
        <ul className="nav-list">
          <li>
            <NavLink 
              to="/overview" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/incident-map" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Incident Map
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/camera-feed" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Camera Feed
            </NavLink>
          </li>
          <li>
  <NavLink 
    to="/camera-list" 
    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
  >
    Camera List
  </NavLink>
</li>
          <li>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-actions">
        <div className="notifications-wrapper">
          <button
            type="button"
            className="notification-btn"
            onClick={handleToggleNotifications}
            aria-label="View active alerts"
          >
            <svg
              className="notification-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z"
                fill="currentColor"
              />
            </svg>
            {alerts.length > 0 && (
              <span className="notification-badge">{alerts.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <h3>Active Alerts</h3>

              {alerts.length === 0 ? (
                <p className="no-alerts">No active alerts</p>
              ) : (
                alerts.map((alert) => (
                  <article
                    key={alert.id}
                    className={`notification-item ${alert.priority}`}
                  >
                    <div className="notification-info">
                      <h4>{alert.title}</h4>
                      <p>{alert.location}</p>
                      <span>{alert.time}</span>
                    </div>
                    <button
                      type="button"
                      className="notification-ack-btn"
                      onClick={() => onAcknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </button>
                  </article>
                ))
              )}
            </div>
          )}
        </div>

        <div
          className="user-profile"
          onClick={handleToggleUserDropdown}
        >
          <span>Admin</span>
          <span className={`dropdown-icon ${showUserDropdown ? 'rotate' : ''}`}>
            ▼
          </span>

          {showUserDropdown && (
            <div className="dropdown-menu">
              <button
                type="button"
                className="profile-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowUserDropdown(false);
                  navigate('/profile');
                }}
              >
                Profile
              </button>
              <button
                className="logout-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowUserDropdown(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
