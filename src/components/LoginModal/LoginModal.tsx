import React, { useState } from "react";
import "./LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onLogin();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="32" height="32">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <h2 className="modal-title">Log In</h2>
        <p className="modal-subtitle">
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg width="20" height="20">
                <use
                  href={`/icons.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`}
                />
              </svg>
            </button>
          </div>

          <button type="submit" className="modal-submit-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
