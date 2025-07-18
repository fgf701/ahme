export interface Word {
  id: string;
  english: string;
  phonetic?: string;
  definition: string;
  example: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  words: Word[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completed: boolean;
  progress: number; // 0-100
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  score?: number;
  completed: boolean;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'translation' | 'listening' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  currentStreak: number;
  totalXP: number;
  level: number;
  lastActiveDate: string;
}

export interface NavigationParams {
  Home: undefined;
  Lessons: undefined;
  Lesson: { lessonId: string };
  Quiz: { lessonId: string };
  Progress: undefined;
  Profile: undefined;
}