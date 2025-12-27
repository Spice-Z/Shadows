import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface TranscriptProps {
  text?: string;
}

export function Transcript({
  text = "This is a sample transcript. It represents the audio content that has been transcribed. The text should flow naturally and be easy to read.",
}: TranscriptProps) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].surface },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText size="lg">{text}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    padding: 16,
  },
});
