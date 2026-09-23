import React from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void | Promise<void>;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Oops! Something went wrong. Please try again later.",
  onRetry,
}) => {
  return (
    <div className="error-container">
      <p className="error-message-text">{message}</p>
      {onRetry && (
        <button
          className="error-retry-btn"
          onClick={() => {
            if (onRetry) {
              onRetry();
            }
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
};
