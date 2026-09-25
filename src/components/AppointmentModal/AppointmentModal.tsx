import React from "react";
import type { Nanny } from "../../types/nanny";
import "./AppointmentModal.css";

interface AppointmentModalProps {
  nanny: Nanny;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  nanny,
  onClose,
}) => {
  return (
    <div className="appointment-modal-backdrop" onClick={onClose}>
      <div
        className="appointment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Make an appointment with a babysitter</h2>
        <p className="appointment-modal-subtitle">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

        {/* Інформація про няню з макета */}
        <div className="appointment-modal-nanny-info">
          <img
            src={nanny.avatar_url}
            alt={nanny.name}
            className="appointment-modal-nanny-avatar"
          />
          <div>
            <span className="appointment-modal-nanny-label">Your nanny</span>
            <h4 className="appointment-modal-nanny-name">{nanny.name}</h4>
          </div>
        </div>

        {/* Форма */}
        <form className="appointment-form" onSubmit={(e) => e.preventDefault()}>
          <div className="appointment-form-row">
            <input type="text" placeholder="Address" required />
            <input type="tel" placeholder="+380" required />
          </div>

          <div className="appointment-form-row">
            <input type="text" placeholder="Child's age" required />
            {/* Тимчасово для прикладу годин */}
            <input type="text" placeholder="Meeting time" required />
          </div>

          <div className="appointment-form-row">
            <input type="email" placeholder="Email" required />
            <input
              type="text"
              placeholder="Father's or mother's name"
              required
            />
          </div>

          <textarea placeholder="Comment" rows={4}></textarea>

          <button type="submit" className="appointment-send-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
