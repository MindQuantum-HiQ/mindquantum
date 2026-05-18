import type { Lang } from "../config/i18n";

export type HomeFeature = {
  title: string;
  description: string;
  image: "visual" | "hybrid" | "simulation" | "algorithm";
};

export type LearningCard = {
  icon: string;
  title: string;
  description: string;
  color: "primary" | "green" | "orange" | "teal";
  badge?: string;
  href: string;
};

export type HeroSlide = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  background: "quantum" | "internship" | "meeting";
  tone: "light" | "dark";
  actions: Array<{
    label: string;
    variant: "primary" | "outline";
    href: string;
    icon?: "play";
    external?: boolean;
  }>;
};

export type ArchitectureParadigm = {
  label: string;
  items: string;
  /* Optional deep-link override per paradigm cell. When set, the paradigm
     cell renders as its own anchor (e.g. Universal → algorithm.library,
     Variational → algorithm.nisq, Quantum-inspired → algorithm.qaia)
     instead of inheriting the layer-level href. Only used inside the
     Algorithm Library layer; the other four layers don't have paradigm
     subgroups at all. */
  href?: string;
};

/* A horizontal band in the framework architecture stack. The top layer
   (Algorithm Library) is the only one with a real "vertical" classification
   — Universal vs Variational vs Quantum-inspired paradigms — so it ships
   its own `paradigms` triple. The remaining layers (QNN, Compiler, DSL,
   Simulator) are flat component lists. Modelling those two cases as two
   different shapes keeps the diagram honest: paradigm columns no longer
   apply to layers that don't actually have paradigms. */
export type ArchitectureLayer = {
  label: string;
  href?: string;
  paradigms?: ArchitectureParadigm[];
  components?: string[];
};

export type HomeMessages = {
  metaDescription: string;
  announcement: {
    text: string;
    cta: string;
    href: string;
  };
  framework: {
    release: string;
    releaseHref: string;
    description: string;
    installCmd: string;
    installCopiedLabel: string;
    installManualLabel: string;
    docsLabel: string;
  };
  architecture: {
    heading: string;
    layers: ArchitectureLayer[];
  };
  hero: {
    // Legacy fields (kept for backwards compatibility)
    title: string;
    subtitle: string;
    startLabel: string;
    repoLabel: string;
    slides: HeroSlide[];
  };
  features: {
    heading: string;
    items: HomeFeature[];
  };
  research: {
    heading: string;
    subtitle: string;
    universities: string[];
    featuredUniversities: string[];
    statement: string;
    linkLabel: string;
    linkHref: string;
  };
  learning: {
    heading: string;
    cards: LearningCard[];
  };
  cta: {
    title: string;
    installLabel: string;
    installHref: string;
    docsLabel: string;
    docsHref: string;
  };
  docs: {
    heading: string;
    blurbBeforeLink: string;
    linkLabel: string;
    blurbAfterLink: string;
  };
  builder?: {
    heading: string;
    qubits: string;
    stateVector: string;
    measurementProbabilities: string;
  };
};

const COMMON_UNIVERSITIES_EN = [
  "University of Science and Technology of China",
  "Hong Kong University",
  "Shanghai University",
  "Ocean University of China",
  "Tongji University",
  "South China University of Technology",
  "Beijing Normal University",
  "Wuhan University",
  "Anhui University",
  "Southwest University",
  "Xi'an University of Engineering",
  "Hubei University",
  "Zhejiang University",
  "University of Electronic Science and Technology",
  "Institute of Software of Chinese Academy of Sciences",
  "Tianjin University",
  "Harbin Institute of Technology",
  "Southern University of Science and Technology",
  "Beijing University of Posts and Telecommunications",
  "Central South University",
  "Beijing Institute of Technology",
  "Xidian University",
  "North China Electric Power University",
  "Nanjing University",
  "Sun Yat-sen University",
  "Fudan University",
  "Beijing Institute of Quantum Information Sciences",
];

const COMMON_UNIVERSITIES_ZH = [
  "中国科学技术大学",
  "香港大学",
  "上海大学",
  "中国海洋大学",
  "同济大学",
  "华南理工大学",
  "北京师范大学",
  "武汉大学",
  "安徽大学",
  "西南大学",
  "西安工程大学",
  "湖北大学",
  "浙江大学",
  "电子科技大学",
  "中科院软件所",
  "天津大学",
  "哈尔滨工业大学",
  "南方科技大学",
  "北京邮电大学",
  "中南大学",
  "北京理工大学",
  "西安电子科技大学",
  "华北电力大学",
  "南京大学",
  "中山大学",
  "复旦大学",
  "北京量子信息科学研究院",
];

export const HOME_MESSAGES: Record<Lang, HomeMessages> = {
  en: {
    metaDescription:
      "Open-source Python framework for parameterized quantum circuits. CPU, GPU, and Ascend backends. Auto-differentiation via MindSpore, with VQE, QAOA, and Grover built in.",
    announcement: {
      text: "Drag quantum gates into a live circuit — no install required.",
      cta: "Open Composer",
      href: "/composer/",
    },
    framework: {
      release: "MindSpore Quantum V0.11 released",
      releaseHref: "/documentation/",
      description:
        "MindSpore Quantum is the open-source quantum framework from the MindSpore ecosystem. Write parameterized quantum circuits in Python, differentiate them through MindSpore's autograd, and run on CPU, GPU, or Ascend. Ships with VQE, QAOA, Grover, and quantum phase estimation, plus full-amplitude and density-matrix simulators.",
      installCmd: "pip install mindquantum",
      installCopiedLabel: "Copied",
      installManualLabel: "Copy failed — press \u2318C / Ctrl+C",
      docsLabel: "Documentation",
    },
    architecture: {
      heading: "Architecture",
      layers: [
        {
          label: "Algorithm Library",
          href: "/api/en/#/api_python_en/mindquantum.algorithm.html",
          paradigms: [
            {
              label: "Universal",
              items: "Grover / Shor / HHL",
              href: "/api/en/#/api_python_en/algorithm/mindquantum.algorithm.library.html",
            },
            {
              label: "Variational",
              items: "VQE / QAOA / QNN",
              href: "/api/en/#/api_python_en/algorithm/mindquantum.algorithm.nisq.html",
            },
            {
              label: "Quantum-inspired",
              items: "SB / LQA / SimCIM",
              href: "/api/en/#/api_python_en/algorithm/mindquantum.algorithm.qaia.html",
            },
          ],
        },
        {
          label: "Quantum Neural Network",
          href: "/api/en/#/api_python_en/algorithm/mindquantum.algorithm.nisq.html",
          components: ["Encoder", "Ansatz", "QRam"],
        },
        {
          label: "Compiler",
          href: "/api/en/#/api_python_en/algorithm/mindquantum.algorithm.compiler.html",
          components: ["Quantum Circuit Compilation", "Qubit Mapping"],
        },
        {
          label: "Domain Specific Language",
          href: "/api/en/#/api_python_en/mindquantum.core.html",
          components: ["Quantum Gate", "Quantum Circuit", "Quantum Operator"],
        },
        {
          label: "Simulator",
          href: "/api/en/#/api_python_en/mindquantum.simulator.html",
          components: [
            "Full Amplitude Simulator",
            "Density Matrix Simulator",
            "Quantum Chemistry Simulator",
          ],
        },
      ],
    },
    hero: {
      title: "MindQuantum",
      subtitle:
        "Build and simulate quantum circuits with performance, clarity, and delightful docs.",
      startLabel: "Start Learning",
      repoLabel: "Source Code",
      slides: [
        {
          title: "MindSpore Quantum",
          subtitle:
            "Python framework for parameterized quantum circuits. CPU, GPU, and Ascend backends. Auto-differentiation via MindSpore.",
          background: "quantum",
          tone: "light",
          actions: [
            {
              label: "AtomGit",
              variant: "primary",
              href: "https://atomgit.com/mindspore/mindquantum",
              external: true,
            },
            {
              label: "GitHub",
              variant: "outline",
              href: "https://github.com/mindspore-ai/mindquantum",
              external: true,
            },
            {
              label: "Gitee",
              variant: "outline",
              href: "https://gitee.com/mindspore/mindquantum",
              external: true,
            },
          ],
        },
        {
          eyebrow: "Internship",
          title: "Online Open-Source Internship Tasks",
          subtitle:
            "Join the MindSpore Quantum community and contribute to real open-source quantum computing projects.",
          background: "internship",
          tone: "light",
          actions: [
            { label: "Learn More", variant: "primary", href: "/community/" },
            { label: "Task List", variant: "outline", href: "/community/" },
          ],
        },
        {
          eyebrow: "Community",
          title: "Quantum Computing Group Meeting",
          subtitle: "Live Every Monday 10 AM on Koushare and Bilibili",
          background: "meeting",
          tone: "dark",
          actions: [
            {
              label: "View Video",
              variant: "primary",
              href: "https://www.bilibili.com/",
              icon: "play",
              external: true,
            },
          ],
        },
      ],
    },
    features: {
      heading: "Features",
      items: [
        {
          title: "Visual circuit programming",
          description:
            "Drag quantum gates onto a circuit and watch the state vector update in real time. Export to Python, OpenQASM, or paste straight into a Jupyter notebook.",
          image: "visual",
        },
        {
          title: "Trainable quantum circuits",
          description:
            "Parameterized circuits differentiate through MindSpore's autograd — VQE, QAOA, and QNN models compose directly with any MindSpore optimizer.",
          image: "hybrid",
        },
        {
          title: "CPU, GPU, and Ascend backends",
          description:
            "Full-amplitude and density-matrix simulators on all three. Switch single- and double-precision per run, with no recompilation step.",
          image: "simulation",
        },
        {
          title: "Algorithms, batteries included",
          description:
            "VQE, QAOA, Grover, and Quantum Phase Estimation ship as one-line APIs — drop-in for quantum chemistry (LiH, H₂O) and combinatorial problems (MaxCut, TSP).",
          image: "algorithm",
        },
      ],
    },
    research: {
      heading: "Research",
      subtitle: "Over 100 papers researched based on MindSpore Quantum",
      statement:
        "100+ peer-reviewed papers from 30+ institutions — including Peking University, Tsinghua, and Shanghai Jiao Tong.",
      linkLabel: "See the full institution list",
      linkHref: "/community/",
      universities: COMMON_UNIVERSITIES_EN,
      featuredUniversities: [
        "Peking University",
        "Tsinghua University",
        "Shanghai Jiao Tong University",
      ],
    },
    learning: {
      heading: "Start Learning",
      cards: [
        {
          icon: "🔬",
          title: "Quantum foundations",
          description:
            "Zero-foundation introduction to quantum information and computing — the math, the postulates, and the vocabulary you need before writing any circuit.",
          color: "primary",
          href: "/learning/",
        },
        {
          icon: "🧩",
          title: "Install and set up",
          description:
            "Install MindSpore Quantum on Linux, macOS, Windows, or Ascend, and stand up a local compile + debug environment.",
          color: "primary",
          href: "/documentation/",
        },
        {
          icon: "🚀",
          title: "Algorithm case studies",
          description:
            "Runnable walkthroughs of VQE, QAOA, Grover, and quantum phase estimation — the jumping-off point for research work.",
          color: "primary",
          href: "/docs/en/",
        },
        {
          icon: "🎬",
          title: "Video courses",
          description:
            "Recorded lectures covering the introduction to quantum computing, MindSpore Quantum programming, case analysis, and applications.",
          color: "primary",
          badge: "Chinese only",
          href: "/courses/",
        },
      ],
    },
    cta: {
      title: "Start building quantum programs with MindSpore Quantum",
      installLabel: "Install",
      installHref: "/documentation/",
      docsLabel: "Documentation",
      docsHref: "/documentation/",
    },
    docs: {
      heading: "Documentation",
      blurbBeforeLink: "Browse tutorials, examples, and API reference in the ",
      linkLabel: "documentation portal",
      blurbAfterLink: ".",
    },
    builder: {
      heading: "Interactive Circuit",
      qubits: "Qubits",
      measurementProbabilities: "Measurement Probabilities",
      stateVector: "State Vector",
    },
  },
  zh: {
    metaDescription:
      "开源 Python 量子框架。支持参数化量子电路与量子-经典混合算法，可在 CPU、GPU 与昇腾上运行，通过 MindSpore 实现自动微分，内置 VQE、QAOA 与 Grover。",
    announcement: {
      text: "在浏览器里拖放量子门，构建电路——无需安装。",
      cta: "打开 Composer",
      href: "/zh/composer/",
    },
    framework: {
      release: "MindSpore Quantum V0.11 发布",
      releaseHref: "/zh/documentation/",
      description:
        "MindSpore Quantum 是 MindSpore 生态中的开源量子框架。用 Python 编写参数化量子电路，通过 MindSpore 的自动微分引擎训练，并在 CPU、GPU 或昇腾上运行。内置 VQE、QAOA、Grover 与量子相位估计，以及全振幅和密度矩阵模拟器。",
      installCmd: "pip install mindquantum",
      installCopiedLabel: "已复制",
      installManualLabel: "复制失败——请按 \u2318C / Ctrl+C",
      docsLabel: "文档",
    },
    architecture: {
      heading: "框架架构",
      layers: [
        {
          label: "算法库",
          href: "/api/zh/#/api_python/mindquantum.algorithm.html",
          paradigms: [
            {
              label: "通用算法",
              items: "Grover / Shor / HHL",
              href: "/api/zh/#/api_python/algorithm/mindquantum.algorithm.library.html",
            },
            {
              label: "变分算法",
              items: "VQE / QAOA / QNN",
              href: "/api/zh/#/api_python/algorithm/mindquantum.algorithm.nisq.html",
            },
            {
              label: "量子启发算法",
              items: "SB / LQA / SimCIM",
              href: "/api/zh/#/api_python/algorithm/mindquantum.algorithm.qaia.html",
            },
          ],
        },
        {
          label: "量子神经网络",
          href: "/api/zh/#/api_python/algorithm/mindquantum.algorithm.nisq.html",
          components: ["编码器", "拟设", "QRam"],
        },
        {
          label: "编译器",
          href: "/api/zh/#/api_python/algorithm/mindquantum.algorithm.compiler.html",
          components: ["量子电路编译", "量子比特映射"],
        },
        {
          label: "领域专用语言",
          href: "/api/zh/#/api_python/mindquantum.core.html",
          components: ["量子门", "量子电路", "量子算符"],
        },
        {
          label: "模拟器",
          href: "/api/zh/#/api_python/mindquantum.simulator.html",
          components: ["全振幅模拟器", "密度矩阵模拟器", "量子化学模拟器"],
        },
      ],
    },
    hero: {
      title: "MindQuantum",
      subtitle: "高性能、清晰易用的量子电路构建与模拟。",
      startLabel: "开始学习",
      repoLabel: "查看源码",
      slides: [
        {
          title: "MindSpore Quantum",
          subtitle:
            "基于 Python 的参数化量子电路框架，可运行于 CPU、GPU 与昇腾，通过 MindSpore 实现自动微分。",
          background: "quantum",
          tone: "light",
          actions: [
            {
              label: "AtomGit",
              variant: "primary",
              href: "https://atomgit.com/mindspore/mindquantum",
              external: true,
            },
            {
              label: "GitHub",
              variant: "outline",
              href: "https://github.com/mindspore-ai/mindquantum",
              external: true,
            },
            {
              label: "Gitee",
              variant: "outline",
              href: "https://gitee.com/mindspore/mindquantum",
              external: true,
            },
          ],
        },
        {
          eyebrow: "实习",
          title: "在线开源实习任务",
          subtitle:
            "加入 MindSpore Quantum 社区，为真实的开源量子计算项目贡献力量。",
          background: "internship",
          tone: "light",
          actions: [
            { label: "了解更多", variant: "primary", href: "/zh/community/" },
            { label: "任务列表", variant: "outline", href: "/zh/community/" },
          ],
        },
        {
          eyebrow: "社区",
          title: "量子计算组会",
          subtitle: "每周一上午 10 点在蔻享和哔哩哔哩直播",
          background: "meeting",
          tone: "dark",
          actions: [
            {
              label: "观看视频",
              variant: "primary",
              href: "https://www.bilibili.com/",
              icon: "play",
              external: true,
            },
          ],
        },
      ],
    },
    features: {
      heading: "核心特性",
      items: [
        {
          title: "可视化电路编程",
          description:
            "拖放量子门构建电路，实时查看态向量变化。支持导出为 Python、OpenQASM，也可直接粘贴进 Jupyter notebook。",
          image: "visual",
        },
        {
          title: "可训练量子电路",
          description:
            "参数化量子电路通过 MindSpore 自动微分引擎求导，VQE、QAOA 与 QNN 可与任意 MindSpore 优化器无缝组合。",
          image: "hybrid",
        },
        {
          title: "CPU、GPU 与昇腾后端",
          description:
            "全振幅与密度矩阵模拟器同时支持三种后端，单精度 / 双精度可按需切换，无需重新编译。",
          image: "simulation",
        },
        {
          title: "算法开箱即用",
          description:
            "VQE、QAOA、Grover 与量子相位估计均提供一行式 API，可直接用于量子化学（LiH、H₂O）与组合优化（MaxCut、TSP）。",
          image: "algorithm",
        },
      ],
    },
    research: {
      heading: "研究",
      subtitle: "超过 100 篇基于 MindSpore Quantum 的论文",
      statement:
        "超过 100 篇同行评审论文，覆盖 30 余所院校——包括北京大学、清华大学与上海交通大学。",
      linkLabel: "查看完整院校列表",
      linkHref: "/zh/community/",
      universities: COMMON_UNIVERSITIES_ZH,
      featuredUniversities: ["北京大学", "清华大学", "上海交通大学"],
    },
    learning: {
      heading: "开始学习",
      cards: [
        {
          icon: "🔬",
          title: "量子基础",
          description:
            "零基础入门：量子信息与计算的数学基础、基本假设与术语，先学透再写代码。",
          color: "primary",
          href: "/zh/learning/",
        },
        {
          icon: "🧩",
          title: "安装与环境搭建",
          description:
            "在 Linux、macOS、Windows 或昇腾上安装 MindSpore Quantum，并快速搭建本地编译与调试环境。",
          color: "primary",
          href: "/zh/documentation/",
        },
        {
          icon: "🚀",
          title: "算法案例精讲",
          description:
            "VQE、QAOA、Grover 与量子相位估计的可运行案例——快速进入研究工作的起点。",
          color: "primary",
          href: "/docs/zh/",
        },
        {
          icon: "🎬",
          title: "视频课程",
          description:
            "涵盖量子计算入门、MindSpore Quantum 编程、案例分析与实战应用的录播课程。",
          color: "primary",
          badge: "仅中文",
          href: "/courses/",
        },
      ],
    },
    cta: {
      title: "使用 MindSpore Quantum 开启量子编程",
      installLabel: "安装",
      installHref: "/zh/documentation/",
      docsLabel: "文档",
      docsHref: "/zh/documentation/",
    },
    docs: {
      heading: "文档",
      blurbBeforeLink: "在 ",
      linkLabel: "文档中心",
      blurbAfterLink: " 浏览教程、示例与 API 参考。",
    },
    builder: {
      heading: "交互式电路",
      qubits: "量子比特数",
      measurementProbabilities: "测量概率",
      stateVector: "状态向量",
    },
  },
};
