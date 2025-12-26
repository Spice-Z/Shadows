import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { Spacer } from "./Spacer";

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
          <ThemedText size="5xl" weight="bold" style={styles.days}>
            {days}
          </ThemedText>
          <ThemedText
            color={Colors[colorScheme].textSecondary}
            size="lg"
            weight="bold"
          >
            {t("analysis.consecutiveDays")}
          </ThemedText>
        </View>
        <Spacer y={4} />
        <ThemedText
          color={Colors[colorScheme].textSecondary}
          size="sm"
          weight="medium"
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
});
