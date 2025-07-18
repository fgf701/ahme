import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { sampleQuizzes } from '../data/quizzes';
import { Question } from '../types';

interface Props {
  navigation: any;
  route: any;
}

const QuizScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const quiz = sampleQuizzes.find(q => q.lessonId === lessonId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    if (quiz) {
      setAnsweredQuestions(new Array(quiz.questions.length).fill(false));
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Quiz not found</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'translation') {
      isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase();
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    // Mark question as answered
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    // Show result for current question
    setShowResult(true);

    setTimeout(() => {
      if (isLastQuestion) {
        // Quiz completed
        const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100);
        Alert.alert(
          'Quiz Complete!',
          `Your score: ${finalScore}%\n${score + (isCorrect ? 1 : 0)}/${quiz.questions.length} correct`,
          [
            {
              text: 'Review Answers',
              onPress: () => {
                setCurrentQuestionIndex(0);
                setShowResult(false);
                setSelectedAnswer('');
                setUserAnswer('');
              },
            },
            {
              text: 'Back to Lessons',
              onPress: () => navigation.navigate('Lessons'),
            },
          ]
        );
      } else {
        // Next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
        setSelectedAnswer('');
        setUserAnswer('');
      }
    }, 2000);
  };

  const renderMultipleChoice = () => (
    <View style={styles.optionsContainer}>
      {currentQuestion.options?.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === option && styles.selectedOption,
            showResult && option === currentQuestion.correctAnswer && styles.correctOption,
            showResult && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOption,
          ]}
          onPress={() => !showResult && handleAnswerSelect(option)}
          disabled={showResult}
        >
          <Text
            style={[
              styles.optionText,
              selectedAnswer === option && styles.selectedOptionText,
              showResult && option === currentQuestion.correctAnswer && styles.correctOptionText,
            ]}
          >
            {option}
          </Text>
          {showResult && option === currentQuestion.correctAnswer && (
            <Icon name="checkmark-circle" size={20} color="white" />
          )}
          {showResult && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
            <Icon name="close-circle" size={20} color="white" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTranslation = () => (
    <View style={styles.translationContainer}>
      <TextInput
        style={[
          styles.translationInput,
          showResult && styles.translationInputDisabled,
        ]}
        placeholder="Type your answer here..."
        value={userAnswer}
        onChangeText={setUserAnswer}
        editable={!showResult}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {showResult && (
        <View style={styles.translationResult}>
          <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
          <Text style={styles.correctAnswerText}>{currentQuestion.correctAnswer}</Text>
        </View>
      )}
    </View>
  );

  const canSubmit = () => {
    if (currentQuestion.type === 'multiple-choice') {
      return selectedAnswer !== '';
    } else if (currentQuestion.type === 'translation') {
      return userAnswer.trim() !== '';
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` },
              ]}
            />
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{score}/{quiz.questions.length}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.type === 'multiple-choice' && renderMultipleChoice()}
        {currentQuestion.type === 'translation' && renderTranslation()}

        {showResult && currentQuestion.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>Explanation:</Text>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </View>

      {/* Submit Button */}
      {!showResult && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            !canSubmit() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitAnswer}
          disabled={!canSubmit()}
        >
          <Text style={[
            styles.submitButtonText,
            !canSubmit() && styles.submitButtonTextDisabled,
          ]}>
            {isLastQuestion ? 'Finish Quiz' : 'Submit Answer'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  progressContainer: {
    flex: 1,
    marginRight: 15,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  scoreContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  scoreText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    lineHeight: 28,
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  correctOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  translationContainer: {
    marginTop: 20,
  },
  translationInput: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    fontSize: 16,
    color: '#333',
  },
  translationInputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#666',
  },
  translationResult: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: 5,
  },
  correctAnswerText: {
    fontSize: 16,
    color: '#2e7d32',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  explanationLabel: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#999',
  },
});

export default QuizScreen;