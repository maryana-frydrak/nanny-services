import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../services/auth";
import "./RegistrationModal.css";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (name: string) => void;
}

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);

      await registerUser(data.name, data.email, data.password);

      console.log("User registered successfully");
      onRegister(data.name);
      reset();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Registration error:", err.message);
        setServerError(err.message);
      } else {
        console.error("Registration error:", err);
        setServerError("An unexpected error occurred");
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

        <h2 className="modal-title">Registration</h2>
        <p className="modal-subtitle">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>

        <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <input type="text" placeholder="Name" {...register("name")} />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="input-wrapper">
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="input-wrapper password-wrapper">
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
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="error-text server-error">{serverError}</p>
          )}

          <button
            type="submit"
            className="modal-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
