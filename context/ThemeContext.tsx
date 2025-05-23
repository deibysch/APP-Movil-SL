import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
}

const lightColors: ThemeColors = {
  primary: '#0F3460',
  secondary: '#9A1750',
  accent: '#E94560',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#DDDDDD',
  notification: '#0F3460',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#E53935',
};

const darkColors: ThemeColors = {
  primary: '#4C83C2',
  secondary: '#C74B7B',
  accent: '#FF6B8B',
  background: '#121212',
  card: '#1E1E1E',
  text: '#F5F5F5',
  textSecondary: '#BBBBBB',
  border: '#333333',
  notification: '#4C83C2',
  success: '#66BB6A',
  warning: '#FFCA28',
  error: '#EF5350',
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  const isDark = 
    theme === 'system' 
      ? systemColorScheme === 'dark'
      : theme === 'dark';

  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}