import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useTheme } from "@/contexts/theme-context";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): "light" | "dark" {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  try {
    const { actualColorScheme } = useTheme();
    return actualColorScheme;
  } catch {
    // Fallback if ThemeProvider is not available
    const colorScheme = useRNColorScheme();
    if (hasHydrated) {
      return (colorScheme ?? "light") as "light" | "dark";
    }
    return 'light';
  }
}
