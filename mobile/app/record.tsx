import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  transcribeAudioWithSFRecognizer,
  requestPermissions,
} from "expo-speech-transcriber";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { RecordButton } from "@/components/RecordButton";
import { RecordingWaveform } from "@/components/RecordingWaveform";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useAudioRecording,
  RecordingPreview,
  saveRecording,
} from "@/features/record";

export default function RecordScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    isRecording,
    hasRecording,
    durationSeconds,
    recordingUri,
    hasPermission,
    error,
    startRecording,
    stopRecording,
    discardRecording,
    requestPermission,
  } = useAudioRecording({
    onRecordingComplete: (result) => {
      console.log("Recording completed:", result.uri, result.duration);
    },
    onError: (err) => {
      console.error("Recording error:", err);
    },
  });

  useEffect(() => {
    if (hasPermission === false) {
      Alert.alert(
        t("record.permissionRequired"),
        t("record.permissionMessage"),
        [
          { text: t("common.cancel"), style: "cancel" },
          { text: t("common.ok"), onPress: requestPermission },
        ]
      );
    }
  }, [hasPermission, requestPermission, t]);

  useEffect(() => {
    if (error) {
      Alert.alert(t("common.error"), error);
    }
  }, [error, t]);

  const transcribeAudio = useCallback(async () => {
    if (!recordingUri) return;

    setIsTranscribing(true);
    try {
      await requestPermissions();
      const result = await transcribeAudioWithSFRecognizer(recordingUri);
      setTranscript(result);
    } catch (err) {
      console.error("Transcription error:", err);
      setTranscript(t("recordPreview.transcriptionFailed"));
    } finally {
      setIsTranscribing(false);
    }
  }, [recordingUri, t]);

  useEffect(() => {
    if (hasRecording && recordingUri) {
      transcribeAudio();
    }
  }, [hasRecording, recordingUri, transcribeAudio]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleRecordPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const handleDiscard = () => {
    discardRecording();
    setTitle("");
    setTranscript("");
  };

  const handleSave = async () => {
    if (!recordingUri) return;

    setIsSaving(true);
    try {
      await saveRecording(recordingUri);
      Alert.alert(t("record.saveSuccess"), t("record.saveSuccessMessage"));
      router.back();
    } catch {
      Alert.alert(t("common.error"), t("record.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <Header showBackButton onBackPress={() => router.back()} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.timerContainer}>
            <ThemedText style={styles.timer}>
              {formatTime(durationSeconds)}
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

          {!hasRecording && (
            <>
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
            </>
          )}

          {hasRecording && (
            <>
              <View style={styles.previewContainer}>
                <RecordingPreview
                  uri={recordingUri}
                  totalDurationSeconds={durationSeconds}
                />
              </View>

              <ThemedText style={styles.label}>
                {t("recordPreview.audioTitle")}
              </ThemedText>
              <TextInput
                style={[
                  styles.titleInput,
                  {
                    backgroundColor: Colors[colorScheme].surface,
                    color: Colors[colorScheme].text,
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
                value={title}
                onChangeText={setTitle}
                placeholder={t("recordPreview.audioTitlePlaceholder")}
                placeholderTextColor={Colors[colorScheme].textSecondary}
              />

              <ThemedText style={styles.label}>
                {t("recordPreview.transcript")}
              </ThemedText>
              <View
                style={[
                  styles.transcriptContainer,
                  {
                    backgroundColor: Colors[colorScheme].surface,
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
              >
                {isTranscribing ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator
                      size="small"
                      color={Colors[colorScheme].text}
                    />
                    <ThemedText
                      style={styles.loadingText}
                      color={Colors[colorScheme].textSecondary}
                    >
                      {t("recordPreview.transcribing")}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText
                    style={styles.transcriptText}
                    color={
                      transcript
                        ? Colors[colorScheme].text
                        : Colors[colorScheme].textSecondary
                    }
                  >
                    {transcript || t("recordPreview.noTranscript")}
                  </ThemedText>
                )}
              </View>

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    styles.discardButton,
                    { borderColor: Colors[colorScheme].border },
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
                      opacity: isTranscribing || isSaving ? 0.5 : 1,
                    },
                  ]}
                  onPress={handleSave}
                  activeOpacity={0.8}
                  disabled={isTranscribing || isSaving}
                >
                  {isSaving ? (
                    <ActivityIndicator
                      size="small"
                      color={Colors[colorScheme].buttonPrimaryText}
                    />
                  ) : (
                    <>
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
                        {t("common.save")}
                      </ThemedText>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </>
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
    height: 120,
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
  previewContainer: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  titleInput: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  transcriptContainer: {
    minHeight: 120,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
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
