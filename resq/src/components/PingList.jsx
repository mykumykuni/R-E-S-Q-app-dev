import React from 'react';

const PingList = ({ markers = [], onLocate, onRemove }) => {
  if (markers.length === 0) {
    return <p className="no-pings">No pings yet</p>;
  }

  return (
    <div className="ping-list">
      <table className="incidents-table ping-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Coordinates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {markers.map(m => (
            <tr key={m.id}>
              <td>{m.name || '-'}</td>
              <td>{m.description || '-'}</td>
              <td>{m.lat.toFixed(3)}, {m.lng.toFixed(3)}</td>
              <td>
                <button className="btn btn-show" onClick={() => onLocate(m)}>
                  Show
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => onRemove(m)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PingList;
