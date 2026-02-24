import { useState, useEffect } from 'react';
import '../styles/CamerasTable.css';

const CamerasTable = ({ cameras }) => {
  const [data, setData] = useState(cameras || []);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCamera, setNewCamera] = useState({
    name: '',
    location: '',
    status: 'online'
  });
  const [errors, setErrors] = useState({});

  // Load from props or localStorage
  useEffect(() => {
    if (cameras && cameras.length) {
      setData(cameras);
      localStorage.setItem('cameras', JSON.stringify(cameras));
    } else {
      const stored = localStorage.getItem('cameras');
      if (stored) setData(JSON.parse(stored));
    }
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem('cameras', JSON.stringify(data));
  }, [data]);

  // Update "online duration" every second
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData =>
        prevData.map(cam => {
          if (cam.status === 'online') {
            const last = new Date(cam.lastActive).getTime();
            const now = new Date().getTime();
            const diffMs = now - last;
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
            return {
              ...cam,
              onlineDuration: `${hours}h ${mins}m ${secs}s`
            };
          } else {
            // Keep previous onlineDuration if offline
            return { ...cam };
          }
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateNextCameraId = () => {
    const max = data.reduce((max, cam) => {
      const num = parseInt(cam.id?.replace('CAM-', '') || 0);
      return Math.max(max, num);
    }, 0);
    return `CAM-${String(max + 1).padStart(3, '0')}`;
  };

  const handleAddCamera = () => {
    const newErrors = {};
    if (!newCamera.name.trim()) newErrors.name = 'Name is required';
    if (!newCamera.location.trim()) newErrors.location = 'Location is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const camera = {
      id: generateNextCameraId(),
      ...newCamera,
      lastActive: new Date().toLocaleString(),
      onlineDuration: '0h 0m 0s' // start counter at 0
    };

    setData([camera, ...data]);
    setNewCamera({ name: '', location: '', status: 'online' });
    setErrors({});
    setIsAddModalOpen(false);
  };

  const filtered = data.filter(cam => {
    const q = search.toLowerCase();
    const matchesSearch =
      cam.id.toLowerCase().includes(q) ||
      cam.name.toLowerCase().includes(q) ||
      cam.location.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'all' || cam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="dashboard-section history-section">
      <h2>Camera List</h2>

      <div className="cameras-controls">
        <input
          type="text"
          className="cameras-search"
          placeholder="Search cameras..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="cameras-filter"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <button className="btn btn-add" onClick={() => setIsAddModalOpen(true)}>
          Add Camera
        </button>
      </div>

      <table className="cameras-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Active</th>
            <th>Online Duration</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map(cam => (
              <tr key={cam.id}>
                <td>{cam.id}</td>
                <td>{cam.name}</td>
                <td>{cam.location}</td>
                <td>
                  <span className={`camera-status ${cam.status}`}>
                    {cam.status}
                  </span>
                </td>
                <td>{cam.lastActive}</td>
                <td>{cam.status === 'online' ? cam.onlineDuration : '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No cameras found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ADD CAMERA MODAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Camera</h3>

            <div className="modal-form-grid">
              <div className="field">
                <label>Name</label>
                <input
                  value={newCamera.name}
                  onChange={(e) =>
                    setNewCamera({ ...newCamera, name: e.target.value })
                  }
                />
                {errors.name && (
                  <div className="input-error">{errors.name}</div>
                )}
              </div>

              <div className="field">
                <label>Location</label>
                <input
                  value={newCamera.location}
                  onChange={(e) =>
                    setNewCamera({ ...newCamera, location: e.target.value })
                  }
                />
                {errors.location && (
                  <div className="input-error">{errors.location}</div>
                )}
              </div>

              <div className="field field-full">
                <label>Status</label>
                <select
                  value={newCamera.status}
                  onChange={(e) =>
                    setNewCamera({ ...newCamera, status: e.target.value })
                  }
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-add" onClick={handleAddCamera}>
                Save
              </button>
              <button
                className="btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CamerasTable;