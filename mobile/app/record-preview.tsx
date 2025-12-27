import { useEffect, useState } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
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
import { useTranslation } from "@/hooks/useTranslation";
import { RecordingPreview, saveRecording } from "@/features/record";

export default function RecordPreviewScreen() {
  const router = useRouter();
  const { uri, duration } = useLocalSearchParams<{
    uri: string;
    duration: string;
  }>();
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const durationSeconds = parseInt(duration || "0", 10);

  const transcribeAudio = async () => {
    if (!uri) return;

    setIsTranscribing(true);
    try {
      await requestPermissions();
      const result = await transcribeAudioWithSFRecognizer(uri);
      setTranscript(result);
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscript(t("recordPreview.transcriptionFailed"));
    } finally {
      setIsTranscribing(false);
    }
  };

  useEffect(() => {
    if (uri) {
      transcribeAudio();
    }
  }, [uri]);

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!uri) return;

    setIsSaving(true);
    try {
      await saveRecording(uri);
      Alert.alert(t("record.saveSuccess"), t("record.saveSuccessMessage"));
      router.dismissAll();
    } catch {
      Alert.alert(t("common.error"), t("record.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <Header showBackButton onBackPress={handleBack} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedText style={styles.sectionTitle}>
            {t("recordPreview.title")}
          </ThemedText>

          <View style={styles.previewContainer}>
            <RecordingPreview
              uri={uri}
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
        </ScrollView>

        <View style={[styles.bottomButtons]}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.backButton,
              { borderColor: Colors[colorScheme].border },
            ]}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="arrow-back"
              size={20}
              color={Colors[colorScheme].text}
            />
            <ThemedText style={styles.actionButtonText}>
              {t("common.back")}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.saveButton,
              { backgroundColor: Colors[colorScheme].buttonPrimaryBg },
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={isSaving}
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  previewContainer: {
    marginBottom: 32,
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
  bottomButtons: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  backButton: {
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
