import { useTheme } from "@/contexts/ThemeContext";

export function useColorScheme() {
  const { actualColorScheme } = useTheme();
  return actualColorScheme;
}
