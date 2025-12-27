import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useMemo } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { AudioSourceToggle } from "@/components/AudioSourceToggle";
import { AudioWaveform } from "@/components/AudioWaveform";
import { ProgressBar } from "@/components/ProgressBar";
import { PlaybackControls } from "@/components/PlaybackControls";
import { mockAudioList } from "@/data/mock-audio";

export default function StudyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [audioSource, setAudioSource] = useState<"model" | "recording">(
    "model"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(45); // seconds

  // Get audio data based on id
  const audioData = useMemo(() => {
    const audioIndex = parseInt(id || "0", 10);
    return mockAudioList[audioIndex] || mockAudioList[0];
  }, [id]);

  // Parse duration from audio data (format: "MM:SS")
  const totalTime = useMemo(() => {
    const [minutes, seconds] = audioData.duration.split(":").map(Number);
    return minutes * 60 + seconds;
  }, [audioData.duration]);

  const title = audioData.title;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <Header
          showBackButton
          onBackPress={() => router.back()}
          rightElement={
            <TouchableOpacity
              style={styles.headerButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name="more-horiz"
                size={24}
                color={Colors[colorScheme].text}
              />
            </TouchableOpacity>
          }
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.title}>{title}</ThemedText>

          <View style={styles.waveformContainer}>
            <AudioWaveform currentTime={currentTime} totalTime={totalTime} />
          </View>

          <View style={styles.toggleContainer}>
            <AudioSourceToggle value={audioSource} onChange={setAudioSource} />
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar
              currentTime={currentTime}
              totalTime={totalTime}
              onSeek={(time) => setCurrentTime(time)}
            />
          </View>

          <View style={styles.controlsContainer}>
            <PlaybackControls
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              isRepeat={isRepeat}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onSpeedChange={setPlaybackSpeed}
              onRepeatToggle={() => setIsRepeat(!isRepeat)}
              onSkipBackward={() =>
                setCurrentTime(Math.max(0, currentTime - 10))
              }
              onSkipForward={() =>
                setCurrentTime(Math.min(totalTime, currentTime + 10))
              }
            />
          </View>

          <View style={styles.settingsContainer}>
            <TouchableOpacity
              style={styles.settingsButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={Colors[colorScheme].textSecondary}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 40,
  },
  toggleContainer: {
    width: "100%",
    maxWidth: 320,
    marginBottom: 40,
  },
  waveformContainer: {
    width: "100%",
    flex: 1,
    minHeight: 200,
    marginBottom: 32,
  },
  progressContainer: {
    width: "100%",
    marginBottom: 48,
  },
  controlsContainer: {
    width: "100%",
    maxWidth: 384,
    marginBottom: "auto",
  },
  settingsContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    marginTop: 32,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
});
