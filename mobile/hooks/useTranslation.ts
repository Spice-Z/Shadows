import { useCallback } from "react";
import { i18n, getCurrentLocale } from "@/i18n";

/**
 * Hook to use translations in components
 * Returns the translation function and current locale
 */
export function useTranslation() {
  const locale = getCurrentLocale();

  const t = useCallback(
    (key: string, options?: Record<string, string | number>) => {
      return i18n.t(key, options);
    },
    []
  );

  return {
    t,
    locale,
    i18n,
  };
}

