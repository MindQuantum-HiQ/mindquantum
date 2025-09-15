export const LANGS = ["en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

export const START_PAGE: Record<Lang, string> = {
  en: "/docs/en/src/index.html",
  zh: "/docs/zh/src/index.html",
};

export const DEFAULT_LANG: Lang = "en";
