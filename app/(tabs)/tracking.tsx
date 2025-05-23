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
import { Search, Filter, Clock, CircleAlert as AlertCircle, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import ThemeToggle from '@/components/ThemeToggle';
import EmptyState from '@/components/EmptyState';
import TrackingItem from '@/components/TrackingItem';
import { mockTrackingData } from '@/data/mockData';

export default function TrackingScreen() {
  const { colors, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [filteredItems, setFilteredItems] = useState(
    mockTrackingData.filter(item => item.status === 'pending')
  );

  const filterItems = (query: string) => {
    setSearchQuery(query);
    
    const baseItems = activeTab === 'pending' 
      ? mockTrackingData.filter(item => item.status === 'pending')
      : activeTab === 'urgent'
        ? mockTrackingData.filter(item => item.status === 'urgent')
        : mockTrackingData.filter(item => item.status === 'completed');
    
    if (!query.trim()) {
      setFilteredItems(baseItems);
      return;
    }
    
    const filtered = baseItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.caseNumber.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    
    if (tab === 'pending') {
      setFilteredItems(mockTrackingData.filter(item => item.status === 'pending'));
    } else if (tab === 'urgent') {
      setFilteredItems(mockTrackingData.filter(item => item.status === 'urgent'));
    } else {
      setFilteredItems(mockTrackingData.filter(item => item.status === 'completed'));
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
      flexDirection: 'row',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    urgentTab: {
      backgroundColor: activeTab === 'urgent' ? colors.error : undefined,
    },
    completedTab: {
      backgroundColor: activeTab === 'completed' ? colors.success : undefined,
    },
    tabText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      marginLeft: 4,
    },
    activeTabText: {
      color: '#fff',
    },
    inactiveTabText: {
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
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Seguimiento</Text>
          <ThemeToggle />
        </View>
        <Text style={styles.headerSubtitle}>Seguimiento detallado de todos sus procesos legales</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar seguimiento..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={filterItems}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'pending' && styles.activeTab]} 
            onPress={() => handleTabChange('pending')}
          >
            <Clock size={16} color={activeTab === 'pending' ? '#fff' : colors.textSecondary} />
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'pending' ? styles.activeTabText : styles.inactiveTabText
              ]}
            >
              Pendiente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, styles.urgentTab]} 
            onPress={() => handleTabChange('urgent')}
          >
            <AlertCircle size={16} color={activeTab === 'urgent' ? '#fff' : colors.error} />
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'urgent' ? styles.activeTabText : { color: colors.error }
              ]}
            >
              Urgente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, styles.completedTab]} 
            onPress={() => handleTabChange('completed')}
          >
            <Check size={16} color={activeTab === 'completed' ? '#fff' : colors.success} />
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'completed' ? styles.activeTabText : { color: colors.success }
              ]}
            >
              Completo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {activeTab === 'pending' 
            ? 'Tareas pendientes' 
            : activeTab === 'urgent' 
              ? 'Tareas urgentes' 
              : 'Tareas completadas'}
        </Text>
        
        {filteredItems.length === 0 ? (
          <EmptyState
            icon="file-clock"
            title={`No hay tareas ${
              activeTab === 'pending' 
                ? 'pendientes' 
                : activeTab === 'urgent' 
                  ? 'urgentes' 
                  : 'completadas'
            }`}
            message={
              activeTab === 'completed' 
                ? "No hay tareas completadas en este momento" 
                : "No hay tareas que coincidan con su búsqueda"
            }
          />
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TrackingItem item={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}