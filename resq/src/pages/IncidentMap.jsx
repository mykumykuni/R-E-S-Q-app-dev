import IncidentsTable from '../components/IncidentsTable';

const IncidentMap = () => {
  const incidents = [
    {
      id: '#INC-001',
      type: 'Fire',
      location: 'Zone A - North',
      method: 'Heat Sensor',
      time: '09:15 AM',
      status: 'resolved'
    },
    {
      id: '#INC-002',
      type: 'Gas',
      location: 'Zone C - Lobby',
      method: 'Camera AI',
      time: '08:30 AM',
      status: 'investigating'
    }
  ];

  return (
    <>
      <IncidentsTable incidents={incidents} />
    </>
  );
};

export default IncidentMap;
