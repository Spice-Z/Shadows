import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import { translations } from "./translations";

// Create i18n instance
const i18n = new I18n(translations);

// Set the locale based on device settings
// getLocales() returns an array of locale objects sorted by user preference
const deviceLocale = getLocales()[0]?.languageCode ?? "en";

// Set locale - if device locale is not supported, fallback to English
i18n.locale = deviceLocale in translations ? deviceLocale : "en";

// Enable fallback to English when a translation is missing
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export { i18n };

// Helper function to get current locale
export function getCurrentLocale(): string {
  return i18n.locale;
}

// Helper function to change locale
export function setLocale(locale: "en" | "ja"): void {
  i18n.locale = locale;
}

// Helper function to get device locale
export function getDeviceLocale(): string {
  return getLocales()[0]?.languageCode ?? "en";
}

// Shorthand for translation function
export const t = i18n.t.bind(i18n);

