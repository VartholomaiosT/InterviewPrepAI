export interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  jobTitle?: string;
  industry?: string;
}

export interface JobDetails {
  title: string;
  skills: string;
  experienceLevel: string;
  industry: string;
  responsibilities: string;
}