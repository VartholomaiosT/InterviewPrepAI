import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import {
  Briefcase,
  GraduationCap,
  Building2,
  ListChecks,
  ArrowRight,
  Loader2,
} from 'lucide-react-native';
import { useState } from 'react';
import { useThemeStore } from '../../../stores/theme';
import { useQuestionStore } from '../../../stores/questions';

interface FormData {
  jobTitle: string;
  skills: string;
  experience: string;
  industry: string;
  responsibilities: string;
}

export default function StructuredForm() {
  const { isDark } = useThemeStore();
  const { generateQuestions, isLoading, error: apiError } = useQuestionStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    skills: '',
    experience: '',
    industry: '',
    responsibilities: '',
  });

  const handleSubmit = async () => {
    if (!formData.jobTitle.trim() || !formData.skills.trim()) return;

    try {
      const success = await generateQuestions({
        title: formData.jobTitle.trim(),
        skills: formData.skills.trim(),
        experience: formData.experience.trim(),
        industry: formData.industry.trim(),
        responsibilities: formData.responsibilities.trim(),
      });

      if (success) {
        router.push('/practice/questions');
      } else {
        setError('Failed to generate questions. Please try again.');
      }
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    }
  };

  const isValid = formData.jobTitle.trim() && formData.skills.trim();

  const renderField = (
    icon: JSX.Element,
    label: string,
    placeholder: string,
    field: keyof FormData,
    multiline?: boolean
  ) => (
    <View style={styles.field}>
      <View style={styles.fieldHeader}>
        {icon}
        <Text style={[styles.fieldLabel, { color: isDark ? '#fff' : '#000' }]}>
          {label}
        </Text>
      </View>
      <TextInput
        style={[
          multiline ? styles.textArea : styles.input,
          {
            backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
            color: isDark ? '#fff' : '#000',
            borderColor: isDark ? '#333' : '#e5e5e5',
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#666' : '#999'}
        value={formData[field]}
        onChangeText={(text) => setFormData({ ...formData, [field]: text })}
        multiline={multiline}
      />
    </View>
  );

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
            Structured Form
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#888' : '#666' }]}>
            Enter job details to generate targeted practice questions
          </Text>
        </View>

        {renderField(
          <Briefcase size={20} color={isDark ? '#fff' : '#000'} />,
          'Job Title',
          'e.g., Senior Software Engineer',
          'jobTitle'
        )}

        {renderField(
          <ListChecks size={20} color={isDark ? '#fff' : '#000'} />,
          'Required Skills',
          'e.g., React, Node.js, TypeScript',
          'skills'
        )}

        {renderField(
          <GraduationCap size={20} color={isDark ? '#fff' : '#000'} />,
          'Experience Level',
          'e.g., Senior (5+ years)',
          'experience'
        )}

        {renderField(
          <Building2 size={20} color={isDark ? '#fff' : '#000'} />,
          'Industry',
          'e.g., Technology, Finance, Healthcare',
          'industry'
        )}

        {renderField(
          <ListChecks size={20} color={isDark ? '#fff' : '#000'} />,
          'Key Responsibilities',
          'Enter key job responsibilities...',
          'responsibilities',
          true
        )}

        {(error || apiError) && (
          <Text style={[styles.errorText, { color: '#FF3B30' }]}>
            {error || apiError}
          </Text>
        )}

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: isValid
                ? '#007AFF'
                : isDark
                ? '#1a1a1a'
                : '#f5f5f5',
              opacity: isLoading ? 0.7 : 1,
            },
          ]}
          onPress={handleSubmit}
          disabled={!isValid || isLoading}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: isValid ? '#fff' : isDark ? '#666' : '#999',
              },
            ]}
          >
            {isLoading ? 'Generating...' : 'Generate Questions'}
          </Text>
          {isLoading ? (
            <Loader2
              size={20}
              color={isValid ? '#fff' : isDark ? '#666' : '#999'}
            />
          ) : (
            <ArrowRight
              size={20}
              color={isValid ? '#fff' : isDark ? '#666' : '#999'}
            />
          )}
        </Pressable>
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
  field: {
    marginBottom: 24,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
});
