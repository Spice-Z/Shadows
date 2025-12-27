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
import { AudioSourceToggle } from "@/components/AudioSourceToggle";
import { AudioWaveform } from "@/components/AudioWaveform";
import { ProgressBar } from "@/components/ProgressBar";
import { PlaybackControls } from "@/components/PlaybackControls";
import { mockAudioList } from "@/data/mock-audio";
import {
  useAudioPlayback,
  getRecordingPath,
  hasRecordingSaved,
} from "@/features/record";
import { useTranslation } from "@/hooks/useTranslation";

export default function StudyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [audioSource, setAudioSource] = useState<"model" | "recording">(
    "model"
  );
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [hasModelAudio, setHasModelAudio] = useState(false);

  const audioData = useMemo(() => {
    const audioIndex = parseInt(id || "0", 10);
    return mockAudioList[audioIndex] || mockAudioList[0];
  }, [id]);

  const modelAudioUri = useMemo(() => {
    if (hasRecordingSaved()) {
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
  } = useAudioPlayback(audioSource === "model" ? modelAudioUri : null);

  useEffect(() => {
    setHasModelAudio(hasRecordingSaved());
  }, []);

  const isPlaying = audioSource === "model" ? isModelPlaying : false;
  const currentTime = audioSource === "model" ? modelPosition : 0;
  const totalTime = audioSource === "model" ? modelDuration || 60 : 60;

  const handlePlayPause = useCallback(() => {
    if (audioSource === "model") {
      toggleModelPlayPause();
    }
  }, [audioSource, toggleModelPlayPause]);

  const handleSeek = useCallback(
    (time: number) => {
      if (audioSource === "model") {
        seekModel(time);
      }
    },
    [audioSource, seekModel]
  );

  const handleSkipBackward = useCallback(() => {
    handleSeek(Math.max(0, currentTime - 10));
  }, [currentTime, handleSeek]);

  const handleSkipForward = useCallback(() => {
    handleSeek(Math.min(totalTime, currentTime + 10));
  }, [currentTime, totalTime, handleSeek]);

  const title = audioData.title;
  const showNoModelMessage = audioSource === "model" && !hasModelAudio;
  const showNoRecordingMessage = audioSource === "recording";

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
            {showNoModelMessage ? (
              <View style={styles.noRecordingContainer}>
                <MaterialIcons
                  name="music-off"
                  size={48}
                  color={Colors[colorScheme].textSecondary}
                />
                <ThemedText
                  style={styles.noRecordingText}
                  color={Colors[colorScheme].textSecondary}
                >
                  {t("study.noModelAudioYet")}
                </ThemedText>
              </View>
            ) : showNoRecordingMessage ? (
              <View style={styles.noRecordingContainer}>
                <MaterialIcons
                  name="mic-off"
                  size={48}
                  color={Colors[colorScheme].textSecondary}
                />
                <ThemedText
                  style={styles.noRecordingText}
                  color={Colors[colorScheme].textSecondary}
                >
                  {t("study.noRecordingYet")}
                </ThemedText>
              </View>
            ) : (
              <AudioWaveform currentTime={currentTime} totalTime={totalTime} />
            )}
          </View>

          <View style={styles.toggleContainer}>
            <AudioSourceToggle value={audioSource} onChange={setAudioSource} />
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar
              currentTime={currentTime}
              totalTime={totalTime}
              onSeek={handleSeek}
            />
          </View>

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
  noRecordingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  noRecordingText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
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
