import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Make Life Easier for the Family:</h1>
          <p>Find Babysitters Online for All Occasions</p>
          <Link to="/nannies" className="hero-button">
            Get started
            <svg className="icon-up-right" width="14" height="16">
              <use href="/icons.svg#icon-arrow-up-right" />
            </svg>
            <svg className="icon-right" width="16" height="16">
              <use href="/icons.svg#icon-arrow-right" />
            </svg>
          </Link>
        </div>
        <div className="hero-image-container">
          <div className="hero-badge">
            <div className="badge-icon">
              <svg width="30" height="30">
                <use href="/icons.svg#icon-check" />
              </svg>
            </div>
            <div className="badge-content">
              <span className="badge-title">Experienced nannies</span>
              <span className="badge-count">15,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
