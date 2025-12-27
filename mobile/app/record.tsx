import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { RecordButton } from "@/components/RecordButton";
import { RecordingWaveform } from "@/components/RecordingWaveform";
import { useTranslation } from "@/hooks/useTranslation";

export default function RecordScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRecordPress = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording(true);
    } else {
      setIsRecording(true);
      if (!hasRecording) {
        setRecordingTime(0);
      }
    }
  };

  const handleDiscard = () => {
    setHasRecording(false);
    setRecordingTime(0);
    setIsRecording(false);
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <Header showBackButton onBackPress={() => router.back()} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.timerContainer}>
            <ThemedText style={styles.timer}>
              {formatTime(recordingTime)}
            </ThemedText>
            <ThemedText
              style={styles.statusText}
              color={
                isRecording ? "#EF4444" : Colors[colorScheme].textSecondary
              }
            >
              {isRecording
                ? t("record.recording")
                : hasRecording
                ? t("record.recordingComplete")
                : t("record.tapToRecord")}
            </ThemedText>
          </View>

          <View style={styles.waveformContainer}>
            <RecordingWaveform isRecording={isRecording} />
          </View>

          <View style={styles.recordButtonContainer}>
            <RecordButton
              isRecording={isRecording}
              onPress={handleRecordPress}
            />
            {isRecording && (
              <ThemedText
                style={styles.tapToStopText}
                color={Colors[colorScheme].textSecondary}
              >
                {t("record.tapToStop")}
              </ThemedText>
            )}
          </View>

          {hasRecording && !isRecording && (
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.discardButton,
                  {
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
                onPress={handleDiscard}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={Colors[colorScheme].text}
                />
                <ThemedText style={styles.actionButtonText}>
                  {t("record.discard")}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.saveButton,
                  {
                    backgroundColor: Colors[colorScheme].buttonPrimaryBg,
                  },
                ]}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="check"
                  size={20}
                  color={Colors[colorScheme].buttonPrimaryText}
                />
                <ThemedText
                  style={[
                    styles.actionButtonText,
                    { color: Colors[colorScheme].buttonPrimaryText },
                  ]}
                >
                  {t("record.save")}
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  timer: {
    fontSize: 64,
    fontWeight: "200",
    letterSpacing: -2,
    fontVariant: ["tabular-nums"],
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8,
  },
  waveformContainer: {
    width: "100%",
    flex: 1,
    minHeight: 200,
    marginBottom: 48,
    justifyContent: "center",
  },
  recordButtonContainer: {
    alignItems: "center",
    marginBottom: 48,
    gap: 16,
  },
  tapToStopText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: 12,
  },
  discardButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  saveButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
