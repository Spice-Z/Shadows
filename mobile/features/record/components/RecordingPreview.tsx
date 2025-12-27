import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useAudioPlayback } from "../hooks/useAudioPlayback";

interface RecordingPreviewProps {
  uri: string | null;
  totalDurationSeconds: number;
}

export function RecordingPreview({
  uri,
  totalDurationSeconds,
}: RecordingPreviewProps) {
  const colorScheme = useColorScheme();
  const { isPlaying, positionSeconds, progress, togglePlayPause, seekTo } =
    useAudioPlayback(uri);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleProgressPress = (event: {
    nativeEvent: { locationX: number };
  }) => {
    const progressBarWidth = 200; // Approximate width
    const tapPosition = event.nativeEvent.locationX;
    const seekPosition =
      (tapPosition / progressBarWidth) * totalDurationSeconds;
    seekTo(Math.max(0, Math.min(seekPosition, totalDurationSeconds)));
  };

  if (!uri) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.card, { backgroundColor: Colors[colorScheme].surface }]}
      >
        {/* Play/Pause Button */}
        <TouchableOpacity
          style={[
            styles.playButton,
            { backgroundColor: Colors[colorScheme].buttonPrimaryBg },
          ]}
          onPress={togglePlayPause}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={28}
            color={Colors[colorScheme].buttonPrimaryText}
          />
        </TouchableOpacity>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          {/* Time Display */}
          <View style={styles.timeContainer}>
            <ThemedText
              style={styles.timeText}
              color={Colors[colorScheme].textSecondary}
            >
              {formatTime(positionSeconds)}
            </ThemedText>
            <ThemedText
              style={styles.timeText}
              color={Colors[colorScheme].textSecondary}
            >
              {formatTime(totalDurationSeconds)}
            </ThemedText>
          </View>

          {/* Progress Bar */}
          <TouchableOpacity
            style={styles.progressBarContainer}
            onPress={handleProgressPress}
            activeOpacity={1}
          >
            <View
              style={[
                styles.progressBar,
                { backgroundColor: Colors[colorScheme].border },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: Colors[colorScheme].buttonPrimaryBg,
                    width: `${progress * 100}%`,
                  },
                ]}
              />
              <View
                style={[
                  styles.progressThumb,
                  {
                    backgroundColor: Colors[colorScheme].buttonPrimaryBg,
                    left: `${progress * 100}%`,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressSection: {
    flex: 1,
    gap: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
    fontVariant: ["tabular-nums"],
  },
  progressBarContainer: {
    height: 20,
    justifyContent: "center",
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "visible",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressThumb: {
    position: "absolute",
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: -6,
  },
});
