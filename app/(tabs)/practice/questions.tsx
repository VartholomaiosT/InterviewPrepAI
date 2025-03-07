import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { ArrowLeft, RefreshCcw } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useQuestionStore } from '@/stores/questions';
import { useThemeStore } from '@/stores/theme';
import QuestionCard from '@/components/QuestionCard';

export default function QuestionsScreen() {
  const { isDark } = useThemeStore();
  const { currentSet } = useQuestionStore();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!currentSet) {
      router.replace('/practice');
    }
  }, [currentSet]);

  if (!currentSet) {
    return null;
  }

  const handleAnswer = (questionId: string, answer: string) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    const total = currentSet.questions.length;
    const correct = currentSet.questions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

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
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={isDark ? '#fff' : '#000'} />
          </Pressable>
          <View>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
              Practice Questions
            </Text>
            <Text
              style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}
            >
              {currentSet.jobTitle || 'Custom Questions'}
            </Text>
          </View>
        </View>

        {showResults && (
          <View
            style={[
              styles.scoreCard,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                borderColor: isDark ? '#333' : '#e5e5e5',
              },
            ]}
          >
            <Text
              style={[styles.scoreTitle, { color: isDark ? '#fff' : '#000' }]}
            >
              Your Score
            </Text>
            <Text
              style={[styles.scoreText, { color: isDark ? '#fff' : '#000' }]}
            >
              {calculateScore().percentage}%
            </Text>
            <Text
              style={[styles.scoreDetails, { color: isDark ? '#888' : '#666' }]}
            >
              {calculateScore().correct} out of {calculateScore().total} correct
            </Text>
            <Pressable
              style={[styles.tryAgainButton, { backgroundColor: '#007AFF' }]}
              onPress={handleTryAgain}
            >
              <RefreshCcw size={20} color="#fff" />
              <Text style={styles.tryAgainText}>Try Again</Text>
            </Pressable>
          </View>
        )}

        {currentSet.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            selectedAnswer={answers[question.id]}
            showCorrect={showResults}
          />
        ))}

        {!showResults &&
          Object.keys(answers).length === currentSet.questions.length && (
            <Pressable
              style={[styles.submitButton, { backgroundColor: '#007AFF' }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit Answers</Text>
            </Pressable>
          )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  scoreCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
  },
  scoreTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 48,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  scoreDetails: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  tryAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});
