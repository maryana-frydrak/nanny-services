import React from "react";
import type { Nanny } from "../../types/nanny";
import "./NannyCard.css";

interface NannyCardProps {
  nanny: Nanny;
}

export const NannyCard: React.FC<NannyCardProps> = ({ nanny }) => {
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
      </div>
      <div className="nanny-info">
        <div className="nanny-header-top">
          <div className="nanny-title-group">
            <span className="nanny-category">Nanny</span>
            <h3 className="nanny-name">{nanny.name}</h3>
          </div>

          <div className="nanny-meta">
            <span>
              <svg className="icon" width="16" height="16">
                <use href="/icons.svg#icon-map-pin" />
              </svg>
              {nanny.location}
            </span>
            <span>
              <svg className="icon" width="16" height="16">
                <use href="/icons.svg#icon-star" />
              </svg>
              Rating: {nanny.rating}
            </span>
            <span>
              Price / 1 hour:
              <span className="nanny-price">{nanny.price_per_hour}$</span>
            </span>
            <button
              type="button"
              className="favorite-btn"
              aria-label="Add to favorites"
            >
              <svg className="icon" width="26" height="26">
                <use href="/icons.svg#icon-heart-normal" />
              </svg>
            </button>
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
        </div>

        <div className="nanny-characters">
          <p>
            Characters:{" "}
            <span className="nanny-value">
              {nanny.characters
                .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
                .join(", ")}
            </span>
          </p>
        </div>

        <div className="nanny-education">
          <p>
            Education: <span className="nanny-value">{nanny.education}</span>
          </p>
        </div>

        <p className="nanny-about">{nanny.about}</p>

        <button type="button" className="read-more-btn">
          Read more
        </button>
      </div>
    </div>
  );
};
