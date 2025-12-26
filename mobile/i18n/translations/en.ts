export default {
  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    done: "Done",
    next: "Next",
    back: "Back",
    settings: "Settings",
    ok: "OK",
  },

  // Tab navigation
  tabs: {
    home: "Home",
    practice: "Practice",
    analysis: "Analysis",
    explore: "Explore",
  },

  // Home screen
  home: {
    title: "Audio Library",
    addNewAudio: "Add New Audio",
    addNewAudioDescription: "Record or import a file to start learning",
    record: "Record",
    import: "Import",
    library: "Library",
    itemCount: "{{count}} items",
    lastPracticed: "Last practiced: {{date}}",
    sessions: "{{count}} sessions",
  },

  // Practice screen
  practice: {
    title: "Practice",
    comingSoon: "Practice screen coming soon",
  },

  // Analysis screen
  analysis: {
    title: "Analysis",
    consecutiveDays: "consecutive days",
    streakMessage: "Amazing consistency!",
    weeklyLearningTime: "Weekly Learning Time",
    total: "Total {{time}}",
    totalLearningTime: "Total Learning Time",
    totalSessions: "Total Sessions",
    hours: "h",
    minutes: "m",
    sessions: "sessions",
  },

  // Study screen
  study: {
    modelAudio: "Model Audio",
    myRecording: "My Recording",
  },

  // Explore screen
  explore: {
    title: "Explore",
    description: "This app includes example code to help you get started.",
    fileBasedRouting: "File-based routing",
    fileBasedRoutingDescription:
      "This app has two screens: app/(tabs)/index.tsx and app/(tabs)/explore.tsx",
    layoutDescription:
      "The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.",
    learnMore: "Learn more",
    platformSupport: "Android, iOS, and web support",
    platformSupportDescription:
      "You can open this project on Android, iOS, and the web. To open the web version, press w in the terminal running this project.",
    images: "Images",
    imagesDescription:
      "For static images, you can use the @2x and @3x suffixes to provide files for different screen densities",
    lightDarkMode: "Light and dark mode components",
    lightDarkModeDescription:
      "This template has light and dark mode support. The useColorScheme() hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly.",
    animations: "Animations",
    animationsDescription:
      "This template includes an example of an animated component. The components/HelloWave.tsx component uses the powerful react-native-reanimated library to create a waving hand animation.",
    parallaxDescription:
      "The components/ParallaxScrollView.tsx component provides a parallax effect for the header image.",
  },

  // Theme selector
  theme: {
    title: "Theme",
    light: "Light",
    dark: "Dark",
    auto: "Auto",
  },

  // Streak
  streak: {
    days: "{{count}} day streak",
    fire: "🔥",
  },

  // Calendar
  calendar: {
    weekdays: {
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
    },
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
    },
  },
} as const;

