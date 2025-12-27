import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";

export type StudyMode = "listen" | "record";

interface StudyModeToggleProps {
  value: StudyMode;
  onChange: (value: StudyMode) => void;
}

const PADDING = 4;

export function StudyModeToggle({ value, onChange }: StudyModeToggleProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useSharedValue(0);

  const indicatorWidth =
    containerWidth > 0 ? (containerWidth - PADDING * 2) / 2 : 0;

  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
    translateX.value = value === "listen" ? 0 : indicatorWidth;
  };

  const handleChange = (newValue: StudyMode) => {
    const targetX = newValue === "listen" ? 0 : indicatorWidth;
    translateX.value = withTiming(targetX, { duration: 200 });
    onChange(newValue);
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].badgeBg },
      ]}
      onLayout={handleLayout}
    >
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
              width: indicatorWidth,
            },
            indicatorStyle,
          ]}
        />
      )}
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleChange("listen")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={styles.optionText}
          color={
            value === "listen"
              ? Colors[colorScheme].buttonPrimaryText
              : Colors[colorScheme].textSecondary
          }
        >
          {t("study.listen")}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleChange("record")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={styles.optionText}
          color={
            value === "record"
              ? Colors[colorScheme].buttonPrimaryText
              : Colors[colorScheme].textSecondary
          }
        >
          {t("study.record")}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    borderRadius: 9999,
    padding: PADDING,
  },
  indicator: {
    position: "absolute",
    top: PADDING,
    left: PADDING,
    height: 40,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
