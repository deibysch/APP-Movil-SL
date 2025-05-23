import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { Search, Filter, Plus, Briefcase, Phone, Mail, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import ThemeToggle from '@/components/ThemeToggle';
import EmptyState from '@/components/EmptyState';
import ClientCard from '@/components/ClientCard';
import { mockClients } from '@/data/mockData';

export default function ClientsScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);

  const filterClients = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredClients(mockClients);
      return;
    }
    
    const filtered = mockClients.filter(client => 
      client.name.toLowerCase().includes(query.toLowerCase()) ||
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.phone.includes(query)
    );
    setFilteredClients(filtered);
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
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sortText: {
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      fontSize: 14,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: colors.primary,
      borderRadius: 8,
    },
    addButtonText: {
      color: '#fff',
      fontFamily: 'Inter-Medium',
      marginLeft: 4,
      fontSize: 14,
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
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Clientes</Text>
          <ThemeToggle />
        </View>
        <Text style={styles.headerSubtitle}>Gestione todos sus clientes en un solo lugar</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cliente..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={filterClients}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionsRow}>
          <View style={styles.sortContainer}>
            <Text style={styles.sortText}>12 Clientes</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addButtonText}>Añadir cliente</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Clientes recientes</Text>
        
        {filteredClients.length === 0 ? (
          <EmptyState
            icon="users"
            title="No se encontraron clientes"
            message="Intente con un término de búsqueda diferente o añada un nuevo cliente."
          />
        ) : (
          <FlatList
            data={filteredClients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ClientCard client={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}