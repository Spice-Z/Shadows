import { useTheme } from "@/contexts/theme-context";

export function useColorScheme(): "light" | "dark" {
  try {
    const { actualColorScheme } = useTheme();
    return actualColorScheme;
  } catch {
    // Fallback if ThemeProvider is not available
    const { useColorScheme: useRNColorScheme } = require("react-native");
    return (useRNColorScheme() ?? "light") as "light" | "dark";
  }
}
