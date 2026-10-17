import React, { useEffect } from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void | Promise<void>;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Oops! Something went wrong. Please try again later.",
  onRetry,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="error-container" onClick={onClose}>
      <div className="error-content-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn error-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <p className="error-message-text">{message}</p>

        <button className="error-retry-btn" onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
};
