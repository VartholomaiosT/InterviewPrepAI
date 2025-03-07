import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Question } from '@/types/questions';
import {
  CircleCheck as CheckCircle2,
  Circle as XCircle,
} from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
  showCorrect?: boolean;
}

export default function QuestionCard({
  question,
  onAnswer,
  selectedAnswer,
  showCorrect,
}: QuestionCardProps) {
  const { isDark } = useThemeStore();

  const renderOptions = () => {
    if (question.type === 'true_false') {
      return (
        <View style={styles.optionsContainer}>
          {['True', 'False'].map((option) => (
            <Pressable
              key={option}
              style={[
                styles.option,
                {
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderColor:
                    selectedAnswer === option
                      ? '#007AFF'
                      : isDark
                      ? '#333'
                      : '#e5e5e5',
                },
              ]}
              onPress={() => onAnswer(option)}
            >
              <Text
                style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}
              >
                {option}
              </Text>
              {showCorrect &&
                selectedAnswer === option &&
                (option === question.correctAnswer ? (
                  <CheckCircle2 size={20} color="#34C759" />
                ) : (
                  <XCircle size={20} color="#FF3B30" />
                ))}
            </Pressable>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {question.options?.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.option,
              {
                backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                borderColor:
                  selectedAnswer === option
                    ? '#007AFF'
                    : isDark
                    ? '#333'
                    : '#e5e5e5',
              },
            ]}
            onPress={() => onAnswer(option)}
          >
            <Text
              style={[styles.optionText, { color: isDark ? '#fff' : '#000' }]}
            >
              {option}
            </Text>
            {showCorrect &&
              selectedAnswer === option &&
              (option === question.correctAnswer ? (
                <CheckCircle2 size={20} color="#34C759" />
              ) : (
                <XCircle size={20} color="#FF3B30" />
              ))}
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1a1a1a' : '#fff',
          borderColor: isDark ? '#333' : '#e5e5e5',
        },
      ]}
    >
      <Text style={[styles.questionType, { color: isDark ? '#888' : '#666' }]}>
        {question.type === 'multiple_choice'
          ? 'Multiple Choice'
          : question.type === 'true_false'
          ? 'True or False'
          : 'Scenario'}
      </Text>
      <Text style={[styles.questionText, { color: isDark ? '#fff' : '#000' }]}>
        {question.question}
      </Text>
      {renderOptions()}
      {showCorrect && (
        <View style={styles.explanation}>
          <Text
            style={[
              styles.explanationTitle,
              { color: isDark ? '#fff' : '#000' },
            ]}
          >
            Explanation
          </Text>
          <Text
            style={[
              styles.explanationText,
              { color: isDark ? '#888' : '#666' },
            ]}
          >
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  questionType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  explanation: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  explanationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
});
