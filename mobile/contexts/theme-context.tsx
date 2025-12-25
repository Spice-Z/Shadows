import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

type ColorScheme = "light" | "dark" | "auto";

interface ThemeContextType {
  colorScheme: ColorScheme;
  actualColorScheme: "light" | "dark";
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useRNColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("auto");

  const actualColorScheme =
    colorScheme === "auto" ? systemColorScheme ?? "light" : colorScheme;

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        actualColorScheme,
        setColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
