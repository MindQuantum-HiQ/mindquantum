import type { Lang } from "../config/i18n";

export type CommunityItemMessages = {
  label: string;
  description: string;
  cta: string;
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
};

export const COMMUNITY_MESSAGES: Record<Lang, CommunityMessages> = {
  en: {
    title: "Community",
    subtitle: "Connect with MindQuantum – explore the code, visit MindSpore, or join our evangelist program.",
    opensInNewTab: "(opens in new tab)",
    items: {
      repo: {
        label: "Code on Gitee",
        description: "Browse the open-source MindQuantum repository, report issues, and contribute.",
        cta: "Open Gitee",
      },
      website: {
        label: "MindSpore Website",
        description: "Discover the broader MindSpore ecosystem, news, and documentation.",
        cta: "Visit MindSpore",
      },
      evangelists: {
        label: "Join as Evangelist",
        description: "Apply to become a MindSpore/MindQuantum evangelist and help grow the community.",
        cta: "Apply Now",
      },
    },
  },
  zh: {
    title: "社区",
    subtitle: "与 MindQuantum 连接：查看代码、访问 MindSpore 官网，或申请成为布道师。",
    opensInNewTab: "（在新标签页打开）",
    items: {
      repo: {
        label: "代码仓库（Gitee）",
        description: "浏览 MindQuantum 开源仓库，提交问题并参与贡献。",
        cta: "前往 Gitee",
      },
      website: {
        label: "MindSpore 官网",
        description: "了解更广泛的 MindSpore 生态、新闻与文档。",
        cta: "访问官网",
      },
      evangelists: {
        label: "布道师申请",
        description: "申请成为 MindSpore/MindQuantum 布道师，共同壮大社区。",
        cta: "立即申请",
      },
    },
  },
};
