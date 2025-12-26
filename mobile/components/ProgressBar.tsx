import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

interface ProgressBarProps {
  currentTime: number; // seconds
  totalTime: number; // seconds
  onSeek?: (time: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ProgressBar({
  currentTime,
  totalTime,
  onSeek,
}: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = Math.min(currentTime / totalTime, 1);
  const progressPercentage = progress * 100;

  const handlePress = (event: any) => {
    if (!onSeek || containerWidth === 0) return;
    const { locationX } = event.nativeEvent;
    const newProgress = Math.max(0, Math.min(1, locationX / containerWidth));
    const newTime = newProgress * totalTime;
    onSeek(newTime);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.progressBarContainer}
        onPress={handlePress}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
        activeOpacity={1}
      >
        <View
          style={[
            styles.progressBarBackground,
            {
              backgroundColor: Colors[colorScheme].badgeBg,
            },
          ]}
        />
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ]}
        />
        <View
          style={[
            styles.progressBarThumb,
            {
              left: `${progressPercentage}%`,
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <ThemedText style={styles.timeText}>
          {formatTime(currentTime)}
        </ThemedText>
        <ThemedText style={styles.timeText}>{formatTime(totalTime)}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  progressBarContainer: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    position: "relative",
  },
  progressBarBackground: {
    position: "absolute",
    width: "100%",
    height: 2,
    borderRadius: 9999,
  },
  progressBarFill: {
    position: "absolute",
    height: 2,
    borderRadius: 9999,
  },
  progressBarThumb: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: "100%",
    marginLeft: -6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
  },
});
