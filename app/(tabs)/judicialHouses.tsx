import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Platform,
} from 'react-native';
import { Search, Filter, MapPin, Map } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import ThemeToggle from '@/components/ThemeToggle';
import EmptyState from '@/components/EmptyState';
import JudicialHouseCard from '@/components/JudicialHouseCard';
import { mockJudicialHouses } from '@/data/mockData';

export default function JudicialHousesScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHouses, setFilteredHouses] = useState(mockJudicialHouses);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const filterHouses = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredHouses(mockJudicialHouses);
      return;
    }
    
    const filtered = mockJudicialHouses.filter(house => 
      house.name.toLowerCase().includes(query.toLowerCase()) ||
      house.address.toLowerCase().includes(query.toLowerCase()) ||
      house.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHouses(filtered);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.card,
      paddingTop: Platform.OS === 'web' ? 16 : 0,
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 28,
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    searchBar: {
      flex: 1,
      height: 44,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      borderRadius: 8,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      color: colors.text,
      fontFamily: 'Inter-Regular',
    },
    filterButton: {
      width: 44,
      height: 44,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    viewToggleContainer: {
      flexDirection: 'row',
      marginTop: 16,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      padding: 4,
    },
    viewToggleButton: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    activeToggle: {
      backgroundColor: colors.primary,
    },
    toggleText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      marginLeft: 4,
    },
    activeToggleText: {
      color: '#fff',
    },
    inactiveToggleText: {
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 12,
    },
    mapPlaceholder: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    mapPlaceholderText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: '80%',
      marginTop: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Casas Judiciales</Text>
          <ThemeToggle />
        </View>
        <Text style={styles.headerSubtitle}>Encuentre información sobre casas judiciales</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar casa judicial..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={filterHouses}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity 
            style={[styles.viewToggleButton, viewMode === 'list' && styles.activeToggle]} 
            onPress={() => setViewMode('list')}
          >
            <Text 
              style={[
                styles.toggleText, 
                viewMode === 'list' ? styles.activeToggleText : styles.inactiveToggleText
              ]}
            >
              Lista
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewToggleButton, viewMode === 'map' && styles.activeToggle]} 
            onPress={() => setViewMode('map')}
          >
            <Text 
              style={[
                styles.toggleText, 
                viewMode === 'map' ? styles.activeToggleText : styles.inactiveToggleText
              ]}
            >
              Mapa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        {viewMode === 'list' ? (
          <>
            <Text style={styles.sectionTitle}>Todas las Casas Judiciales</Text>
            
            {filteredHouses.length === 0 ? (
              <EmptyState
                icon="building-2"
                title="No se encontraron casas judiciales"
                message="Intente con un término de búsqueda diferente."
              />
            ) : (
              <FlatList
                data={filteredHouses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <JudicialHouseCard judicialHouse={item} />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            )}
          </>
        ) : (
          // Map view placeholder - in a real app, this would be a map component
          <View style={styles.mapPlaceholder}>
            <MapPin size={48} color={colors.primary} />
            <Text style={styles.mapPlaceholderText}>
              Visualización de mapa no disponible en esta versión de previsualización.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}