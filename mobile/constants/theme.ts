/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Primary brand color
const primary = "#0d1629";

// Background colors
const backgroundLight = "#f7f9fa";
const backgroundDark = "#111621";

// Surface colors
const surfaceLight = "#ffffff";
const surfaceDark = "#1e293b";

// Text colors
const textPrimaryLight = "#0d1629";
const textPrimaryDark = "#ffffff";
const textSecondaryLight = "#63748a";
const textSecondaryDark = "#94a3b8"; // slate-400

// Border colors
const borderLight = "#e1e8f0"; // slate-200
const borderDark = "#334155"; // slate-700

// Icon colors
const iconLight = "#475569"; // slate-600
const iconDark = "#cbd5e1"; // slate-300

// Button colors
const buttonPrimaryBgLight = "#0f172a"; // slate-900
const buttonPrimaryBgDark = "#ffffff";
const buttonPrimaryTextLight = "#ffffff";
const buttonPrimaryTextDark = "#0f172a"; // slate-900

// Hover/press states
const hoverLight = "#f1f5f9"; // slate-100
const hoverDark = "#1e293b"; // slate-800

export const Colors = {
  light: {
    // Core colors
    text: textPrimaryLight,
    background: backgroundLight,
    surface: surfaceLight,

    // Primary brand
    primary: primary,
    tint: primary,

    // Text variants
    textSecondary: textSecondaryLight,

    // Borders
    border: borderLight,

    // Icons
    icon: iconLight,
    tabIconDefault: "#94a3b8", // slate-400
    tabIconSelected: primary,

    // Buttons
    buttonPrimaryBg: buttonPrimaryBgLight,
    buttonPrimaryText: buttonPrimaryTextLight,
    buttonSecondaryBg: "transparent",
    buttonSecondaryText: textPrimaryLight,

    // Interactive states
    hover: hoverLight,
    pressed: "#e2e8f0", // slate-200

    // Badge/chip colors
    badgeBg: "#f1f5f9", // slate-100
    badgeText: "#475569", // slate-600
  },
  dark: {
    // Core colors
    text: textPrimaryDark,
    background: backgroundDark,
    surface: surfaceDark,

    // Primary brand
    primary: primary,
    tint: primary,

    // Text variants
    textSecondary: textSecondaryDark,

    // Borders
    border: borderDark,

    // Icons
    icon: iconDark,
    tabIconDefault: "#64748b", // slate-500
    tabIconSelected: primary,

    // Buttons
    buttonPrimaryBg: buttonPrimaryBgDark,
    buttonPrimaryText: buttonPrimaryTextDark,
    buttonSecondaryBg: "transparent",
    buttonSecondaryText: textPrimaryDark,

    // Interactive states
    hover: hoverDark,
    pressed: "#334155", // slate-700

    // Badge/chip colors
    badgeBg: "#334155", // slate-700
    badgeText: "#cbd5e1", // slate-300
  },
};

// Font family configuration
// Uses Lexend for Latin characters and Noto Sans JP for Japanese characters
export const Fonts = Platform.select({
  ios: {
    /** Primary font stack: Lexend, Noto Sans JP, system fallback */
    sans: "Lexend-Regular, NotoSansJP-Regular, system-ui",
    /** Medium weight */
    sansMedium: "Lexend-Medium, NotoSansJP-Medium, system-ui",
    /** Semi-bold weight */
    sansSemiBold: "Lexend-SemiBold, NotoSansJP-Medium, system-ui",
    /** Bold weight */
    sansBold: "Lexend-Bold, NotoSansJP-Bold, system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    /** Primary font stack: Lexend, Noto Sans JP, system fallback */
    sans: "Lexend-Regular, NotoSansJP-Regular, sans-serif",
    /** Medium weight */
    sansMedium: "Lexend-Medium, NotoSansJP-Medium, sans-serif",
    /** Semi-bold weight */
    sansSemiBold: "Lexend-SemiBold, NotoSansJP-Medium, sans-serif",
    /** Bold weight */
    sansBold: "Lexend-Bold, NotoSansJP-Bold, sans-serif",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    /** Primary font stack: Lexend, Noto Sans JP, system fallback */
    sans: "'Lexend', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    /** Medium weight */
    sansMedium: "'Lexend', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    /** Semi-bold weight */
    sansSemiBold: "'Lexend', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    /** Bold weight */
    sansBold: "'Lexend', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
