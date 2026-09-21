import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NanniesPage from "./pages/NanniesPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header/Header";
import { useState } from "react";
import { LoginModal } from "./components/LoginModal/LoginModal";
import RegistrationModal from "./components/RegistrationModal/RegistrationModal";
import LogoutModal from "./components/LogoutModal/LogoutModal";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
        onLogout={() => setIsLogoutModalOpen(true)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setUserName("User");
          setIsLoginModalOpen(false);
          navigate("/nannies");
        }}
      />

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={(name) => {
          setIsLoggedIn(true);
          setUserName(name);
          setIsRegisterModalOpen(false);
          navigate("/nannies");
        }}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLoggedIn(false);
          setUserName("");
          setIsLogoutModalOpen(false);
          navigate("/");
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nannies" element={<NanniesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
