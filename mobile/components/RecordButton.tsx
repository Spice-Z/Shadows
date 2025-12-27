import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

export function RecordButton({ isRecording, onPress }: RecordButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.outerRing,
          {
            borderColor: isRecording
              ? "#EF4444"
              : Colors[colorScheme].textSecondary,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isRecording ? "#EF4444" : "#EF4444",
            },
            isRecording && styles.buttonRecording,
          ]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          {isRecording ? (
            <View style={styles.stopIcon} />
          ) : (
            <MaterialIcons name="mic" size={40} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerRing: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonRecording: {
    borderRadius: 16,
    width: 56,
    height: 56,
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
});
