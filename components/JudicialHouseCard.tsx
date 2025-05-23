import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { MapPin, Phone, Clock, Globe, ChevronRight } from 'lucide-react-native';
import { JudicialHouse } from '@/types';

interface JudicialHouseCardProps {
  judicialHouse: JudicialHouse;
}

export default function JudicialHouseCard({ judicialHouse }: JudicialHouseCardProps) {
  const { colors, isDark } = useTheme();

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
      marginBottom: 12,
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 4,
    },
    type: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
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
    directionsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    directionsButtonText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: '#fff',
      marginLeft: 4,
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
        <Text style={styles.name}>{judicialHouse.name}</Text>
        <Text style={styles.type}>{judicialHouse.type}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>
            {judicialHouse.address}, {judicialHouse.city}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Phone size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{judicialHouse.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{judicialHouse.hours}</Text>
        </View>
        <View style={styles.detailRow}>
          <Globe size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{judicialHouse.website}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.directionsButton}>
          <MapPin size={16} color="#fff" />
          <Text style={styles.directionsButtonText}>Indicaciones</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Ver detalles</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}