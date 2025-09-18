// app/tabs/FavoritesContext.js
import { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (joke) => setFavorites([...favorites, joke]);
  const removeFavorite = (joke) =>
    setFavorites(favorites.filter((f) => f !== joke));

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
