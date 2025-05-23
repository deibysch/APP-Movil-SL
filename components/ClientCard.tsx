import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Phone, Mail, Briefcase, ChevronRight } from 'lucide-react-native';
import { Client } from '@/types';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
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
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 12,
    },
    nameContainer: {
      flex: 1,
    },
    name: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 2,
    },
    clientId: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
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
    caseCount: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: '#fff',
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
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
        {client.avatar ? (
          <Image source={{ uri: client.avatar }} style={styles.avatar} />
        ) : (
          <View 
            style={[
              styles.avatar, 
              { 
                backgroundColor: colors.primary, 
                justifyContent: 'center', 
                alignItems: 'center' 
              }
            ]}
          >
            <Text style={{ color: '#fff', fontFamily: 'Inter-SemiBold', fontSize: 20 }}>
              {client.name.substring(0, 1)}
            </Text>
          </View>
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{client.name}</Text>
          <Text style={styles.clientId}>ID: {client.id.substring(0, 8)}</Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Phone size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{client.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Mail size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>{client.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Briefcase size={16} color={colors.textSecondary} />
          <Text style={styles.detailText}>Casos asociados</Text>
          <Text style={styles.caseCount}>{client.caseCount}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.footer}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 12, color: colors.textSecondary }}>
          Último contacto: {client.lastContact}
        </Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Ver detalles</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}