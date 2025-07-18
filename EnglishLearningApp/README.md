# English Learning App

A simplified mobile app for learning English vocabulary, similar to Duolingo but focused specifically on English language learning with a clean, user-friendly interface.

## Features

### 🏠 Home Screen
- Welcome dashboard with daily goals
- Progress tracking with visual indicators
- Current streak counter with motivation
- Quick access to lessons and progress
- Daily learning tips

### 📚 Lessons
- Interactive vocabulary lessons organized by categories
- Word cards with phonetic pronunciations
- Definitions and example sentences
- Progress tracking for each lesson
- Difficulty levels (Beginner, Intermediate, Advanced)

### 🧠 Quizzes
- Multiple choice questions
- Translation exercises
- Immediate feedback with explanations
- Score tracking and performance analytics
- Review mode for incorrect answers

### 📊 Progress Tracking
- User level and XP system
- Weekly activity charts
- Achievement badges
- Statistics dashboard
- Learning streaks

### 👤 Profile & Settings
- User profile management
- App settings (notifications, sound, theme)
- Study reminders
- Offline lesson downloads (coming soon)
- Social features for sharing progress

## Technology Stack

- **React Native 0.80.1** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation between screens
- **React Native Vector Icons** - Beautiful iconography
- **React Native Linear Gradient** - Gradient backgrounds
- **React Native Gesture Handler** - Smooth gestures
- **React Native Reanimated** - Smooth animations

## Getting Started

### Prerequisites

- Node.js (>= 18.x)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd EnglishLearningApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Link vector icons:**
   ```bash
   npx react-native-asset
   ```

### Running the App

#### For Android:
```bash
npm run android
```

#### For iOS:
```bash
npm run ios
```

#### Start Metro bundler:
```bash
npm start
```

## Project Structure

```
EnglishLearningApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Lesson/         # Lesson-related components
│   │   ├── Progress/       # Progress tracking components
│   │   └── Quiz/           # Quiz components
│   ├── data/               # Sample data and mock APIs
│   │   ├── lessons.ts      # Lesson data
│   │   └── quizzes.ts      # Quiz data
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── LessonsScreen.tsx
│   │   ├── LessonDetailScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
└── App.tsx                 # Main app component
```

## Key Features Explained

### 📱 Lesson System
- **Interactive Learning**: Tap cards to flip between words and definitions
- **Progressive Difficulty**: Lessons are categorized by difficulty level
- **Visual Feedback**: Progress bars and completion indicators
- **Category Organization**: Words grouped by themes (greetings, food, family, etc.)

### 🎯 Quiz System
- **Multiple Question Types**: Multiple choice and translation exercises
- **Instant Feedback**: Immediate right/wrong feedback with explanations
- **Adaptive Scoring**: Percentage-based scoring system
- **Review Mode**: Option to review incorrect answers

### 📈 Progress Tracking
- **XP System**: Earn experience points for completing lessons and quizzes
- **Achievement Badges**: Unlock achievements for various milestones
- **Daily Goals**: Set and track daily learning targets
- **Streak Counter**: Maintain learning streaks for motivation

## Sample Data

The app comes with pre-loaded content including:

### Lesson Categories:
- **Basic Greetings**: Hello, Goodbye, etc.
- **Politeness & Manners**: Please, Thank you, etc.
- **Food & Drinks**: Water, Food, etc.
- **Home & Family**: House, Family, etc.

### Quiz Types:
- Multiple choice questions
- Translation exercises
- Definition matching

## Customization

### Adding New Lessons
1. Edit `src/data/lessons.ts`
2. Add new words with categories
3. Create corresponding quizzes in `src/data/quizzes.ts`

### Modifying UI Theme
- Colors and styles are defined in each component's StyleSheet
- Consider extracting to a theme configuration file for consistency

### Adding New Features
1. Create new components in appropriate folders
2. Add navigation routes if needed
3. Update TypeScript types in `src/types/index.ts`

## Development Notes

### Icon Usage
- Using Ionicons from react-native-vector-icons
- Icons are automatically linked via react-native.config.js
- Consistent icon naming throughout the app

### State Management
- Currently using React hooks and local state
- Consider adding Redux or Zustand for complex state management
- AsyncStorage integration for data persistence

### Performance Considerations
- Images and assets are optimized
- Lazy loading for large lists
- Smooth animations with React Native Reanimated

## Future Enhancements

### Phase 2 Features:
- [ ] Audio pronunciation for words
- [ ] Speech recognition for pronunciation practice
- [ ] Offline lesson downloads
- [ ] Social features and leaderboards
- [ ] Advanced grammar lessons
- [ ] Video content integration
- [ ] AI-powered personalized learning paths

### Technical Improvements:
- [ ] State management with Redux/Zustand
- [ ] Data persistence with AsyncStorage/SQLite
- [ ] API integration for dynamic content
- [ ] Push notifications for study reminders
- [ ] Analytics integration
- [ ] Unit and integration testing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@englishlearningapp.com or create an issue in the repository.

---

**Happy Learning! 🎉**

Start your English learning journey today with our simplified, focused approach to vocabulary building!
