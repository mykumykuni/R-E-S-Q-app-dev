import { useState } from 'react';

const Header = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="dashboard-header">
      <h1>R-E-S-Q Dashboard</h1>

      <div
        className="user-profile"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Admin</span>
        <span className={`dropdown-icon ${showDropdown ? 'rotate' : ''}`}>
          ▼
        </span>

        {showDropdown && (
          <div className="dropdown-menu">
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
