import "./Header.css";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  userEmail: string;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}

export default function Header({
  isLoggedIn,
  userEmail,
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

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/nannies">Nannies</Link>
        {isLoggedIn && <Link to="/favorites">Favorites</Link>}
      </nav>

      <div className="header-actions">
        {isLoggedIn ? (
          <div className="user-menu">
            <span className="user-email">{userEmail}</span>
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
    </header>
  );
}
