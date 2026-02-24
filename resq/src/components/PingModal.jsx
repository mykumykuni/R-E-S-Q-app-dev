import React from 'react';

const PingModal = ({
  isOpen,
  mode = 'view', // 'add' or 'view'
  coords,
  name,
  description,
  onClose,
  onSave,
  onRemove,
  onNameChange,
  onDescriptionChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {mode === 'add' ? (
          <>
            <h3>Add Ping</h3>
            <p>
              Coordinates: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </p>
            <div className="modal-form-grid">
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => onNameChange && onNameChange(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => onDescriptionChange && onDescriptionChange(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-add" onClick={onSave}>
                Save
              </button>
              <button className="btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3>Ping Details</h3>
            <p>Name: {name || '—'}</p>
            <p>
              Coordinates: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </p>
            <p>Description: {description}</p>
            <div className="modal-actions">
              <button className="btn" onClick={onClose}>
                Close
              </button>
              {onRemove && (
                <button className="btn btn-delete" onClick={onRemove}>
                  Remove
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PingModal;
