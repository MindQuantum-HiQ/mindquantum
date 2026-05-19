import type { Lang } from "../config/i18n";

export type ComposerMessages = {
  metaDescription: string;
  /* Short label sitting above the page title. Used to signal that Composer
     is a standalone tool, not a sub-feature of MindQuantum (the framework
     and the editor are sibling products that happen to share this site). */
  eyebrow: string;
  title: string;
  subtitle: string;
  /* Honest framing for the future MindQuantum integration. Rendered as a
     small note below the subtitle. Generating MindQuantum code from a
     Composer circuit is on the roadmap, not a current capability — saying
     so up-front is what makes Composer's independence legible. */
  roadmapNote: string;
  qubitLabel: string;
  addQubit: string;
  measurementProbabilities: string;
  stateVector: string;
  gatePaletteLabel: string;
  columnsLabel: string;
};

export const COMPOSER_MESSAGES: Record<Lang, ComposerMessages> = {
  en: {
    metaDescription:
      "Composer is a browser-based visual editor for designing and inspecting quantum circuits. No install required.",
    eyebrow: "Standalone tool · Runs in your browser",
    title: "Composer",
    subtitle:
      "Drag and drop quantum gates to build circuits, then watch the state vector and measurement probabilities update in real time — entirely in the browser, no install required.",
    roadmapNote:
      "Roadmap: export your circuit as runnable MindQuantum Python code.",
    qubitLabel: "Qubit",
    addQubit: "Add Qubit",
    measurementProbabilities: "Measurement Probabilities",
    stateVector: "Statevector",
    gatePaletteLabel: "Gate palette",
    columnsLabel: "Column",
  },
  zh: {
    metaDescription:
      "Composer 是浏览器中的可视化量子电路编辑器，拖放量子门即可设计与查看电路，无需安装。",
    eyebrow: "独立工具 · 浏览器中运行",
    title: "Composer",
    subtitle:
      "拖放量子门来构建电路，实时查看状态向量与测量概率——完全运行于浏览器中，无需安装。",
    roadmapNote: "路线图：将电路一键导出为可运行的 MindQuantum Python 代码。",
    qubitLabel: "量子比特",
    addQubit: "添加量子比特",
    measurementProbabilities: "测量概率",
    stateVector: "状态向量",
    gatePaletteLabel: "量子门",
    columnsLabel: "列",
  },
};
