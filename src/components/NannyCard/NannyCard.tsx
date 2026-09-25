import React, { useState } from "react";
import type { Nanny } from "../../types/nanny";
import "./NannyCard.css";

interface NannyCardProps {
  nanny: Nanny;
  onOpenAppointment: () => void;
}

export const NannyCard: React.FC<NannyCardProps> = ({
  nanny,
  onOpenAppointment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? 0 : age;
  };

  return (
    <div className="nanny-card">
      <div className="nanny-avatar-wrapper">
        <img src={nanny.avatar_url} alt={nanny.name} className="nanny-avatar" />
        <span className="online-indicator"></span>
      </div>
      <div className="nanny-info">
        <div className="nanny-header-top">
          <div className="nanny-title-group">
            <span className="nanny-category">Nanny</span>
            <h3 className="nanny-name">{nanny.name}</h3>
          </div>

          <div className="nanny-meta">
            <span className="nanny-meta-item">
              <svg className="icon icon-location" width="16" height="16">
                <use href="/icons.svg#icon-map-pin" />
              </svg>
              {nanny.location}
            </span>
            <span className="nanny-meta-item">
              <svg className="icon icon-star" width="16" height="16">
                <use href="/icons.svg#icon-star" />
              </svg>
              Rating: {nanny.rating}
            </span>
            <span className="nanny-meta-item">
              Price / 1 hour:
              <span className="nanny-price">{nanny.price_per_hour}$</span>
              <button
                type="button"
                className="favorite-btn"
                aria-label="Add to favorites"
              >
                <svg className="icon icon-heart" width="26" height="26">
                  <use href="/icons.svg#icon-heart-normal" />
                </svg>
              </button>
            </span>
          </div>
        </div>

        <div className="nanny-details">
          <p>
            Age:
            <span className="nanny-value">{calculateAge(nanny.birthday)}</span>
          </p>
          <p>
            Experience:<span className="nanny-value">{nanny.experience}</span>
          </p>
          <p>
            Kids Age: <span className="nanny-value">{nanny.kids_age}</span>
          </p>
          <p>
            Characters:{" "}
            <span className="nanny-value">
              {nanny.characters
                .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                .join(", ")}
            </span>
          </p>
          <p>
            Education: <span className="nanny-value">{nanny.education}</span>
          </p>
        </div>

        <p className="nanny-about">{nanny.about}</p>

        <button
          type="button"
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide reviews" : "Read more"}
        </button>
        {isExpanded && (
          <div className="nanny-reviews-section">
            <ul className="reviews-list">
              {nanny.reviews.map((review, index) => (
                <li key={index} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-avatar-placeholder">
                      {review.reviewer.charAt(0)}
                    </div>
                    <div className="reviewer-meta">
                      <h4 className="reviewer-name">{review.reviewer}</h4>
                      <p className="review-rating">
                        <svg className="icon icon-star" width="16" height="16">
                          <use href="/icons.svg#icon-star" />
                        </svg>
                        {review.rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="make-appointment-btn"
              onClick={() => {
                onOpenAppointment();
              }}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
