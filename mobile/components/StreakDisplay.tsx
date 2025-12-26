import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";

interface StreakDisplayProps {
  days: number;
  message?: string;
}

export function StreakDisplay({ days, message }: StreakDisplayProps) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="local-fire-department"
          size={64}
          color={Colors[colorScheme].text}
        />
        <View style={styles.streakContainer}>
          <ThemedText size="5xl" style={styles.days}>
            {days}
          </ThemedText>
          <ThemedText
            color={Colors[colorScheme].textSecondary}
            size="lg"
            style={styles.label}
          >
            {t("analysis.consecutiveDays")}
          </ThemedText>
        </View>
        <ThemedText
          color={Colors[colorScheme].textSecondary}
          size="sm"
          style={styles.message}
        >
          {message ?? t("analysis.streakMessage")}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  content: {
    alignItems: "center",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 8,
  },
  days: {
    fontWeight: "bold",
    letterSpacing: -1,
  },
  label: {
    fontWeight: "bold",
  },
  message: {
    fontWeight: "500",
    marginTop: 4,
  },
});
