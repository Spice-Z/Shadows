import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StreakTag } from "@/components/StreakTag";
import { AddNewAudio } from "@/components/AddNewAudio";
import { AudioListItem } from "@/components/AudioListItem";
import { mockAudioList, mockStreakCount } from "@/data/mock-audio";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Spacer } from "@/components/Spacer";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Header */}
        <ThemedView
          style={[
            styles.header,
            {
              borderBottomColor: Colors[colorScheme].border,
            },
          ]}
        >
          <ThemedText style={styles.headerTitle}>{t("home.title")}</ThemedText>
          <StreakTag count={mockStreakCount} />
        </ThemedView>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Add New Audio Section */}
          <View style={styles.section}>
            <AddNewAudio />
          </View>

          {/* Library Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                {t("home.library")}
              </ThemedText>
              <ThemedText
                color={Colors[colorScheme].textSecondary}
                style={styles.sectionCount}
              >
                {t("home.itemCount", { count: mockAudioList.length })}
              </ThemedText>
            </View>

            <View style={styles.audioList}>
              {mockAudioList.map((audio, index) => (
                <AudioListItem
                  key={index}
                  {...audio}
                  onPress={() => {
                    router.push(`/study/${index}`);
                  }}
                  onMorePress={() => {
                    // Handle more options press
                  }}
                />
              ))}
            </View>
          </View>
          {/* For debugging */}
          <Spacer y={40} />
          <ThemeSelector />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom tab bar
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  audioList: {
    gap: 4,
  },
});
