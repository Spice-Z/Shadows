import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";

interface AudioSourceToggleProps {
  value: "model" | "recording";
  onChange: (value: "model" | "recording") => void;
}

export function AudioSourceToggle({ value, onChange }: AudioSourceToggleProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].badgeBg,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.option,
          value === "model" && [
            styles.optionSelected,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ],
        ]}
        onPress={() => onChange("model")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={[
            styles.optionText,
            value === "model" && {
              color: Colors[colorScheme].buttonPrimaryText,
            },
            value !== "model" && {
              color: Colors[colorScheme].textSecondary,
            },
          ]}
        >
          {t("study.modelAudio")}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          value === "recording" && [
            styles.optionSelected,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ],
        ]}
        onPress={() => onChange("recording")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={[
            styles.optionText,
            value === "recording" && {
              color: Colors[colorScheme].buttonPrimaryText,
            },
            value !== "recording" && {
              color: Colors[colorScheme].textSecondary,
            },
          ]}
        >
          {t("study.myRecording")}
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
    padding: 4,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    paddingHorizontal: 8,
  },
  optionSelected: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
