import React from "react";
import type { Nanny } from "../../types/nanny";
import "./NannyCard.css";

interface NannyCardProps {
  nanny: Nanny;
}

export const NannyCard: React.FC<NannyCardProps> = ({ nanny }) => {
  return (
    <div className="nanny-card">
      <div className="nanny-avatar-wrapper">
        <img src={nanny.avatar_url} alt={nanny.name} className="nanny-avatar" />
      </div>
      <div className="nanny-info">
        <span className="nanny-category">Nanny</span>
        <h3 className="nanny-name">{nanny.name}</h3>

        <div className="nanny-details">
          <p>Age: {nanny.birthday}</p>
          <p>Experience: {nanny.experience}</p>
          <p>Kids Age: {nanny.kids_age}</p>
          <p>
            Price per hour: <span>{nanny.price_per_hour}$</span>
          </p>
        </div>

        <p className="nanny-about">{nanny.about}</p>
      </div>
    </div>
  );
};
