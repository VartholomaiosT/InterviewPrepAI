import { create } from 'zustand';
 import { generateQuestions as apiGenerateQuestions } from '@/lib/ai';
import { JobDetails, QuestionSet } from '@/types/questions';

interface QuestionState {
  currentSet: QuestionSet | null;
  isLoading: boolean;
  error: string | null;
  generateQuestions: (input: JobDetails) => Promise<boolean>;
  generateFromJobDescription: (description: string) => Promise<boolean>;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  currentSet: null,
  isLoading: false,
  error: null,
  generateQuestions: async (input: JobDetails) => {
    try {
      set({ isLoading: true, error: null });
      const questions = await apiGenerateQuestions(input);
      set({ currentSet: questions, isLoading: false });
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate questions',
        isLoading: false,
        currentSet: null,
      });
      return false;
    }
  },
  generateFromJobDescription: async (description: string) => {
    try {
      set({ isLoading: true, error: null });
      const questions = await apiGenerateQuestions({ description });
      set({ currentSet: questions, isLoading: false });
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to generate questions',
        isLoading: false,
        currentSet: null,
      });
      return false;
    }
  },
}));
