import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useMemo, useEffect, useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { StudyModeToggle, StudyMode } from "@/components/StudyModeToggle";
import { Transcript } from "@/components/Transcript";
import { ProgressBar } from "@/components/ProgressBar";
import { PlaybackControls } from "@/components/PlaybackControls";
import { Spacer } from "@/components/Spacer";
import { mockAudioList } from "@/data/mock-audio";
import {
  useAudioPlayback,
  getRecordingPath,
  hasRecordingSaved,
} from "@/features/record";

export default function StudyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [studyMode, setStudyMode] = useState<StudyMode>("listen");
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [hasModelAudio, setHasModelAudio] = useState(false);

  const audioData = useMemo(() => {
    const audioIndex = parseInt(id || "0", 10);
    return mockAudioList[audioIndex] || mockAudioList[0];
  }, [id]);

  const modelAudioUri = useMemo(() => {
    if (hasModelAudio) {
      return getRecordingPath();
    }
    return null;
  }, [hasModelAudio]);

  const {
    isPlaying: isModelPlaying,
    positionSeconds: modelPosition,
    durationSeconds: modelDuration,
    togglePlayPause: toggleModelPlayPause,
    seekTo: seekModel,
  } = useAudioPlayback(studyMode === "listen" ? modelAudioUri : null);

  useEffect(() => {
    setHasModelAudio(hasRecordingSaved());
  }, []);

  const isPlaying = studyMode === "listen" ? isModelPlaying : false;
  const currentTime = studyMode === "listen" ? modelPosition : 0;
  const totalTime = studyMode === "listen" ? modelDuration || 60 : 60;

  const handlePlayPause = useCallback(() => {
    if (studyMode === "listen") {
      toggleModelPlayPause();
    }
  }, [studyMode, toggleModelPlayPause]);

  const handleSeek = useCallback(
    (time: number) => {
      if (studyMode === "listen") {
        seekModel(time);
      }
    },
    [studyMode, seekModel]
  );

  const handleSkipBackward = useCallback(() => {
    handleSeek(Math.max(0, currentTime - 10));
  }, [currentTime, handleSeek]);

  const handleSkipForward = useCallback(() => {
    handleSeek(Math.min(totalTime, currentTime + 10));
  }, [currentTime, totalTime, handleSeek]);

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
          <Spacer y={24} />
          <View style={styles.titleContainer}>
            <ThemedText size="2xl" weight="bold" align="center">
              {title}
            </ThemedText>
          </View>
          <Spacer y={24} />

          <View style={styles.transcriptContainer}>
            <Transcript />
          </View>
          <Spacer y={48} />

          <View style={styles.progressContainer}>
            <ProgressBar
              currentTime={currentTime}
              totalTime={totalTime}
              onSeek={handleSeek}
            />
          </View>
          <Spacer y={32} />

          <View style={styles.controlsContainer}>
            <PlaybackControls
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              isRepeat={isRepeat}
              onPlayPause={handlePlayPause}
              onSpeedChange={setPlaybackSpeed}
              onRepeatToggle={() => setIsRepeat(!isRepeat)}
              onSkipBackward={handleSkipBackward}
              onSkipForward={handleSkipForward}
            />
          </View>
          <Spacer y={48} />

          <View style={styles.toggleContainer}>
            <StudyModeToggle value={studyMode} onChange={setStudyMode} />
          </View>
          <Spacer y={32} />

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
    paddingBottom: 32,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  toggleContainer: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 24,
  },
  transcriptContainer: {
    width: "100%",
  },
  progressContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  controlsContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  settingsContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
});
