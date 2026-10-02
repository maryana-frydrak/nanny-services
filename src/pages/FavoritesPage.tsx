import { useState } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { AppointmentModal } from "../components/AppointmentModal/AppointmentModal";
import type { Nanny } from "../types/nanny";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();

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

  return (
    <div className="favorites-page">
      {favorites.length === 0 ? (
        <p className="no-favorites-text">No favorite nannies yet.</p>
      ) : (
        <ul className="nannies-list">
          {favorites.map((nanny) => (
            <NannyCard
              key={nanny.id}
              nanny={nanny}
              onOpenAppointment={() => handleOpenAppointment(nanny)}
            />
          ))}
        </ul>
      )}

      {isModalOpen && selectedNanny && (
        <AppointmentModal nanny={selectedNanny} onClose={handleCloseModal} />
      )}
    </div>
  );
}
