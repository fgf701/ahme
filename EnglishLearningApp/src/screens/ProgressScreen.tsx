import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  // Sample data - in a real app, this would come from user state
  const userStats = {
    totalLessons: 4,
    completedLessons: 2,
    currentStreak: 7,
    totalXP: 350,
    level: 3,
    wordsLearned: 16,
    quizzesCompleted: 2,
    averageScore: 85,
  };

  const weeklyProgress = [
    { day: 'Mon', minutes: 15 },
    { day: 'Tue', minutes: 20 },
    { day: 'Wed', minutes: 12 },
    { day: 'Thu', minutes: 18 },
    { day: 'Fri', minutes: 25 },
    { day: 'Sat', minutes: 0 },
    { day: 'Sun', minutes: 30 },
  ];

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', earned: true, icon: 'trophy' },
    { id: 2, title: 'Quiz Master', description: 'Score 100% on a quiz', earned: true, icon: 'star' },
    { id: 3, title: 'Streak Master', description: 'Maintain a 7-day streak', earned: true, icon: 'flame' },
    { id: 4, title: 'Word Collector', description: 'Learn 50 words', earned: false, icon: 'library' },
    { id: 5, title: 'Dedication', description: 'Study for 30 days', earned: false, icon: 'medal' },
  ];

  const maxMinutes = Math.max(...weeklyProgress.map(day => day.minutes));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#007AFF', '#0056CC']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>Keep up the great work!</Text>
        </LinearGradient>

        {/* Level & XP */}
        <View style={styles.card}>
          <View style={styles.levelContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {userStats.level}</Text>
            </View>
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>{userStats.totalXP} XP</Text>
              <View style={styles.xpBar}>
                <View style={[styles.xpFill, { width: '60%' }]} />
              </View>
              <Text style={styles.xpNextLevel}>240 XP to Level {userStats.level + 1}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon name="book-outline" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{userStats.completedLessons}/{userStats.totalLessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="flame" size={24} color="#FF6B35" />
            <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="library-outline" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>{userStats.wordsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="checkmark-circle-outline" size={24} color="#9C27B0" />
            <Text style={styles.statNumber}>{userStats.averageScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week's Activity</Text>
          <View style={styles.chartContainer}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.chartDay}>
                <View style={styles.chartBar}>
                  <View
                    style={[
                      styles.chartBarFill,
                      {
                        height: maxMinutes > 0 ? `${(day.minutes / maxMinutes) * 100}%` : '0%',
                        backgroundColor: day.minutes > 0 ? '#007AFF' : '#e0e0e0',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.chartDayLabel}>{day.day}</Text>
                <Text style={styles.chartDayValue}>{day.minutes}m</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementItem,
                  !achievement.earned && styles.achievementLocked,
                ]}
              >
                <View
                  style={[
                    styles.achievementIcon,
                    achievement.earned ? styles.achievementIconEarned : styles.achievementIconLocked,
                  ]}
                >
                  <Icon
                    name={achievement.icon}
                    size={20}
                    color={achievement.earned ? '#FFD700' : '#ccc'}
                  />
                </View>
                <View style={styles.achievementText}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.earned && styles.achievementTitleLocked,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text
                    style={[
                      styles.achievementDescription,
                      !achievement.earned && styles.achievementDescriptionLocked,
                    ]}
                  >
                    {achievement.description}
                  </Text>
                </View>
                {achievement.earned && (
                  <Icon name="checkmark-circle" size={20} color="#4CAF50" />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
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
    marginBottom: 15,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
  },
  levelText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  xpContainer: {
    flex: 1,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  xpNextLevel: {
    fontSize: 12,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  statCard: {
    backgroundColor: 'white',
    width: (width - 45) / 2,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartDay: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    height: 80,
    width: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 10,
    minHeight: 2,
  },
  chartDayLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  chartDayValue: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  achievementsContainer: {
    gap: 15,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementIconEarned: {
    backgroundColor: '#fff3cd',
  },
  achievementIconLocked: {
    backgroundColor: '#f0f0f0',
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  achievementTitleLocked: {
    color: '#999',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  achievementDescriptionLocked: {
    color: '#ccc',
  },
});

export default ProgressScreen;