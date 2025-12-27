import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";

export type StudyMode = "listen" | "record";

interface StudyModeToggleProps {
  value: StudyMode;
  onChange: (value: StudyMode) => void;
}

export function StudyModeToggle({ value, onChange }: StudyModeToggleProps) {
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
          value === "listen" && [
            styles.optionSelected,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ],
        ]}
        onPress={() => onChange("listen")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={[
            styles.optionText,
            value === "listen" && {
              color: Colors[colorScheme].buttonPrimaryText,
            },
            value !== "listen" && {
              color: Colors[colorScheme].textSecondary,
            },
          ]}
        >
          {t("study.listen")}
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          value === "record" && [
            styles.optionSelected,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ],
        ]}
        onPress={() => onChange("record")}
        activeOpacity={0.8}
      >
        <ThemedText
          style={[
            styles.optionText,
            value === "record" && {
              color: Colors[colorScheme].buttonPrimaryText,
            },
            value !== "record" && {
              color: Colors[colorScheme].textSecondary,
            },
          ]}
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

