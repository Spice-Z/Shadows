import { StyleSheet, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

interface AudioWaveformProps {
  currentTime: number; // seconds
  totalTime: number; // seconds
}

// Mock waveform data - in real app, this would come from audio analysis
const WAVEFORM_HEIGHTS = [24, 32, 48, 32, 56, 80, 40, 64, 96, 48, 56, 32, 20, 36, 48, 24, 16];

export function AudioWaveform({ currentTime, totalTime }: AudioWaveformProps) {
  const colorScheme = useColorScheme();
  const progress = currentTime / totalTime;
  const activeBars = Math.floor(progress * WAVEFORM_HEIGHTS.length);

  return (
    <View style={styles.container}>
      {WAVEFORM_HEIGHTS.map((height, index) => {
        const isActive = index < activeBars;
        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height,
                backgroundColor: isActive
                  ? Colors[colorScheme].buttonPrimaryBg
                  : Colors[colorScheme].badgeBg,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  bar: {
    width: 6,
    borderRadius: 9999,
    minHeight: 4,
  },
});

