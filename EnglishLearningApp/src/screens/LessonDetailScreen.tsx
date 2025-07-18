import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { sampleLessons } from '../data/lessons';
import { Word } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
  route: any;
}

const LessonDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const lesson = sampleLessons.find(l => l.id === lessonId);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Lesson not found</Text>
      </SafeAreaView>
    );
  }

  const currentWord = lesson.words[currentWordIndex];
  const isLastWord = currentWordIndex === lesson.words.length - 1;

  const handleNext = () => {
    if (!learnedWords.includes(currentWord.id)) {
      setLearnedWords([...learnedWords, currentWord.id]);
    }

    if (isLastWord) {
      // Lesson completed, navigate to quiz
      Alert.alert(
        'Lesson Complete!',
        'Great job! Ready to test your knowledge?',
        [
          {
            text: 'Review',
            onPress: () => {
              setCurrentWordIndex(0);
              setShowDefinition(false);
            },
          },
          {
            text: 'Take Quiz',
            onPress: () => navigation.navigate('Quiz', { lessonId }),
          },
        ]
      );
    } else {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowDefinition(false);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowDefinition(false);
    }
  };

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition);
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
            {currentWordIndex + 1} / {lesson.words.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentWordIndex + 1) / lesson.words.length) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Word Card */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.wordCard}
          onPress={toggleDefinition}
          activeOpacity={0.8}
        >
          {!showDefinition ? (
            <View style={styles.wordSide}>
              <Text style={styles.wordText}>{currentWord.english}</Text>
              {currentWord.phonetic && (
                <Text style={styles.phoneticText}>{currentWord.phonetic}</Text>
              )}
              <Text style={styles.tapHint}>Tap to see definition</Text>
            </View>
          ) : (
            <View style={styles.definitionSide}>
              <Text style={styles.definitionText}>{currentWord.definition}</Text>
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleLabel}>Example:</Text>
                <Text style={styles.exampleText}>"{currentWord.example}"</Text>
              </View>
              <Text style={styles.tapHint}>Tap to see word</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{currentWord.category}</Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            currentWordIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentWordIndex === 0}
        >
          <Icon
            name="chevron-back"
            size={20}
            color={currentWordIndex === 0 ? '#ccc' : '#666'}
          />
          <Text
            style={[
              styles.navButtonText,
              currentWordIndex === 0 && styles.disabledText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {isLastWord ? 'Complete' : 'Next'}
          </Text>
          <Icon name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Study Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipTitle}>💡 Study Tip</Text>
        <Text style={styles.tipText}>
          Try to use this word in your own sentence to better remember it!
        </Text>
      </View>
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wordCard: {
    width: width - 40,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    padding: 30,
  },
  wordSide: {
    alignItems: 'center',
  },
  wordText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  phoneticText: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  definitionSide: {
    alignItems: 'center',
  },
  definitionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
  exampleContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  exampleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600',
  },
  exampleText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  tapHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 0,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
  },
  previousButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nextButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginRight: 5,
  },
  disabledText: {
    color: '#ccc',
  },
  tipsContainer: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
});

export default LessonDetailScreen;