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
import { Search, Filter, Plus, ArrowDownUp, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import ThemeToggle from '@/components/ThemeToggle';
import EmptyState from '@/components/EmptyState';
import ProcessCard from '@/components/ProcessCard';
import { mockLegalProcesses } from '@/data/mockData';

export default function LegalProcessesScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'archived'
  const [filteredProcesses, setFilteredProcesses] = useState(
    mockLegalProcesses.filter(process => process.status !== 'Archivado')
  );

  const filterProcesses = (query: string) => {
    setSearchQuery(query);
    
    const baseProcesses = activeTab === 'active' 
      ? mockLegalProcesses.filter(process => process.status !== 'Archivado')
      : mockLegalProcesses.filter(process => process.status === 'Archivado');
    
    if (!query.trim()) {
      setFilteredProcesses(baseProcesses);
      return;
    }
    
    const filtered = baseProcesses.filter(process => 
      process.title.toLowerCase().includes(query.toLowerCase()) ||
      process.caseNumber.toLowerCase().includes(query.toLowerCase()) ||
      process.client.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProcesses(filtered);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    
    if (tab === 'active') {
      setFilteredProcesses(mockLegalProcesses.filter(process => process.status !== 'Archivado'));
    } else {
      setFilteredProcesses(mockLegalProcesses.filter(process => process.status === 'Archivado'));
    }
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
    tabsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
    },
    activeTabText: {
      color: '#fff',
    },
    inactiveTabText: {
      color: colors.textSecondary,
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
      marginRight: 4,
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
          <Text style={styles.headerTitle}>Procesos Legales</Text>
          <ThemeToggle />
        </View>
        <Text style={styles.headerSubtitle}>Administre todos sus procesos activos y archivados</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar proceso..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={filterProcesses}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'active' && styles.activeTab]} 
            onPress={() => handleTabChange('active')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'active' ? styles.activeTabText : styles.inactiveTabText
              ]}
            >
              Activos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'archived' && styles.activeTab]} 
            onPress={() => handleTabChange('archived')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'archived' ? styles.activeTabText : styles.inactiveTabText
              ]}
            >
              Archivados
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionsRow}>
          <View style={styles.sortContainer}>
            <Text style={styles.sortText}>Ordenar</Text>
            <ArrowDownUp size={16} color={colors.textSecondary} />
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addButtonText}>Nuevo proceso</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {activeTab === 'active' ? 'Procesos activos' : 'Procesos archivados'}
        </Text>
        
        {filteredProcesses.length === 0 ? (
          <EmptyState
            icon="clipboard-list"
            title={`No hay procesos ${activeTab === 'active' ? 'activos' : 'archivados'}`}
            message={activeTab === 'active' 
              ? "Añada un nuevo proceso legal para comenzar" 
              : "No hay procesos archivados en este momento"}
          />
        ) : (
          <FlatList
            data={filteredProcesses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProcessCard process={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}