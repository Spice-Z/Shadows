import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        Explore
      </ThemedText>
      <ThemeSelector />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
