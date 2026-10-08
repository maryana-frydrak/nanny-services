import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoginModal.css";
import { loginUser } from "../../services/auth";
import type { FirebaseErrorType } from "../../types/auth";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type LoginFormData = yup.InferType<typeof schema>;
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null);
      const user = await loginUser(data.email, data.password);

      const userName = user.displayName || user.email?.split("@")[0] || "User";

      onLogin(userName);
      reset();
      onClose();
    } catch (err: unknown) {
      console.error("Login error:", err);

      const error = err as FirebaseErrorType;

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setAuthError("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setAuthError("Too many login attempts. Please try again later.");
      } else if (typeof error.message === "string") {
        setAuthError(error.message);
      } else {
        setAuthError("An error occurred during login.");
      }
    }
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

        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
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
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          {authError && (
            <span className="error-text general-error">{authError}</span>
          )}

          <button type="submit" className="modal-submit-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
