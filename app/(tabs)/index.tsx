import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FileText, Clipboard, ListChecks } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

export default function HomeScreen() {
  const { isDark } = useThemeStore();

  const inputMethods = [
    {
      title: 'Paste Job Description',
      icon: <Clipboard size={24} color={isDark ? '#fff' : '#000'} />,
      description: 'Quickly generate questions from a job posting',
      route: '/practice/paste',
    },
    {
      title: 'Structured Form',
      icon: <FileText size={24} color={isDark ? '#fff' : '#000'} />,
      description: 'Enter job details in a structured format',
      route: '/practice/form',
    },
    {
      title: 'Quick Practice',
      icon: <ListChecks size={24} color={isDark ? '#fff' : '#000'} />,
      description: 'Practice with pre-defined question sets',
      route: '/practice/quick',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            InterviewPrep AI
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Ace your next interview with AI-powered practice
          </Text>
        </View>

        <View style={styles.methodsContainer}>
          {inputMethods.map((method, index) => (
            <Pressable
              key={index}
              style={[
                styles.methodCard,
                {
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderColor: isDark ? '#333' : '#e5e5e5',
                },
              ]}
              onPress={() => router.push(method.route)}
            >
              <View style={styles.methodIcon}>{method.icon}</View>
              <Text
                style={[
                  styles.methodTitle,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {method.title}
              </Text>
              <Text
                style={[
                  styles.methodDescription,
                  { color: isDark ? '#888' : '#666' },
                ]}
              >
                {method.description}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
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
  methodsContainer: {
    gap: 16,
  },
  methodCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  methodIcon: {
    marginBottom: 12,
  },
  methodTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
