import { useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface RecordingWaveformProps {
  isRecording: boolean;
}

const BAR_COUNT = 17;

export function RecordingWaveform({ isRecording }: RecordingWaveformProps) {
  const colorScheme = useColorScheme();
  const animatedValues = useRef(
    Array.from({ length: BAR_COUNT }, () => new Animated.Value(24))
  ).current;

  useEffect(() => {
    if (isRecording) {
      const animations = animatedValues.map((anim, index) => {
        const randomDelay = index * 50;
        const randomDuration = 300 + Math.random() * 200;

        return Animated.loop(
          Animated.sequence([
            Animated.delay(randomDelay),
            Animated.timing(anim, {
              toValue: 32 + Math.random() * 64,
              duration: randomDuration,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 16 + Math.random() * 24,
              duration: randomDuration,
              useNativeDriver: false,
            }),
          ])
        );
      });

      Animated.parallel(animations).start();

      return () => {
        animations.forEach((anim) => anim.stop());
      };
    } else {
      animatedValues.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 24,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isRecording, animatedValues]);

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedHeight, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animatedHeight,
              backgroundColor: isRecording
                ? "#EF4444"
                : Colors[colorScheme].badgeBg,
            },
          ]}
        />
      ))}
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
