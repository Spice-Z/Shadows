import { WeeklyData } from "@/components/WeeklyChart";
import { CalendarDay } from "@/components/MonthlyCalendar";

export const mockStreakDays = 12;
// Streak message is now handled by translations

export const mockWeeklyData: WeeklyData[] = [
  { day: "月", percentage: 45 },
  { day: "火", percentage: 30 },
  { day: "水", percentage: 75 },
  { day: "木", percentage: 60 },
  { day: "金", percentage: 20 },
  { day: "土", percentage: 0 },
  { day: "日", percentage: 0 },
];

export const mockWeeklyTotal = "3h 45m";

// Generate calendar days for October 2023
export function generateCalendarDays(
  year: number,
  month: number
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month - 1;

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: 0, hasData: false, isEmpty: true });
  }

  // Days with data (marked days)
  const markedDays = [2, 3, 5, 7, 8, 9, 10, 11, 12, 13, 14];

  for (let day = 1; day <= daysInMonth; day++) {
    const hasData = markedDays.includes(day);
    const isToday = isCurrentMonth && day === today.getDate();

    days.push({
      date: day,
      hasData,
      isToday,
      isEmpty: false,
    });
  }

  return days;
}

export const mockTotalLearningTime = { hours: 42, minutes: 15 };
export const mockTotalSessions = 128;
