import { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Users, ClipboardList, Clock, Building2 } from 'lucide-react-native';
import { SplashScreen } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const { theme, colors } = useTheme();
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    },
    content: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && <Sidebar />}
      <View style={styles.content}>
        {Platform.OS === 'web' && <Header />}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
              display: Platform.OS === 'web' ? 'none' : 'flex',
            },
            tabBarLabelStyle: {
              fontFamily: 'Inter-Regular',
              fontSize: 12,
            },
            headerStyle: {
              backgroundColor: colors.card,
            },
            headerTitleStyle: {
              fontFamily: 'Inter-SemiBold',
              color: colors.text,
            },
            headerTintColor: colors.primary,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Clientes',
              tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="legalProcesses"
            options={{
              title: 'Procesos',
              tabBarIcon: ({ color, size }) => <ClipboardList size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="tracking"
            options={{
              title: 'Seguimiento',
              tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="judicialHouses"
            options={{
              title: 'Casas',
              tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}