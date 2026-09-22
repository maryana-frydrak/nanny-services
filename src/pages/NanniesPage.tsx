import { useEffect, useState } from "react";
import { fetchNannies } from "../services/nannies";
import type { Nanny } from "../types/nanny";
import "./NanniesPage.css";
import { NannyCard } from "../components/NannyCard/NannyCard";
import { Loader } from "../components/Loader/Loader";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNannies();
      setNannies(data);
    } catch (err) {
      setError("Failed to load nannies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchNannies();
      setNannies(data);
      setLoading(false);
      console.log("Fetched nannies from Firebase:", data); // Перевіримо в консолі
    };

    loadData();
  }, []);

  return (
    <main className="nannies-page">
      <div className="container">
        <div className="nannies-header-section">
          <h2>Nannies Catalog</h2>
        </div>

        <div className="nannies-content">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error!} onRetry={loadData} />
          ) : nannies.length > 0 ? (
            <div className="nannies-list">
              {nannies.map((nanny) => (
                <NannyCard key={nanny.id || nanny.name} nanny={nanny} />
              ))}
            </div>
          ) : (
            <p>Нянь не знайдено в базі даних.</p>
          )}
        </div>
      </div>
    </main>
  );
}
