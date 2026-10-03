import { useEffect, useState } from "react";
import { fetchNannies, getFilteredAndSortedNannies } from "../services/nannies";
import type { Nanny } from "../types/nanny";
import "./NanniesPage.css";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { Loader } from "../components/Loader/Loader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { AppointmentModal } from "../components/AppointmentModal/AppointmentModal";
import { Filter } from "../components/Filter/Filter";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState("A to Z");

  const [visibleCount, setVisibleCount] = useState(3);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);

  const handleOpenModal = (nanny: Nanny) => {
    setSelectedNanny(nanny);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNanny(null);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNannies();
      setNannies(data);
      console.log("Fetched nannies from Firebase:", data);
    } catch (err) {
      setError("Failed to load nannies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const filteredNannies = getFilteredAndSortedNannies(nannies, selectedFilter);

  return (
    <main className="nannies-page">
      <div className="nannies-page-container">
        <div className="nannies-header-section">
          <Filter
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
          />
        </div>

        <div className="nannies-content">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error!} onRetry={loadData} />
          ) : filteredNannies.length > 0 ? (
            <>
              <div className="nannies-list">
                {filteredNannies.slice(0, visibleCount).map((nanny) => (
                  <NannyCard
                    key={nanny.id || nanny.name}
                    nanny={nanny}
                    onOpenAppointment={() => handleOpenModal(nanny)}
                  />
                ))}
              </div>

              {visibleCount < filteredNannies.length && (
                <button
                  type="button"
                  className="load-more-btn"
                  onClick={handleLoadMore}
                >
                  Load more
                </button>
              )}
            </>
          ) : (
            <ErrorMessage message="No nannies found in the database." />
          )}

          {isModalOpen && selectedNanny && (
            <AppointmentModal
              nanny={selectedNanny}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </main>
  );
}
