import { useEffect, useState } from "react";
import { fetchNannies } from "../services/nannies";
import type { Nanny } from "../types/nanny";
import "./NanniesPage.css";

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState(true);

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
            <p>Завантаження нянь...</p>
          ) : nannies.length > 0 ? (
            <p>Успішно завантажено нянь: {nannies.length}. Дивіться консоль!</p>
          ) : (
            <p>Нянь не знайдено в базі даних.</p>
          )}
        </div>
      </div>
    </main>
  );
}
