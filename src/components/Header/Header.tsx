import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Palette } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const changeTheme = (themeName: string) => {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("app-theme", themeName);
    setIsThemeOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".theme-dropdown-container") &&
        !target.closest(".mobile-theme-container")
      ) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <header className={`header ${isHome ? "home" : "inner"}`}>
      <Link to="/" className="header-logo">
        Nanny.Services
      </Link>

      <div className={`header-right ${isMobileMenuOpen ? "open" : ""}`}>
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

      <button
        type="button"
        className="burger-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} />
      </button>

      <div className={`mobile-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="container mobile-menu-container">
          <button
            type="button"
            className="mobile-menu-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg width="24" height="24" className="mobile-menu-close-icon">
              <use href="/icons.svg#icon-close" />
            </svg>
          </button>

          <nav className="mobile-menu-navigation">
            <NavLink to="/" className="mobile-nav-link">
              Home
            </NavLink>
            <NavLink to="/nannies" className="mobile-nav-link">
              Nannies
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className="mobile-nav-link">
                Favorites
              </NavLink>
            )}
          </nav>

          <div className="mobile-theme-container">
            <button
              type="button"
              className="theme-toggle-btn mobile-theme-btn"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              aria-label="Toggle theme menu"
            >
              <Palette size={20} />
            </button>

            {isThemeOpen && (
              <div className="theme-dropdown-menu mobile-theme-dropdown">
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

          <div className="mobile-menu-bottom">
            <div className="mobile-auth-actions">
              {isLoggedIn ? (
                <div className="user-menu mobile-user-menu">
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
                <div className="auth-buttons mobile-auth-buttons">
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
        </div>
      </div>
    </header>
  );
}
