import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Users, ClipboardList, FileText, Building2, FileQuestion } from 'lucide-react-native';

interface EmptyStateProps {
  icon: 'users' | 'clipboard-list' | 'file-clock' | 'building-2';
  title: string;
  message: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  const { colors, isDark } = useTheme();

  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users size={48} color={colors.textSecondary} />;
      case 'clipboard-list':
        return <ClipboardList size={48} color={colors.textSecondary} />;
      case 'file-clock':
        return <FileText size={48} color={colors.textSecondary} />;
      case 'building-2':
        return <Building2 size={48} color={colors.textSecondary} />;
      default:
        return <FileQuestion size={48} color={colors.textSecondary} />;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      paddingVertical: 64,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    message: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}