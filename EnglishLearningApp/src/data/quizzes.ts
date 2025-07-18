import { Quiz, Question } from '../types';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    lessonId: 'lesson-1',
    completed: false,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What does "Hello" mean?',
        options: ['A greeting', 'A farewell', 'A question', 'An exclamation'],
        correctAnswer: 'A greeting',
        explanation: '"Hello" is a common greeting used when meeting someone.',
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'When do you say "Goodbye"?',
        options: ['When meeting someone', 'When leaving', 'When eating', 'When sleeping'],
        correctAnswer: 'When leaving',
        explanation: '"Goodbye" is used when parting or leaving someone.',
      },
      {
        id: 'q3',
        type: 'translation',
        question: 'How do you greet someone in English?',
        correctAnswer: 'Hello',
        explanation: 'The most common greeting in English is "Hello".',
      },
    ],
  },
  {
    id: 'quiz-2',
    lessonId: 'lesson-2',
    completed: false,
    questions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'What word do you use to make a polite request?',
        options: ['Hello', 'Please', 'Goodbye', 'Water'],
        correctAnswer: 'Please',
        explanation: '"Please" is used to make requests politely.',
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'How do you express gratitude?',
        options: ['Please', 'Hello', 'Thank you', 'Goodbye'],
        correctAnswer: 'Thank you',
        explanation: '"Thank you" is the standard way to express gratitude.',
      },
    ],
  },
  {
    id: 'quiz-3',
    lessonId: 'lesson-3',
    completed: false,
    questions: [
      {
        id: 'q6',
        type: 'multiple-choice',
        question: 'What is the clear liquid essential for life?',
        options: ['Food', 'Water', 'Hello', 'House'],
        correctAnswer: 'Water',
        explanation: 'Water is essential for all life.',
      },
      {
        id: 'q7',
        type: 'translation',
        question: 'What do you call substances consumed for nutrition?',
        correctAnswer: 'Food',
        explanation: 'Food provides the nutrition our bodies need.',
      },
    ],
  },
  {
    id: 'quiz-4',
    lessonId: 'lesson-4',
    completed: false,
    questions: [
      {
        id: 'q8',
        type: 'multiple-choice',
        question: 'What is a building where people live called?',
        options: ['Food', 'Water', 'House', 'Please'],
        correctAnswer: 'House',
        explanation: 'A house is a building designed for people to live in.',
      },
      {
        id: 'q9',
        type: 'multiple-choice',
        question: 'What do you call a group of related people living together?',
        options: ['House', 'Family', 'Water', 'Food'],
        correctAnswer: 'Family',
        explanation: 'A family is a group of related people, often living together.',
      },
    ],
  },
];