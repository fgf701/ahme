import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { sampleLessons } from '../data/lessons';
import { Lesson } from '../types';

interface Props {
  navigation: any;
}

const LessonsScreen: React.FC<Props> = ({ navigation }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#4CAF50';
    }
  };

  const renderLessonCard = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
    >
      <View style={styles.lessonHeader}>
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lessonDescription}>{item.description}</Text>
        </View>
        <View style={styles.lessonMeta}>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text style={styles.difficultyText}>
              {item.difficulty.toUpperCase()}
            </Text>
          </View>
          {item.completed && (
            <Icon name="checkmark-circle" size={24} color="#4CAF50" />
          )}
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.progress}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{item.progress}% Complete</Text>
      </View>

      <View style={styles.lessonStats}>
        <View style={styles.stat}>
          <Icon name="book-outline" size={16} color="#666" />
          <Text style={styles.statText}>{item.words.length} words</Text>
        </View>
        <View style={styles.stat}>
          <Icon name="time-outline" size={16} color="#666" />
          <Text style={styles.statText}>~{item.words.length * 2} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>English Lessons</Text>
        <Text style={styles.headerSubtitle}>
          Choose a lesson to start learning
        </Text>
      </View>

      <FlatList
        data={sampleLessons}
        renderItem={renderLessonCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 15,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  lessonInfo: {
    flex: 1,
    marginRight: 15,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lessonMeta: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  lessonStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default LessonsScreen;