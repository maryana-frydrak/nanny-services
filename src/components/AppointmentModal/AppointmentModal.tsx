import React, { useEffect, useState } from "react";
import type { Nanny } from "../../types/nanny";
import "./AppointmentModal.css";
import { addAppointment } from "../../services/nannies";
import { CloudAlert } from "lucide-react";
import {
  appointmentSchema,
  type AppointmentFormData,
} from "../../types/appointmentSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormPersist from "react-hook-form-persist";
import type { AppointmentPayload } from "../../types/appointment";

interface AppointmentModalProps {
  nanny: Nanny;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  nanny,
  onClose,
}) => {
  const [isOpenTime, setIsOpenTime] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  useFormPersist("appointment-form", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const [selectedTime, setSelectedTime] = useState<string>(() => {
    return localStorage.getItem("appointment-time") || "";
  });

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

  const onSubmit = async (data: AppointmentFormData) => {
    setError("");

    if (!selectedTime) {
      setError("Please select a meeting time");
      return;
    }

    const appointmentData: AppointmentPayload = {
      ...data,
      meetingTime: selectedTime,
      nannyId: nanny.id as string,
      nannyName: nanny.name as string,
    };

    try {
      await addAppointment(appointmentData);

      setSuccessMessage("Appointment successfully submitted!");

      localStorage.removeItem("appointment-form");
      localStorage.removeItem("appointment-time");
      reset();
      setSelectedTime("");

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setError("Failed to send appointment. Please try again.");
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

        <form className="appointment-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="appointment-form-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && (
                <p className="error-text">{errors.address.message}</p>
              )}
            </div>
            <div className="input-group">
              <input type="tel" placeholder="+380" {...register("phone")} />
              {errors.phone && (
                <p className="error-text">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="appointment-form-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="Child's age"
                {...register("childAge")}
              />
              {errors.childAge && (
                <p className="error-text">{errors.childAge.message}</p>
              )}
            </div>

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
                          localStorage.setItem("appointment-time", time);
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

          <div className="input-group">
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Father's or mother's name"
              {...register("parentName")}
            />
            {errors.parentName && (
              <p className="error-text">{errors.parentName.message}</p>
            )}
          </div>

          <div className="input-group">
            <textarea
              placeholder="Comment"
              rows={4}
              {...register("comment")}
            ></textarea>
          </div>

          <button type="submit" className="appointment-send-btn">
            Send
          </button>
        </form>

        {successMessage && (
          <div className="success-overlay">
            <div className="success-popup">
              <div className="success-icon">
                <svg className="icon-party-popper" width="48" height="48">
                  <use href="/icons.svg#icon-party-popper"></use>
                </svg>
              </div>
              <h3>Success!</h3>
              <p className="success-popup-text">{successMessage}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="error-overlay">
            <div className="error-popup">
              <div className="error-icon">
                <CloudAlert className="custom-error-icon" />
              </div>
              <h3>Something went wrong</h3>
              <p className="error-popup-text">{error}</p>
              <button
                type="button"
                className="submit-btn"
                onClick={() => setError("")}
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
