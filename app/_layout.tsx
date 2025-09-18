// app/_layout.tsx
import { Stack } from 'expo-router';
import { FavoritesProvider } from './tabs/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FavoritesProvider>
  );
}
