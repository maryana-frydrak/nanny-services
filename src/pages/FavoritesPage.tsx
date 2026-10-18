import { useState } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { AppointmentModal } from "../components/AppointmentModal/AppointmentModal";
import type { Nanny } from "../types/nanny";
import "./FavoritesPage.css";
import { getFilteredAndSortedNannies } from "../services/nannies";
import { Filter } from "../components/Filter/Filter";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

  const [selectedFilter, setSelectedFilter] = useState("A to Z");

  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAppointment = (nanny: Nanny) => {
    setSelectedNanny(nanny);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNanny(null);
  };

  const filteredFavorites = getFilteredAndSortedNannies(
    favorites,
    selectedFilter,
  );

  return (
    <div className="favorites-page">
      <div className="favorites-page-container">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <h2 className="empty-title">You have no favorite nannies yet.</h2>
            <p className="empty-subtitle">Choose them right now.</p>
            <Link to="/nannies" className="go-to-nannies-btn">
              Go to nannies
            </Link>
          </div>
        ) : (
          <>
            <div className="nannies-header-section">
              <Filter
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
              />
            </div>
            <ul className="nannies-list">
              {filteredFavorites.map((nanny) => (
                <NannyCard
                  key={nanny.id}
                  nanny={nanny}
                  onOpenAppointment={() => handleOpenAppointment(nanny)}
                />
              ))}
            </ul>
          </>
        )}
        {isModalOpen && selectedNanny && (
          <AppointmentModal nanny={selectedNanny} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
