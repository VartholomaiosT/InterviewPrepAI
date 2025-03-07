import { Tabs } from 'expo-router';
import {
  Brain,
  Home,
  Settings,
  ChartLine as LineChart,
} from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

export default function TabLayout() {
  const { isDark } = useThemeStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#000' : '#fff',
          borderTopColor: isDark ? '#333' : '#e5e5e5',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDark ? '#888' : '#666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ size, color }) => <Brain size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ size, color }) => (
            <LineChart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
