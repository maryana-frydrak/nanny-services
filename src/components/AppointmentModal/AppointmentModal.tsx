import React, { useEffect, useState } from "react";
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
  const [isOpenTime, setIsOpenTime] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedTime) {
      setError("Please select a meeting time");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const appointmentData = {
      address: formData.get("address"),
      phone: formData.get("phone"),
      childAge: formData.get("childAge"),
      email: formData.get("email"),
      parentName: formData.get("parentName"),
      comment: formData.get("comment"),
      meetingTime: selectedTime,
      nannyId: nanny.id,
      nannyName: nanny.name,
    };

    onClose();
  };

  return (
    <div className="appointment-modal-backdrop" onClick={onClose}>
      <div
        className="appointment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-btn" onClick={onClose}>
          <svg width="32" height="32">
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>

        <h2 className="appointment-modal-title">
          Make an appointment with a babysitter
        </h2>
        <p className="appointment-modal-subtitle">
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>

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

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="appointment-form-row">
            <input type="text" placeholder="Address" required />
            <input type="tel" placeholder="+380" required />
          </div>

          <div className="appointment-form-row">
            <input type="text" placeholder="Child's age" required />

            <div className="meeting-time-wrapper">
              <div
                className={`meeting-time-input ${selectedTime ? "is-selected" : ""}`}
                onClick={() => setIsOpenTime(!isOpenTime)}
              >
                <span
                  className={selectedTime ? "time-value" : "time-placeholder"}
                >
                  {selectedTime || "00:00"}
                </span>
                <span className="clock-icon">
                  <svg className="clock-icon" width="20" height="20">
                    <use href="/icons.svg#icon-clock"></use>
                  </svg>
                </span>
              </div>

              {isOpenTime && (
                <div className="time-dropdown">
                  <div className="time-dropdown-title">Meeting time</div>
                  <ul className="time-list">
                    {[
                      "09:00",
                      "09:30",
                      "10:00",
                      "10:30",
                      "11:00",
                      "11:30",
                      "12:00",
                    ].map((time) => (
                      <li
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setIsOpenTime(false);
                          setError("");
                        }}
                      >
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "#e03636",
                fontSize: "14px",
                margin: "-10px 0 10px 4px",
              }}
            >
              {error}
            </p>
          )}

          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Father's or mother's name" required />

          <textarea placeholder="Comment" rows={4}></textarea>

          <button type="submit" className="appointment-send-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
