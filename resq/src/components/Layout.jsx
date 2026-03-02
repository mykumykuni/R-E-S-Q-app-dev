import { Outlet } from 'react-router-dom';
import '../styles/Dashboard.css';
import Header from './Header';
import Footer from './Footer';

const Layout = ({
  onLogout,
  alerts,
  onAcknowledgeAlert,
  roleLabel = 'Admin',
  navItems = [],
  canAcknowledgeAlerts = true,
}) => {
  return (
    <div className="dashboard-container">
      <Header
        onLogout={onLogout}
        alerts={alerts}
        onAcknowledgeAlert={onAcknowledgeAlert}
        roleLabel={roleLabel}
        navItems={navItems}
        canAcknowledgeAlerts={canAcknowledgeAlerts}
      />
      <main className="dashboard-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
