import type { Lang } from "../config/i18n";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterMessages = {
  columns: FooterColumn[];
  followUs: {
    title: string;
    description: string;
  };
  legal: {
    copyright: string;
    license: string;
  };
};

export const FOOTER_MESSAGES: Record<Lang, FooterMessages> = {
  en: {
    columns: [
      {
        title: "Learning",
        links: [
          { label: "Tutorial", href: "/learning/" },
          { label: "Documentation", href: "/documentation/" },
          { label: "Tutorial Videos", href: "/learning/" },
          { label: "Paper", href: "/learning/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Benchmarks", href: "/benchmark/" },
          { label: "Group Meeting Live Stream", href: "/community/" },
          { label: "Essay Analysis", href: "/community/" },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Contribution Guide", href: "/community/" },
          { label: "Developer Growth and Certification", href: "/community/" },
          { label: "Internship", href: "/community/" },
        ],
      },
      {
        title: "Stay connected",
        links: [
          { label: "MindSpore", href: "https://www.mindspore.cn/" },
          { label: "koushare", href: "https://www.koushare.com/" },
          { label: "Bilibili", href: "https://www.bilibili.com/" },
        ],
      },
    ],
    followUs: {
      title: "Follow us",
      description: "HiQ Quantum Computing WeChat Official Account",
    },
    legal: {
      copyright: "© Copyright {year} | MindSpore Quantum | All rights reserved",
      license:
        "The content of this website is released under the Apache 2.0 Universal license.",
    },
  },
  zh: {
    columns: [
      {
        title: "学习",
        links: [
          { label: "教程", href: "/zh/learning/" },
          { label: "文档", href: "/zh/documentation/" },
          { label: "视频课程", href: "/zh/learning/" },
          { label: "论文", href: "/zh/learning/" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "性能基准", href: "/zh/benchmark/" },
          { label: "组会直播", href: "/zh/community/" },
          { label: "论文解读", href: "/zh/community/" },
        ],
      },
      {
        title: "社区",
        links: [
          { label: "贡献指南", href: "/zh/community/" },
          { label: "开发者成长与认证", href: "/zh/community/" },
          { label: "实习", href: "/zh/community/" },
        ],
      },
      {
        title: "关注我们",
        links: [
          { label: "MindSpore", href: "https://www.mindspore.cn/" },
          { label: "蔻享", href: "https://www.koushare.com/" },
          { label: "哔哩哔哩", href: "https://www.bilibili.com/" },
        ],
      },
    ],
    followUs: {
      title: "关注我们",
      description: "HiQ 量子计算 微信公众号",
    },
    legal: {
      copyright: "© 版权所有 {year} | MindSpore Quantum | 保留所有权利",
      license: "本站内容基于 Apache 2.0 许可证发布。",
    },
  },
};
