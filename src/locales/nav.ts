import type { Lang } from "../config/i18n";

export type NavMessages = {
  about: string;
  composer: string;
  learning: string;
  documentation: string;
  benchmark: string;
  community: string;
  code: string;
  // Documentation submenu labels — distinct from the parent "Documentation"
  // button so the dropdown doesn't duplicate its own trigger.
  overview: string;
  guides: string;
  api: string;
  // Community submenus
  communityGroups: {
    contribution: string;
    competitions: string;
    resources: string;
  };
  communityItems: {
    contributionGuide: string;
    developerGrowth: string;
    internship: string;
    hackathon: string;
    koushareStream: string;
    bilibiliStream: string;
    paperLecture: string;
  };
  learningItems: {
    courses: string;
    videoCourses: string;
  };
};

export const NAV_MESSAGES: Record<Lang, NavMessages> = {
  en: {
    about: "Home",
    composer: "Composer",
    learning: "Learning",
    documentation: "Documentation",
    benchmark: "Benchmark",
    community: "Community",
    code: "Code",
    overview: "Overview",
    guides: "Guides",
    api: "API Reference",
    communityGroups: {
      contribution: "Contribution and Growth",
      competitions: "Competition Activities",
      resources: "Resources",
    },
    communityItems: {
      contributionGuide: "Contribution Guide",
      developerGrowth: "Developer Growth and Certification",
      internship: "Open-source Internship",
      hackathon: "Hackathon Competition",
      koushareStream: "Group Meeting Live Stream-Koushare",
      bilibiliStream: "Group Meeting Live Stream-BiliBili",
      paperLecture: "Paper Intensive Lecture",
    },
    learningItems: {
      courses: "Courses",
      videoCourses: "Video Courses",
    },
  },
  zh: {
    about: "主页",
    composer: "编辑器",
    learning: "学习",
    documentation: "文档",
    benchmark: "性能",
    community: "社区",
    code: "代码",
    overview: "概览",
    guides: "指南",
    api: "API 参考",
    communityGroups: {
      contribution: "贡献与成长",
      competitions: "竞赛活动",
      resources: "资源",
    },
    communityItems: {
      contributionGuide: "贡献指南",
      developerGrowth: "开发者成长与认证",
      internship: "开源实习",
      hackathon: "黑客松大赛",
      koushareStream: "组会直播-蔻享",
      bilibiliStream: "组会直播-哔哩哔哩",
      paperLecture: "论文精讲",
    },
    learningItems: {
      courses: "课程",
      videoCourses: "视频课程",
    },
  },
};
