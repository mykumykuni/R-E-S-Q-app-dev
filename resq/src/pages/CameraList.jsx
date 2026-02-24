import CamerasTable from '../components/CamerasTable';
import camerasData from '../data/cameras.json';

const CameraList = () => {
  return <CamerasTable cameras={camerasData} />;
};

export default CameraList;