import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

interface StreakDisplayProps {
  days: number;
  message?: string;
}

export function StreakDisplay({ days, message = "素晴らしい継続力です！" }: StreakDisplayProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialIcons
          name="local-fire-department"
          size={64}
          color={Colors[colorScheme].text}
        />
        <View style={styles.streakContainer}>
          <ThemedText style={styles.days}>{days}</ThemedText>
          <ThemedText type="secondary" style={styles.label}>
            日連続
          </ThemedText>
        </View>
        <ThemedText type="secondary" style={styles.message}>
          {message}
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
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});

