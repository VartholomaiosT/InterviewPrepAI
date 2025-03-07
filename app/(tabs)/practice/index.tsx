import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FileText, Clipboard, ListChecks } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

export default function PracticeScreen() {
  const { isDark } = useThemeStore();

  const practiceOptions = [
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Practice
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Choose how you want to practice
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {practiceOptions.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.optionCard,
                {
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderColor: isDark ? '#333' : '#e5e5e5',
                },
              ]}
              onPress={() => router.push(option.route)}
            >
              <View style={styles.optionIcon}>{option.icon}</View>
              <Text
                style={[
                  styles.optionTitle,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {option.title}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  { color: isDark ? '#888' : '#666' },
                ]}
              >
                {option.description}
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
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  optionIcon: {
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
