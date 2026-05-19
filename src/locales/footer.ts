import type { Lang } from "../config/i18n";
import {
  BILIBILI_URL,
  CONTRIBUTION_URL,
  EVANGELISTS_URL,
  INTERNSHIP_URL,
  KOUSHARE_URL,
  MINDSPORE_URL,
  PAPER_LECTURE_URL,
} from "../config/site";

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
          { label: "Tutorial Videos", href: "/courses/" },
          { label: "Paper", href: "/learning/" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Benchmarks", href: "/benchmark/" },
          { label: "Group Meeting Live Stream", href: KOUSHARE_URL },
          { label: "Paper Intensive Lecture", href: PAPER_LECTURE_URL },
        ],
      },
      {
        title: "Community",
        links: [
          { label: "Contribution Guide", href: CONTRIBUTION_URL },
          { label: "Developer Growth and Certification", href: EVANGELISTS_URL },
          { label: "Open-source Internship", href: INTERNSHIP_URL },
        ],
      },
      {
        title: "Stay connected",
        links: [
          { label: "MindSpore", href: MINDSPORE_URL },
          { label: "koushare", href: KOUSHARE_URL },
          { label: "Bilibili", href: BILIBILI_URL },
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
          { label: "视频课程", href: "/courses/" },
          { label: "论文", href: "/zh/learning/" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "性能基准", href: "/zh/benchmark/" },
          { label: "组会直播", href: KOUSHARE_URL },
          { label: "论文精讲", href: PAPER_LECTURE_URL },
        ],
      },
      {
        title: "社区",
        links: [
          { label: "贡献指南", href: CONTRIBUTION_URL },
          { label: "开发者成长与认证", href: EVANGELISTS_URL },
          { label: "开源实习", href: INTERNSHIP_URL },
        ],
      },
      {
        title: "关注我们",
        links: [
          { label: "MindSpore", href: MINDSPORE_URL },
          { label: "蔻享", href: KOUSHARE_URL },
          { label: "哔哩哔哩", href: BILIBILI_URL },
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
