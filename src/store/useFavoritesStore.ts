import { create } from "zustand";
import type { Nanny } from "../types/nanny";

interface FavoritesState {
  favorites: Nanny[];
  loadUserFavorites: (userId: string) => void;
  clearFavoritesOnLogout: () => void;
  addFavorite: (nanny: Nanny, userId?: string) => void;
  removeFavorite: (id: string, userId?: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  loadUserFavorites: (userId: string) => {
    if (!userId) return;
    const stored = localStorage.getItem(`favorites_${userId}`);
    if (stored) {
      try {
        set({ favorites: JSON.parse(stored) });
      } catch (e) {
        console.error("Failed to parse favorites from storage", e);
        set({ favorites: [] });
      }
    } else {
      set({ favorites: [] });
    }
  },

  clearFavoritesOnLogout: () => {
    set({ favorites: [] });
  },

  addFavorite: (nanny: Nanny, userId?: string) => {
    if (!userId) return;

    const current = get().favorites;
    const nannyId = nanny.id || nanny.name;
    const exists = current.some((item) => (item.id || item.name) === nannyId);

    if (exists) return;

    const updated = [...current, nanny];
    set({ favorites: updated });
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));
  },

  removeFavorite: (id: string, userId?: string) => {
    if (!userId) return;

    const updated = get().favorites.filter(
      (nanny) => (nanny.id || nanny.name) !== id,
    );
    set({ favorites: updated });
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));
  },

  isFavorite: (id: string) => {
    return get().favorites.some((nanny) => (nanny.id || nanny.name) === id);
  },
}));
