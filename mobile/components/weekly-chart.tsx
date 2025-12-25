import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export interface WeeklyData {
  day: string;
  percentage: number; // 0-100
}

interface WeeklyChartProps {
  data: WeeklyData[];
  totalTime: string;
}

const DAYS = ["月", "火", "水", "木", "金", "土", "日"];

export function WeeklyChart({ data, totalTime }: WeeklyChartProps) {
  const colorScheme = useColorScheme();
  const maxHeight = 160;

  return (
    <ThemedView variant="surface" style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>週間学習時間</ThemedText>
        <ThemedView
          variant="surface"
          style={[
            styles.totalBadge,
            {
              backgroundColor: Colors[colorScheme].badgeBg,
            },
          ]}>
          <ThemedText
            style={[
              styles.totalText,
              {
                color: Colors[colorScheme].badgeText,
              },
            ]}>
            合計 {totalTime}
          </ThemedText>
        </ThemedView>
      </View>
      <View style={styles.chartContainer}>
        {DAYS.map((day, index) => {
          const dayData = data[index];
          const height = dayData ? (dayData.percentage / 100) * maxHeight : 0;
          const isEmpty = !dayData || dayData.percentage === 0;

          return (
            <View key={day} style={styles.barContainer}>
              <View
                style={[
                  styles.barWrapper,
                  {
                    height: maxHeight,
                    backgroundColor: Colors[colorScheme].badgeBg,
                  },
                ]}>
                {height > 0 && (
                  <View
                    style={[
                      styles.bar,
                      {
                        height,
                        backgroundColor: isEmpty
                          ? Colors[colorScheme].hover
                          : Colors[colorScheme].buttonPrimaryBg,
                      },
                    ]}
                  />
                )}
              </View>
              <ThemedText
                type="secondary"
                style={[
                  styles.dayLabel,
                  isEmpty && { color: Colors[colorScheme].textSecondary },
                ]}>
                {day}
              </ThemedText>
            </View>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  totalText: {
    fontSize: 12,
    fontWeight: "500",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 160,
    gap: 12,
    paddingHorizontal: 4,
  },
  barContainer: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  barWrapper: {
    width: "100%",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    borderRadius: 2,
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    borderRadius: 2,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
});

