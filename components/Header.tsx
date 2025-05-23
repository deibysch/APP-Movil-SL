import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useSidebar } from '@/context/SidebarContext';
import { Menu, Search, Bell, User, X } from 'lucide-react-native';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { colors, isDark } = useTheme();
  const { toggleSidebar } = useSidebar();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingHorizontal: 16,
      height: Platform.OS === 'web' ? 64 : 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuButton: {
      padding: 8,
      marginRight: 16,
    },
    logo: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 20,
      color: colors.text,
      marginRight: 32,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    searchContainer: {
      position: 'relative',
      marginRight: 16,
    },
    searchBar: {
      height: 36,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingLeft: 36,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      width: isSearchActive ? 300 : 200,
      transition: 'width 0.3s ease',
    },
    searchIcon: {
      position: 'absolute',
      left: 8,
      top: 6,
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    },
    notificationBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: colors.error,
      width: 16,
      height: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: '#fff',
      fontSize: 10,
      fontFamily: 'Inter-Medium',
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Menu size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.logo}>LegalTech Pro</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.searchContainer}>
          <Search size={24} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar..."
            placeholderTextColor={colors.textSecondary}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Bell size={20} color={colors.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <User size={20} color={colors.text} />
        </TouchableOpacity>

        <ThemeToggle />
      </View>
    </View>
  );
}