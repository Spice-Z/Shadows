import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export function AddNewAudio() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      variant="surface"
      style={[styles.container, { borderColor: Colors[colorScheme].border }]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.title}>新しい音源を追加</ThemedText>
          <ThemedText type="secondary" style={styles.description}>
            録音またはファイルをインポートして学習を開始
          </ThemedText>
        </View>
        <MaterialIcons
          name="add-circle-outline"
          size={24}
          color={Colors[colorScheme].textSecondary}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.primaryButton,
            {
              backgroundColor: Colors[colorScheme].buttonPrimaryBg,
            },
          ]}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="mic"
            size={18}
            color={Colors[colorScheme].buttonPrimaryText}
          />
          <ThemedText
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonPrimaryText },
            ]}
          >
            録音
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.secondaryButton,
            {
              borderColor: Colors[colorScheme].border,
            },
          ]}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="file-upload"
            size={18}
            color={Colors[colorScheme].text}
          />
          <ThemedText style={styles.buttonText}>インポート</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryButton: {},
  secondaryButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
