import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useTranslation } from "@/hooks/use-translation";

// Font family mapping
// Lexend: Primary font for Latin locales (English, etc.)
// NotoSansJP: Font for Japanese locale
const FONT_FAMILIES = {
  lexend: {
    regular: "Lexend-Regular",
    medium: "Lexend-Medium",
    semibold: "Lexend-SemiBold",
    bold: "Lexend-Bold",
  },
  noto: {
    regular: "NotoSansJP-Regular",
    medium: "NotoSansJP-Medium",
    semibold: "NotoSansJP-SemiBold",
    bold: "NotoSansJP-Bold",
  },
} as const;

export type ThemedTextProps = TextProps & {
  /** Direct color code (e.g., "#ff0000"). Overrides theme colors. */
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

export function ThemedText({
  style,
  color: colorProp,
  weight = "regular",
  size,
  children,
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor({}, "text");
  const { locale } = useTranslation();

  // Use direct color prop if provided, otherwise use theme color
  const color = colorProp ?? themeColor;

  // Determine which size style to use
  const sizeStyle = size ? sizeStyles[size] : undefined;

  // Determine font family based on locale: Noto Sans JP for Japanese, Lexend for others
  const fontFamily =
    locale === "ja" ? FONT_FAMILIES.noto[weight] : FONT_FAMILIES.lexend[weight];

  return (
    <Text style={[{ color, fontFamily }, sizeStyle, style]} {...rest}>
      {children}
    </Text>
  );
}

const sizeStyles = StyleSheet.create({
  xs: {
    fontSize: 10,
    lineHeight: 18,
  },
  sm: {
    fontSize: 12,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 28,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 32,
  },
  "2xl": {
    fontSize: 24,
    lineHeight: 36,
  },
  "3xl": {
    fontSize: 32,
    lineHeight: 44,
  },
  "4xl": {
    fontSize: 40,
    lineHeight: 52,
  },
  "5xl": {
    fontSize: 48,
    lineHeight: 60,
  },
});
