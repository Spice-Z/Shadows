import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export interface CalendarDay {
  date: number;
  hasData: boolean;
  isToday?: boolean;
  isEmpty?: boolean;
}

interface MonthlyCalendarProps {
  year: number;
  month: number;
  days: CalendarDay[];
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function MonthlyCalendar({
  year,
  month,
  days,
  onPreviousMonth,
  onNextMonth,
}: MonthlyCalendarProps) {
  const colorScheme = useColorScheme();
  const monthLabel = `${year}年 ${month}月`;

  return (
    <ThemedView
      variant="surface"
      style={[styles.container, { borderColor: Colors[colorScheme].border }]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>{monthLabel}</ThemedText>
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={onPreviousMonth}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name="chevron-left"
              size={20}
              color={Colors[colorScheme].textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={onNextMonth}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={Colors[colorScheme].textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <View key={day} style={styles.weekdayCell}>
            <ThemedText type="secondary" style={styles.weekdayText}>
              {day}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          if (day.isEmpty) {
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const isToday = day.isToday;
          const hasData = day.hasData;

          return (
            <View key={day.date} style={styles.dayCell}>
              {hasData ? (
                <ThemedView
                  variant="surface"
                  style={[
                    styles.dayContent,
                    isToday && styles.todayContent,
                    {
                      backgroundColor: isToday
                        ? "transparent"
                        : Colors[colorScheme].buttonPrimaryBg,
                      borderColor: Colors[colorScheme].buttonPrimaryBg,
                    },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.dayText,
                      {
                        color: isToday
                          ? Colors[colorScheme].text
                          : Colors[colorScheme].buttonPrimaryText,
                        fontWeight: isToday ? "bold" : "500",
                      },
                    ]}
                  >
                    {day.date}
                  </ThemedText>
                </ThemedView>
              ) : (
                <ThemedText type="secondary" style={styles.dayText}>
                  {day.date}
                </ThemedText>
              )}
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navigation: {
    flexDirection: "row",
    gap: 8,
  },
  navButton: {
    padding: 4,
    borderRadius: 9999,
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  weekdayText: {
    fontSize: 10,
    fontWeight: "500",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  dayCell: {
    width: "13.5%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayContent: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  todayContent: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  dayText: {
    fontSize: 14,
  },
});
