import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react-native';

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();
  
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} color={colors.text} />;
      case 'dark':
        return <Moon size={20} color={colors.text} />;
      case 'system':
        return <Laptop size={20} color={colors.text} />;
      default:
        return <Sun size={20} color={colors.text} />;
    }
  };
  
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        { backgroundColor: colors.background }
      ]}
    >
      {getIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});