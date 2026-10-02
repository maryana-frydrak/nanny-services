import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Nanny } from "../types/nanny";

interface FavoritesState {
  favorites: Nanny[];
  addFavorite: (nanny: Nanny) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (nanny) =>
        set((state) => ({
          favorites: [...state.favorites, nanny],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((nanny) => nanny.id !== id),
        })),

      isFavorite: (id) => {
        return get().favorites.some((nanny) => nanny.id === id);
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
