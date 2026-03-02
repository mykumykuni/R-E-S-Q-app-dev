import { Outlet } from 'react-router-dom';
import '../styles/Dashboard.css';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ onLogout, alerts, onAcknowledgeAlert }) => {
  return (
    <div className="dashboard-container">
      <Header
        onLogout={onLogout}
        alerts={alerts}
        onAcknowledgeAlert={onAcknowledgeAlert}
      />
      <main className="dashboard-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
