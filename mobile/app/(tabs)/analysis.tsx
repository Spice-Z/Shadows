import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function AnalysisScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">分析</ThemedText>
      <ThemedText>Analysis screen coming soon...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
