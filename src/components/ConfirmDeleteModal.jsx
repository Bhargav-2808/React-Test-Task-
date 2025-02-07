import React from 'react';
import '../styles.css';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="modal-actions">
          <button className="delete-btn" onClick={onConfirm}>Yes</button>
          <button className="details-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
