import { useEffect, useState } from "react";
import { fetchNannies } from "../services/nannies";
import type { Nanny } from "../types/nanny";
import "./NanniesPage.css";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { Loader } from "../components/Loader/Loader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { AppointmentModal } from "../components/AppointmentModal/AppointmentModal";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setIsOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const getFilteredAndSortedNannies = () => {
    let result = [...nannies];

    switch (selectedFilter) {
      case "A to Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Less than 10$":
        result = result.filter((nanny) => nanny.price_per_hour < 10);
        break;
      case "Greater than 10$":
        result = result.filter((nanny) => nanny.price_per_hour > 10);
        break;
      case "Popular":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Not popular":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "Show all":
      default:
        break;
    }

    return result;
  };

  const filteredNannies = getFilteredAndSortedNannies();

  return (
    <main className="nannies-page">
      <div className="container">
        <div className="nannies-header-section">
          <div className="filter-container">
            <span className="filter-label">Filters</span>
            <div className="dropdown-wrapper">
              <button
                type="button"
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>{selectedFilter}</span>
                <svg className="dropdown-icon" width="20" height="20">
                  <use href="/icons.svg#icon-chevron-down" />
                </svg>
              </button>

              {isOpen && (
                <ul className="dropdown-list">
                  <li onClick={() => handleSelect("A to Z")}>A to Z</li>
                  <li onClick={() => handleSelect("Z to A")}>Z to A</li>
                  <li onClick={() => handleSelect("Less than 10$")}>
                    Less than 10$
                  </li>
                  <li onClick={() => handleSelect("Greater than 10$")}>
                    Greater than 10$
                  </li>
                  <li onClick={() => handleSelect("Popular")}>Popular</li>
                  <li onClick={() => handleSelect("Not popular")}>
                    Not popular
                  </li>
                  <li onClick={() => handleSelect("Show all")}>Show all</li>
                </ul>
              )}
            </div>
          </div>
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
