import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Clock, FileText, User, CalendarDays, ChevronRight } from 'lucide-react-native';
import { LegalProcess } from '@/types';

interface ProcessCardProps {
  process: LegalProcess;
}

export default function ProcessCard({ process }: ProcessCardProps) {
  const { colors, isDark } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return colors.success;
      case 'En espera':
        return colors.warning;
      case 'Urgente':
        return colors.error;
      case 'Archivado':
        return colors.textSecondary;
      default:
        return colors.primary;
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      padding: 16,
      shadowColor: isDark ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    caseNumber: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    statusText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
    },
    detailsContainer: {
      marginTop: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.text,
      marginLeft: 8,
      flex: 1,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewButtonText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.primary,
      marginRight: 4,
    },
  });

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{process.title}</Text>
          <Text style={styles.caseNumber}>{process.caseNumber}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(process.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(process.status) }]}>
            {process.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <User size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{process.client}</Text>
        </View>
        <View style={styles.detailRow}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{process.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <CalendarDays size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>Inicio: {process.startDate}</Text>
        </View>
        {process.nextHearing && (
          <View style={styles.detailRow}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.detailText}>Próxima audiencia: {process.nextHearing}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.textSecondary }}>
          Última actualización: {process.lastUpdate}
        </Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Ver detalles</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}