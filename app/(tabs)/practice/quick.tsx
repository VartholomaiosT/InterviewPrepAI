import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

const categories = [
  {
    title: 'Frontend Development',
    description: 'React, Vue, Angular, and modern web technologies',
    image:
      'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Backend Development',
    description: 'Node.js, Python, Java, and server technologies',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'System Design',
    description: 'Architecture, scalability, and best practices',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
  },
];

export default function QuickPractice() {
  const { isDark } = useThemeStore();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Quick Practice
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Choose a category to start practicing
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={[
                styles.categoryCard,
                { backgroundColor: isDark ? '#1a1a1a' : '#fff' },
              ]}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <View style={styles.categoryContent}>
                <Text
                  style={[
                    styles.categoryTitle,
                    { color: isDark ? '#fff' : '#000' },
                  ]}
                >
                  {category.title}
                </Text>
                <Text
                  style={[
                    styles.categoryDescription,
                    { color: isDark ? '#888' : '#666' },
                  ]}
                >
                  {category.description}
                </Text>
                <View style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start Practice</Text>
                  <ArrowRight size={16} color="#007AFF" />
                </View>
              </View>
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
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryImage: {
    width: '100%',
    height: 160,
  },
  categoryContent: {
    padding: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
});
