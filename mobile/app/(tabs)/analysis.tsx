import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StreakDisplay } from "@/components/streak-display";
import { WeeklyChart } from "@/components/weekly-chart";
import { MonthlyCalendar } from "@/components/monthly-calendar";
import { StatCard } from "@/components/stat-card";
import {
  mockStreakDays,
  mockStreakMessage,
  mockWeeklyData,
  mockWeeklyTotal,
  generateCalendarDays,
  mockTotalLearningTime,
  mockTotalSessions,
} from "@/data/mock-analytics";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useState } from "react";

export default function AnalysisScreen() {
  const colorScheme = useColorScheme();
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(10);

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = generateCalendarDays(currentYear, currentMonth);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ThemedView
          style={[
            styles.header,
            {
              borderBottomColor: Colors[colorScheme].border,
            },
          ]}
        >
          <ThemedText style={styles.headerTitle}>分析</ThemedText>
          <TouchableOpacity
            style={styles.settingsButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={Colors[colorScheme].text}
            />
          </TouchableOpacity>
        </ThemedView>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <StreakDisplay days={mockStreakDays} message={mockStreakMessage} />

          <View style={styles.section}>
            <WeeklyChart data={mockWeeklyData} totalTime={mockWeeklyTotal} />
          </View>

          {/* Monthly Calendar */}
          <View style={styles.section}>
            <MonthlyCalendar
              year={currentYear}
              month={currentMonth}
              days={calendarDays}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />
          </View>

          {/* Stat Cards */}
          <View style={styles.statsContainer}>
            <StatCard
              label="総合学習時間"
              value={mockTotalLearningTime.hours.toString()}
              unit="h"
              secondaryValue={mockTotalLearningTime.minutes.toString()}
              secondaryUnit="m"
              icon="schedule"
            />
            <StatCard
              label="総合学習回数"
              value={mockTotalSessions.toString()}
              unit="回"
              icon="repeat"
            />
          </View>
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
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for bottom tab bar
    gap: 24,
  },
  section: {
    gap: 0,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
