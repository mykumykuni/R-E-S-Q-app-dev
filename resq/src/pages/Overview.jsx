import { useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import AlertsList from '../components/AlertsList';
import SystemStatus from '../components/SystemStatus';

const Overview = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Fire Detected - Zone A',
      location: 'Sector 4 - Warehouse',
      time: '10:42 AM',
      priority: 'high-priority'
    },
    {
      id: 2,
      title: 'Gas Detected - Zone B',
      location: 'Office Block 2',
      time: '10:45 AM',
      priority: 'medium-priority'
    }
  ]);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <>
      <SummaryCards />
      <AlertsList alerts={alerts} onAcknowledge={handleAcknowledge} />
      <SystemStatus />
    </>
  );
};

export default Overview;
