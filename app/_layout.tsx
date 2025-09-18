import { Stack } from 'expo-router';
import React from 'react';
import { FavoritesProvider } from './tabs/FavoritesContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }} />
      {children}
    </FavoritesProvider>
  );
}
