import type { Lang } from "../config/i18n";

export type NavMessages = {
  courses?: string;
  docs: string;
  api: string;
  community: string;
};

export const NAV_MESSAGES: Record<Lang, NavMessages> = {
  en: { docs: "Docs", api: "API", community: "Community" },
  zh: { courses: "课程", docs: "文档", api: "API", community: "社区" },
};
