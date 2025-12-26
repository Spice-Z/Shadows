import { AudioListItemProps } from "@/components/AudioListItem";

export const mockAudioList: AudioListItemProps[] = [
  {
    title: "TED Talk: The Power of Habit",
    practiceCount: 24,
    sourceType: "import",
    duration: "04:12",
    lastPlayed: "昨日再生",
  },
  {
    title: "Global News Podcast #42",
    practiceCount: 8,
    sourceType: "import",
    duration: "12:30",
    lastPlayed: "2日前",
  },
  {
    title: "Daily Conversation: Restaurant",
    practiceCount: 0,
    sourceType: "import",
    duration: "02:15",
    lastPlayed: "未再生",
  },
];

export const mockStreakCount = 12;
