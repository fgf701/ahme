#!/bin/bash

# English Learning App - Project Copy Script
# This script helps you copy the complete project to a new location

echo "=== English Learning App - Project Copy Script ==="
echo ""

# Check if source directory exists
if [ ! -d "EnglishLearningApp" ]; then
    echo "❌ Error: EnglishLearningApp directory not found in current location"
    echo "Please run this script from the workspace root directory"
    exit 1
fi

# Get destination path from user
read -p "Enter destination path (or press Enter for ./EnglishLearningApp_copy): " DEST_PATH

# Set default if empty
if [ -z "$DEST_PATH" ]; then
    DEST_PATH="./EnglishLearningApp_copy"
fi

echo ""
echo "📁 Copying project to: $DEST_PATH"
echo ""

# Create destination directory
mkdir -p "$DEST_PATH"

# Copy essential files and directories
echo "📋 Copying core files..."
cp -r EnglishLearningApp/src "$DEST_PATH/"
cp EnglishLearningApp/package.json "$DEST_PATH/"
cp EnglishLearningApp/App.tsx "$DEST_PATH/"
cp EnglishLearningApp/index.js "$DEST_PATH/"
cp EnglishLearningApp/app.json "$DEST_PATH/"
cp EnglishLearningApp/tsconfig.json "$DEST_PATH/"
cp EnglishLearningApp/babel.config.js "$DEST_PATH/"
cp EnglishLearningApp/metro.config.js "$DEST_PATH/"
cp EnglishLearningApp/jest.config.js "$DEST_PATH/"
cp EnglishLearningApp/.eslintrc.js "$DEST_PATH/"
cp EnglishLearningApp/.prettierrc.js "$DEST_PATH/"
cp EnglishLearningApp/.gitignore "$DEST_PATH/"
cp EnglishLearningApp/.watchmanconfig "$DEST_PATH/"
cp EnglishLearningApp/Gemfile "$DEST_PATH/"
cp EnglishLearningApp/README.md "$DEST_PATH/"

echo "📱 Copying platform directories..."
cp -r EnglishLearningApp/android "$DEST_PATH/"
cp -r EnglishLearningApp/ios "$DEST_PATH/"

echo "🧪 Copying test directory..."
if [ -d "EnglishLearningApp/__tests__" ]; then
    cp -r EnglishLearningApp/__tests__ "$DEST_PATH/"
fi

echo ""
echo "✅ Project copied successfully!"
echo ""
echo "📋 Next steps:"
echo "1. cd $DEST_PATH"
echo "2. npm install"
echo "3. npm run android (or npm run ios)"
echo ""
echo "📊 Project Summary:"
echo "- 🎯 Complete React Native TypeScript app"
echo "- 📚 6 functional screens with navigation"
echo "- 🎮 Gamified learning system"
echo "- 📈 Progress tracking and achievements"
echo "- 🎨 Modern UI with animations"
echo "- 📱 Ready for Android/iOS deployment"
echo ""
echo "🗂️ Key Files:"
find "$DEST_PATH/src" -name "*.tsx" -o -name "*.ts" | head -10 | while read file; do
    echo "   - $(basename "$file")"
done
echo ""
echo "Happy coding! 🚀"