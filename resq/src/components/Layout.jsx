import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <Header onLogout={onLogout} />
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
