import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NanniesPage from "./pages/NanniesPage";
import FavoritesPage from "./pages/FavoritesPage";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail="Ilona"
        onOpenLogin={() => setIsLoggedIn(true)}
        onOpenRegister={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nannies" element={<NanniesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
