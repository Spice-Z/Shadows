import { StyleSheet, View, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface PlaybackControlsProps {
  isPlaying: boolean;
  playbackSpeed: number;
  isRepeat: boolean;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onRepeatToggle: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export function PlaybackControls({
  isPlaying,
  playbackSpeed,
  isRepeat,
  onPlayPause,
  onSpeedChange,
  onRepeatToggle,
  onSkipBackward,
  onSkipForward,
}: PlaybackControlsProps) {
  const colorScheme = useColorScheme();

  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    onSpeedChange(SPEED_OPTIONS[nextIndex]);
  };

  return (
    <View style={styles.container}>
      {/* Speed Button */}
      <TouchableOpacity
        style={[
          styles.speedButton,
          {
            backgroundColor: Colors[colorScheme].surface,
          },
        ]}
        onPress={cycleSpeed}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.speedText}>
          {playbackSpeed.toFixed(1)}x
        </ThemedText>
      </TouchableOpacity>

      {/* Skip Backward */}
      <TouchableOpacity
        style={[
          styles.skipButton,
          {
            backgroundColor: Colors[colorScheme].surface,
          },
        ]}
        onPress={onSkipBackward}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="replay-10"
          size={30}
          color={Colors[colorScheme].text}
        />
      </TouchableOpacity>

      {/* Play/Pause Button */}
      <TouchableOpacity
        style={[
          styles.playButton,
          {
            backgroundColor: Colors[colorScheme].buttonPrimaryBg,
          },
        ]}
        onPress={onPlayPause}
        activeOpacity={0.9}
      >
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={36}
          color={Colors[colorScheme].buttonPrimaryText}
        />
      </TouchableOpacity>

      {/* Skip Forward */}
      <TouchableOpacity
        style={[
          styles.skipButton,
          {
            backgroundColor: Colors[colorScheme].surface,
          },
        ]}
        onPress={onSkipForward}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="forward-10"
          size={30}
          color={Colors[colorScheme].text}
        />
      </TouchableOpacity>

      {/* Repeat Button */}
      <TouchableOpacity
        style={[
          styles.repeatButton,
          {
            backgroundColor: Colors[colorScheme].surface,
          },
        ]}
        onPress={onRepeatToggle}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="repeat"
          size={24}
          color={
            isRepeat
              ? Colors[colorScheme].text
              : Colors[colorScheme].textSecondary
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  speedButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  speedText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  skipButton: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  repeatButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
