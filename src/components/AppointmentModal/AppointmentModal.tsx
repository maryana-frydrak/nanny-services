import React, { useEffect, useState } from "react";
import type { Nanny } from "../../types/nanny";
import "./AppointmentModal.css";
import { addAppointment } from "../../services/nannies";

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
  // const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState(
    "Failed to send appointment. Please try again.",
  );

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedTime) {
      setError("Please select a meeting time");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const appointmentData = {
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      childAge: formData.get("childAge") as string,
      email: formData.get("email") as string,
      parentName: formData.get("parentName") as string,
      comment: (formData.get("comment") as string) || "",
      meetingTime: selectedTime,
      nannyId: nanny.id as string,
      nannyName: nanny.name as string,
    };

    try {
      await addAppointment(appointmentData);

      setSuccessMessage("Appointment successfully submitted!");
      setIsSubmitting(false);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError("Failed to send appointment. Please try again.");
      setIsSubmitting(false);
    }
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

          {/* {error && <p className="error-text">{error}</p>} */}

          {/* {successMessage && <p className="success-text">{successMessage}</p>} */}

          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Father's or mother's name" required />

          <textarea placeholder="Comment" rows={4}></textarea>

          <button type="submit" className="appointment-send-btn">
            Send
          </button>
        </form>

        {successMessage && (
          <div className="success-overlay">
            <div className="success-popup">
              <div className="success-icon">🎉</div>
              <h3>Success!</h3>
              <p>{successMessage}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="success-overlay">
            <div className="success-popup">
              <div className="success-icon">❌</div>
              <h3 style={{ color: "#e74c3c" }}>Error!</h3>
              <p>{error}</p>
              <button
                type="button"
                className="submit-btn"
                onClick={() => setError("")}
                style={{ marginTop: "20px" }}
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
