import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const currentStreak = 7; // Sample data
  const dailyGoal = 15; // minutes
  const todayProgress = 8; // minutes completed

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4CAF50', '#45a049']}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.motivationText}>Ready to learn English today?</Text>
      </LinearGradient>

      {/* Daily Goal Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Goal</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(todayProgress / dailyGoal) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {todayProgress}/{dailyGoal} minutes
          </Text>
        </View>
      </View>

      {/* Streak Card */}
      <View style={styles.card}>
        <View style={styles.streakHeader}>
          <Icon name="flame" size={24} color="#FF6B35" />
          <Text style={styles.cardTitle}>Current Streak</Text>
        </View>
        <Text style={styles.streakNumber}>{currentStreak} days</Text>
        <Text style={styles.streakText}>Keep it up! You're doing great!</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Learn')}
          >
            <Icon name="book-outline" size={32} color="#007AFF" />
            <Text style={styles.actionText}>Start Lesson</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Icon name="stats-chart-outline" size={32} color="#4CAF50" />
            <Text style={styles.actionText}>View Progress</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Tip */}
      <View style={styles.card}>
        <View style={styles.tipHeader}>
          <Icon name="bulb-outline" size={20} color="#FFA500" />
          <Text style={styles.cardTitle}>Daily Tip</Text>
        </View>
        <Text style={styles.tipText}>
          Practice pronunciation by reading words aloud. This helps with both 
          speaking confidence and memory retention!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  motivationText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 5,
  },
  streakText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: (width - 45) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;