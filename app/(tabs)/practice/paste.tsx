import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme';
import { useState } from 'react';
import { useQuestionStore } from '@/stores/questions';

export default function PasteJobScreen() {
  const { isDark } = useThemeStore();
  const [description, setDescription] = useState('');
  const { generateFromJobDescription, isLoading, error } = useQuestionStore();

  const handleGenerate = async () => {
    if (!description.trim()) return;
    try {
      const success = await generateFromJobDescription(description.trim());
      if (success) {
        router.push('/practice/questions');
      }
    } catch (err) {
      // Error handling is managed by the store
      console.error('Failed to generate questions:', err);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={isDark ? '#fff' : '#000'} />
          </Pressable>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
            Paste Job Description
          </Text>
        </View>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#333' : '#e5e5e5',
            },
          ]}
          placeholder="Paste job description here..."
          placeholderTextColor={isDark ? '#888' : '#666'}
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: description.trim()
                ? '#007AFF'
                : isDark
                ? '#1a1a1a'
                : '#f5f5f5',
              opacity: isLoading ? 0.7 : 1,
            },
          ]}
          onPress={handleGenerate}
          disabled={!description.trim() || isLoading}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: description.trim() ? '#fff' : isDark ? '#666' : '#999',
              },
            ]}
          >
            Generate Questions
          </Text>
          {isLoading ? (
            <Loader2
              size={20}
              color={description.trim() ? '#fff' : isDark ? '#666' : '#999'}
            />
          ) : (
            <ArrowRight
              size={20}
              color={description.trim() ? '#fff' : isDark ? '#666' : '#999'}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'top',
    minHeight: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
});
