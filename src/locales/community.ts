import type { Lang } from "../config/i18n";
import {
  BILIBILI_URL,
  CONTRIBUTION_URL,
  HACKATHON_CODE_URL,
  HACKATHON_URL,
  INTERNSHIP_URL,
  KOUSHARE_URL,
  PAPER_LECTURE_URL,
} from "../config/site";

export type CommunityItemMessages = {
  label: string;
  description: string;
  cta: string;
};

export type CommunitySectionItem = {
  label: string;
  description: string;
  href: string;
};

export type CommunitySection = {
  title: string;
  items: CommunitySectionItem[];
};

export type CommunityMessages = {
  title: string;
  subtitle: string;
  opensInNewTab: string;
  items: {
    repo: CommunityItemMessages;
    website: CommunityItemMessages;
    evangelists: CommunityItemMessages;
  };
  heroActions: {
    atomgit: string;
    github: string;
    gitee: string;
  };
  sections: CommunitySection[];
};

export const COMMUNITY_MESSAGES: Record<Lang, CommunityMessages> = {
  en: {
    title: "Community",
    subtitle:
      "Join the MindSpore Quantum community to contribute, learn, and grow together.",
    opensInNewTab: "(opens in new tab)",
    items: {
      repo: {
        label: "Code on AtomGit",
        description:
          "Browse the open-source MindQuantum repository, report issues, and contribute.",
        cta: "Open AtomGit",
      },
      website: {
        label: "MindSpore Website",
        description:
          "Discover the broader MindSpore ecosystem, news, and documentation.",
        cta: "Visit MindSpore",
      },
      evangelists: {
        label: "Join as Evangelist",
        description:
          "Apply to become a MindSpore/MindQuantum evangelist and help grow the community.",
        cta: "Apply Now",
      },
    },
    heroActions: {
      atomgit: "AtomGit",
      github: "GitHub",
      gitee: "Gitee",
    },
    sections: [
      {
        title: "Contribution and Growth",
        items: [
          {
            label: "Contribution Guide",
            description: "Learn how to contribute to MindSpore Quantum.",
            href: CONTRIBUTION_URL,
          },
          {
            label: "Developer Growth and Certification",
            description: "Track your progress and get certified.",
            href: "https://www.mindspore.cn/developers",
          },
        ],
      },
      {
        title: "Competition Activities",
        items: [
          {
            label: "Open-source Internship",
            description: "Online open-source internship tasks and opportunities.",
            href: INTERNSHIP_URL,
          },
          {
            label: "Hackathon Competition",
            description: "Participate in quantum computing hackathons.",
            href: HACKATHON_URL,
          },
          {
            label: "Competition Code",
            description: "Browse code for quantum computing competitions.",
            href: HACKATHON_CODE_URL,
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            label: "Group Meeting Live Stream — Koushare",
            description: "Watch live streams on Koushare.",
            href: KOUSHARE_URL,
          },
          {
            label: "Group Meeting Live Stream — BiliBili",
            description: "Watch live streams on BiliBili.",
            href: BILIBILI_URL,
          },
          {
            label: "Paper Intensive Lecture",
            description: "Deep dive into quantum computing papers.",
            href: PAPER_LECTURE_URL,
          },
        ],
      },
    ],
  },
  zh: {
    title: "社区",
    subtitle: "加入 MindSpore Quantum 社区，与大家一起贡献、学习与成长。",
    opensInNewTab: "（在新标签页打开）",
    items: {
      repo: {
        label: "AtomGit 代码仓库",
        description: "浏览 MindQuantum 开源仓库，提交问题并参与贡献。",
        cta: "前往 AtomGit",
      },
      website: {
        label: "MindSpore 官网",
        description: "了解更广泛的 MindSpore 生态、新闻与文档。",
        cta: "访问官网",
      },
      evangelists: {
        label: "申请布道师",
        description:
          "申请成为 MindSpore/MindQuantum 布道师，共同壮大社区。",
        cta: "立即申请",
      },
    },
    heroActions: {
      atomgit: "AtomGit",
      github: "GitHub",
      gitee: "Gitee",
    },
    sections: [
      {
        title: "贡献与成长",
        items: [
          {
            label: "贡献指南",
            description: "了解如何为 MindSpore Quantum 贡献代码。",
            href: CONTRIBUTION_URL,
          },
          {
            label: "开发者成长与认证",
            description: "跟踪你的成长路径，获取认证。",
            href: "https://www.mindspore.cn/developers",
          },
        ],
      },
      {
        title: "竞赛活动",
        items: [
          {
            label: "开源实习",
            description: "在线开源实习任务与机会。",
            href: INTERNSHIP_URL,
          },
          {
            label: "黑客松大赛",
            description: "参加量子计算黑客松。",
            href: HACKATHON_URL,
          },
          {
            label: "赛事代码",
            description: "浏览量子计算赛事相关代码。",
            href: HACKATHON_CODE_URL,
          },
        ],
      },
      {
        title: "资源",
        items: [
          {
            label: "组会直播 — 蔻享",
            description: "在蔻享观看组会直播。",
            href: KOUSHARE_URL,
          },
          {
            label: "组会直播 — 哔哩哔哩",
            description: "在哔哩哔哩观看组会直播。",
            href: BILIBILI_URL,
          },
          {
            label: "论文精讲",
            description: "深入解读量子计算相关论文。",
            href: PAPER_LECTURE_URL,
          },
        ],
      },
    ],
  },
};
