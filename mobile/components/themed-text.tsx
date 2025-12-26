import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "secondary";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  size,
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const defaultColor = type === "secondary" ? "textSecondary" : "text";
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    defaultColor
  );

  // Determine which size style to use
  const sizeStyle = size ? sizeStyles[size] : undefined;

  // Type styles take precedence for backward compatibility
  const typeStyle =
    type === "default"
      ? styles.default
      : type === "title"
      ? styles.title
      : type === "defaultSemiBold"
      ? styles.defaultSemiBold
      : type === "subtitle"
      ? styles.subtitle
      : type === "link"
      ? styles.link
      : undefined;

  return (
    <Text
      style={[
        { color },
        typeStyle,
        sizeStyle,
        type === "link" ? { color: Colors[colorScheme].primary } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});

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
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 24,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
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
