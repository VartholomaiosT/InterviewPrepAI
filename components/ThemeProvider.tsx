import React from 'react';
import { useThemeStore } from '../stores/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useThemeStore();
  return <>{children}</>;
}
