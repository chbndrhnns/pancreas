"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import foodData from '@/data/food-items.json';

type FavoritesContextType = {
  favorites: Set<string>;
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialize with favorites from the data
  const initialFavorites = new Set(
    foodData.foodItems
      .filter(item => item.isFavorite)
      .map(item => item.name)
  );
  
  const [favorites, setFavorites] = useState<Set<string>>(initialFavorites);

  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(name)) {
        newFavorites.delete(name);
      } else {
        newFavorites.add(name);
      }
      return newFavorites;
    });
  };

  const isFavorite = (name: string) => favorites.has(name);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}