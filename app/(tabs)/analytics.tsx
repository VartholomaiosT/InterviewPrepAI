import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChartLine as LineChart,
  ChartBar as BarChart2,
  ChartPie as PieChart,
} from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

export default function AnalyticsScreen() {
  const { isDark } = useThemeStore();

  const renderPlaceholder = (
    icon: JSX.Element,
    title: string,
    description: string
  ) => (
    <View
      style={[
        styles.placeholderCard,
        {
          backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
          borderColor: isDark ? '#333' : '#e5e5e5',
        },
      ]}
    >
      {icon}
      <Text
        style={[styles.placeholderTitle, { color: isDark ? '#fff' : '#000' }]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.placeholderDescription,
          { color: isDark ? '#888' : '#666' },
        ]}
      >
        {description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Analytics
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Track your progress and performance
          </Text>
        </View>

        <View style={styles.placeholdersContainer}>
          {renderPlaceholder(
            <LineChart size={32} color={isDark ? '#fff' : '#000'} />,
            'Performance Trends',
            'Visualize your progress over time'
          )}
          {renderPlaceholder(
            <BarChart2 size={32} color={isDark ? '#fff' : '#000'} />,
            'Skill Distribution',
            'See your strengths and areas for improvement'
          )}
          {renderPlaceholder(
            <PieChart size={32} color={isDark ? '#fff' : '#000'} />,
            'Topic Coverage',
            "Track topics you've practiced"
          )}
        </View>

        <View
          style={[
            styles.comingSoon,
            {
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              borderColor: isDark ? '#333' : '#e5e5e5',
            },
          ]}
        >
          <Text
            style={[
              styles.comingSoonTitle,
              { color: isDark ? '#fff' : '#000' },
            ]}
          >
            Coming Soon
          </Text>
          <Text
            style={[styles.comingSoonText, { color: isDark ? '#888' : '#666' }]}
          >
            We're working hard to bring you detailed analytics and insights.
            Stay tuned for updates!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  placeholdersContainer: {
    gap: 16,
    marginBottom: 24,
  },
  placeholderCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  placeholderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  placeholderDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  comingSoon: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});
