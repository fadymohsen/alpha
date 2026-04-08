export const locales = ["en", "ar"] as const;
export const defaultLocale = "ar";
export const rtlLocales = ["ar"];
export type Locale = (typeof locales)[number];
