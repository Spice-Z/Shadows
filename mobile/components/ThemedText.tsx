import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useTranslation } from "@/hooks/useTranslation";

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
  align?: "left" | "center" | "right";
};

export function ThemedText({
  style,
  color: colorProp,
  weight = "regular",
  size,
  align = "left",
  children,
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor({}, "text");
  const { locale } = useTranslation();

  const color = colorProp ?? themeColor;

  const sizeStyle = size ? sizeStyles[size] : undefined;

  const fontFamily =
    locale === "ja" ? FONT_FAMILIES.noto[weight] : FONT_FAMILIES.lexend[weight];

  return (
    <Text
      style={[{ color, fontFamily, textAlign: align }, sizeStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const sizeStyles = StyleSheet.create({
  xs: {
    fontSize: 10,
    lineHeight: 14,
  },
  sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  base: {
    fontSize: 16,
    lineHeight: 18,
  },
  lg: {
    fontSize: 18,
    lineHeight: 22,
  },
  xl: {
    fontSize: 20,
    lineHeight: 26,
  },
  "2xl": {
    fontSize: 24,
    lineHeight: 32,
  },
  "3xl": {
    fontSize: 32,
    lineHeight: 40,
  },
  "4xl": {
    fontSize: 40,
    lineHeight: 48,
  },
  "5xl": {
    fontSize: 48,
    lineHeight: 56,
  },
});
