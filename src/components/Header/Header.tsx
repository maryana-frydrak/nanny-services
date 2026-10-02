import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Palette } from "lucide-react";

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

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const changeTheme = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("app-theme", themeName);
    setIsThemeOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="theme-dropdown-container" ref={themeDropdownRef}>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            aria-label="Toggle theme menu"
          >
            <Palette size={20} />
          </button>

          {isThemeOpen && (
            <div className="theme-dropdown-menu">
              <button
                type="button"
                className="theme-option red"
                onClick={() => changeTheme("red")}
              >
                <span className="theme-badge">Red</span>
              </button>
              <button
                type="button"
                className="theme-option blue"
                onClick={() => changeTheme("blue")}
              >
                <span className="theme-badge">Blue</span>
              </button>
              <button
                type="button"
                className="theme-option green"
                onClick={() => changeTheme("green")}
              >
                <span className="theme-badge">Green</span>
              </button>
            </div>
          )}
        </div>

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
