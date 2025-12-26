import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useTheme } from "@/contexts/theme-context";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function ThemeSelector() {
  const { colorScheme, setColorScheme } = useTheme();
  const actualColorScheme = useColorScheme();

  const options: { value: "light" | "dark" | "auto"; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Auto" },
  ];

  return (
    <ThemedView variant="surface" style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Theme Selector (Debug)
      </ThemedText>
      <ThemedText type="secondary" style={styles.subtitle}>
        Current: {actualColorScheme} {colorScheme !== "auto" && `(forced)`}
      </ThemedText>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              colorScheme === option.value && styles.optionSelected,
              {
                backgroundColor:
                  colorScheme === option.value
                    ? Colors[actualColorScheme].buttonPrimaryBg
                    : Colors[actualColorScheme].surface,
                borderColor: Colors[actualColorScheme].border,
              },
            ]}
            onPress={() => setColorScheme(option.value)}
            activeOpacity={0.7}
          >
            <ThemedText
              style={[
                styles.optionText,
                {
                  color:
                    colorScheme === option.value
                      ? Colors[actualColorScheme].buttonPrimaryText
                      : Colors[actualColorScheme].text,
                },
              ]}
            >
              {option.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 12,
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
