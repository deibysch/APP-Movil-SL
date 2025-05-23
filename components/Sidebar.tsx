import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useSidebar } from '@/context/SidebarContext';
import { useRouter, usePathname } from 'expo-router';
import { ChevronDown, ChevronRight, Users, ClipboardList, Clock, Building2 } from 'lucide-react-native';

export default function Sidebar() {
  const { colors, isDark } = useTheme();
  const { isExpanded, expandedSections, toggleSection } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const styles = StyleSheet.create({
    sidebar: {
      width: isExpanded ? 280 : 72,
      backgroundColor: colors.card,
      borderRightWidth: 1,
      borderRightColor: colors.border,
      height: Platform.OS === 'web' ? '100vh' : '100%',
      paddingTop: 16,
      transition: 'width 0.3s ease',
    },
    section: {
      marginBottom: 8,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    sectionTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: isExpanded ? 12 : 0,
      opacity: isExpanded ? 1 : 0,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 4,
    },
    activeMenuItem: {
      backgroundColor: `${colors.primary}10`,
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuItemText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
      marginLeft: 12,
      opacity: isExpanded ? 1 : 0,
    },
    activeMenuItemText: {
      color: colors.primary,
    },
    badge: {
      backgroundColor: `${colors.primary}20`,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      marginLeft: 8,
      opacity: isExpanded ? 1 : 0,
    },
    badgeText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.primary,
    },
  });

  const MenuItem = ({ 
    icon: Icon, 
    title, 
    path, 
    badge 
  }: { 
    icon: any, 
    title: string, 
    path: string,
    badge?: number 
  }) => (
    <TouchableOpacity
      style={[styles.menuItem, pathname === path && styles.activeMenuItem]}
      onPress={() => router.push(path)}
    >
      <View style={styles.menuItemContent}>
        <Icon 
          size={20} 
          color={pathname === path ? colors.primary : colors.text} 
        />
        {isExpanded && (
          <>
            <Text 
              style={[
                styles.menuItemText,
                pathname === path && styles.activeMenuItemText
              ]}
            >
              {title}
            </Text>
            {badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sidebar}>
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('clients')}
        >
          {isExpanded ? (
            expandedSections.includes('clients') ? (
              <ChevronDown size={20} color={colors.textSecondary} />
            ) : (
              <ChevronRight size={20} color={colors.textSecondary} />
            )
          ) : null}
          {isExpanded && (
            <Text style={styles.sectionTitle}>CLIENTES</Text>
          )}
        </TouchableOpacity>
        {(!isExpanded || expandedSections.includes('clients')) && (
          <MenuItem 
            icon={Users} 
            title="Todos los clientes" 
            path="/" 
            badge={12}
          />
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('processes')}
        >
          {isExpanded ? (
            expandedSections.includes('processes') ? (
              <ChevronDown size={20} color={colors.textSecondary} />
            ) : (
              <ChevronRight size={20} color={colors.textSecondary} />
            )
          ) : null}
          {isExpanded && (
            <Text style={styles.sectionTitle}>PROCESOS</Text>
          )}
        </TouchableOpacity>
        {(!isExpanded || expandedSections.includes('processes')) && (
          <>
            <MenuItem 
              icon={ClipboardList} 
              title="Procesos legales" 
              path="/legalProcesses"
              badge={8}
            />
            <MenuItem 
              icon={Clock} 
              title="Seguimiento" 
              path="/tracking"
              badge={5}
            />
            <MenuItem 
              icon={Building2} 
              title="Casas judiciales" 
              path="/judicialHouses"
            />
          </>
        )}
      </View>
    </View>
  );
}