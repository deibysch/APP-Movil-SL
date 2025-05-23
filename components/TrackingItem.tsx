import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Clock, CircleAlert as AlertCircle, Check, ChevronRight, FileText } from 'lucide-react-native';
import { TrackingItem as TrackingItemType } from '@/types';

interface TrackingItemProps {
  item: TrackingItemType;
}

export default function TrackingItem({ item }: TrackingItemProps) {
  const { colors, isDark } = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return <AlertCircle size={20} color={colors.error} />;
      case 'completed':
        return <Check size={20} color={colors.success} />;
      case 'pending':
      default:
        return <Clock size={20} color={colors.warning} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return colors.error;
      case 'completed':
        return colors.success;
      case 'pending':
      default:
        return colors.warning;
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
      borderLeftWidth: 4,
      borderLeftColor: getStatusColor(item.status),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: `${getStatusColor(item.status)}20`,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    headerContent: {
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
    description: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.text,
      marginTop: 8,
      lineHeight: 20,
    },
    deadlineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    deadlineText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: getStatusColor(item.status),
      marginLeft: 6,
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
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    actionButtonText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: '#fff',
      marginRight: 4,
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
        <View style={styles.iconContainer}>
          {getStatusIcon(item.status)}
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.caseNumber}>Caso: {item.caseNumber}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.deadlineContainer}>
        <FileText size={16} color={getStatusColor(item.status)} />
        <Text style={styles.deadlineText}>
          {item.status === 'completed' 
            ? `Completado: ${item.dueDate}` 
            : `Fecha límite: ${item.dueDate}`}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            item.status === 'completed' && { backgroundColor: colors.textSecondary }
          ]}
        >
          <Text style={styles.actionButtonText}>
            {item.status === 'completed' ? 'Completado' : 'Marcar como completado'}
          </Text>
          {item.status !== 'completed' && <Check size={16} color="#fff" />}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Ver detalles</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}