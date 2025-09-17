// app/(tabs)/FavoritesContext.js
import { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (joke) => { if (!favorites.includes(joke)) setFavorites([...favorites, joke]); };
  const removeFavorite = (joke) => setFavorites(favorites.filter((item) => item !== joke));
  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
