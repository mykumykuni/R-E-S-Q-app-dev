import IncidentsTable from '../components/IncidentsTable';
import dashboardData from '../data/dashboardData.json';

const IncidentMap = () => {
  const { incidents } = dashboardData;

  return (
    <>
      <IncidentsTable incidents={incidents} />
    </>
  );
};

export default IncidentMap;
