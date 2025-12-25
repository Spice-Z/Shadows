import { StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

interface StreakTagProps {
  count: number;
}

export function StreakTag({ count }: StreakTagProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="local-fire-department"
        size={20}
        color={Colors[colorScheme].text}
      />
      <ThemedText style={styles.count}>{count}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  count: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
