// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { ReactNode } from 'react';
import { FavoritesProvider } from './tabs/FavoritesContext';

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {children}
      </Stack>
    </FavoritesProvider>
  );
}
