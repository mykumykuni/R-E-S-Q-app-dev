import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// create a custom icon using imported asset URLs to ensure Vite bundles them
const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// assign it globally so any <Marker> uses it by default
L.Marker.prototype.options.icon = defaultIcon;

import '../styles/IncidentMap.css';
import '../styles/IncidentsTable.css'; // reuse modal styles
import PingModal from '../components/PingModal';
import PingList from '../components/PingList';

const IncidentMap = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalCoords, setModalCoords] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);

  // store map instance so we can pan programmatically
  const mapRef = useRef(null);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setModalCoords(e.latlng);
        setNewName('');
        setNewDescription('');
        setIsAddModalOpen(true);
      },
    });
    return null;
  }

  const handleAddMarker = () => {
    if (!modalCoords) return;
    const id = Date.now();
    setMarkers(prev => [...prev, { id, lat: modalCoords.lat, lng: modalCoords.lng, name: newName, description: newDescription }]);
    setIsAddModalOpen(false);
    setModalCoords(null);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const closeViewModal = () => setSelectedMarker(null);

  const handleLocateMarker = (marker) => {
    if (mapRef.current) {
      // ensure the map view moves to the marker coordinates
      mapRef.current.setView([marker.lat, marker.lng], mapRef.current.getZoom());
    }
    setSelectedMarker(marker);
  };

  const handleRemoveMarker = (marker) => {
    setMarkers(prev => prev.filter(m => m.id !== marker.id));
    if (selectedMarker && selectedMarker.id === marker.id) {
      setSelectedMarker(null);
    }
  };

  return (
    <div className="incident-map-container">
      <div className="incident-map-header">
        <h2>Live Incident Map</h2>
      </div>

      <div className="incident-map-view">
        <MapContainer
          whenCreated={map => { mapRef.current = map; }}
          center={[8.4542, 124.6319]} // default Cagayan de Oro center
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />
          {markers.map(m => (
            <Marker
              key={m.id}
              position={[m.lat, m.lng]}
              eventHandlers={{
                click: () => handleMarkerClick(m),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* ping list below map */}
      <PingList
        markers={markers}
        onLocate={handleLocateMarker}
        onRemove={handleRemoveMarker}
      />

      <PingModal
        isOpen={isAddModalOpen}
        mode="add"
        coords={modalCoords || { lat: 0, lng: 0 }}
        name={newName}
        description={newDescription}
        onClose={() => setIsAddModalOpen(false)}
        onNameChange={setNewName}
        onDescriptionChange={setNewDescription}
        onSave={handleAddMarker}
      />

      <PingModal
        isOpen={!!selectedMarker}
        mode="view"
        coords={selectedMarker || { lat: 0, lng: 0 }}
        name={selectedMarker?.name}
        description={selectedMarker?.description}
        onClose={closeViewModal}
        onRemove={() => {
          handleRemoveMarker(selectedMarker);
        }}
      />
    </div>
  );
};

export default IncidentMap;
