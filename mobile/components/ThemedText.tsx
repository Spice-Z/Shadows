import { StyleSheet, Text, type TextProps } from "react-native";
import { type ReactNode } from "react";

import { useThemeColor } from "@/hooks/use-theme-color";

// Font family mapping
// Lexend: Primary font for Latin characters (English, etc.)
// NotoSansJP: Fallback for Japanese characters (Hiragana, Katakana, Kanji)
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

// Regex to detect Japanese characters (Hiragana, Katakana, Kanji, and Japanese punctuation)
const JAPANESE_REGEX = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303F]/;

// Helper to check if text contains Japanese characters
function containsJapanese(children: ReactNode): boolean {
  if (typeof children === "string") {
    return JAPANESE_REGEX.test(children);
  }
  if (typeof children === "number") {
    return false;
  }
  if (Array.isArray(children)) {
    return children.some((child) => containsJapanese(child));
  }
  return false;
}

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  font?: "lexend" | "noto" | "auto";
  weight?: "regular" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  variant?: "default" | "secondary" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  font = "auto",
  weight = "regular",
  size,
  variant = "default",
  children,
  ...rest
}: ThemedTextProps) {
  const defaultColor = variant === "secondary" ? "textSecondary" : "text";
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant === "link" ? "primary" : defaultColor
  );

  // Determine which size style to use
  const sizeStyle = size ? sizeStyles[size] : undefined;

  // Determine font family:
  // - "auto": Use Lexend for Latin text, Noto Sans JP for Japanese text
  // - "lexend": Force Lexend
  // - "noto": Force Noto Sans JP
  const getFontFamily = () => {
    if (font === "auto") {
      const hasJapanese = containsJapanese(children);
      return hasJapanese
        ? FONT_FAMILIES.noto[weight]
        : FONT_FAMILIES.lexend[weight];
    }
    return FONT_FAMILIES[font][weight];
  };

  return (
    <Text
      style={[{ color }, { fontFamily: getFontFamily() }, sizeStyle, style]}
      {...rest}
    >
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
