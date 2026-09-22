import "./Header.css";
import { Link, NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}

export default function Header({
  isLoggedIn,
  userName,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}: HeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className={`header ${isHome ? "home" : "inner"}`}>
      <Link to="/" className="header-logo">
        Nanny.Services
      </Link>

      <div className="header-right">
        <nav className="header-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/nannies"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Nannies
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>
        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-avatar-wrapper">
                <svg width="24" height="24">
                  <use href="/icons.svg#icon-user" />
                </svg>
              </div>
              <span className="user-name">{userName}</span>
              <button onClick={onLogout} className="btn-logout">
                Log out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={onOpenLogin} className="btn-login">
                Log in
              </button>
              <button onClick={onOpenRegister} className="btn-register">
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
