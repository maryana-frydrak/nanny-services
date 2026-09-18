import React from "react";
import "./LogoutModal.css";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content logout-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="32" height="32">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <h2 className="modal-title">Log out</h2>
        <p className="modal-subtitle">
          Are you sure you want to log out? You will need to sign in again to
          access your account.
        </p>

        <div className="logout-buttons-wrapper">
          <button
            type="button"
            className="modal-submit-btn confirm-btn"
            onClick={onConfirm}
          >
            Log out
          </button>
          <button
            type="button"
            className="modal-submit-btn cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
