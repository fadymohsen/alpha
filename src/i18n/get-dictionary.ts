import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (typeof dictionaries[locale] !== "function") {
    // Falls back to English if the locale is invalid (e.g., favicon.ico matching [locale] route)
    return dictionaries.en();
  }
  return dictionaries[locale]();
};
