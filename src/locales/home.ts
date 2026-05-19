import type { Lang } from "../config/i18n";

export type HomeFeature = {
  /* A single "pillar" of the framework, shaped after the whitepaper's
     four-block architecture figure. No image field: per design brief,
     marketing surfaces avoid code-generated abstract decoration; the
     concrete component names in `keywords` carry the proof instead. */
  title: string;
  description: string;
  keywords: string[];
};

export type LearningCard = {
  icon: string;
  title: string;
  description: string;
  color: "primary" | "green" | "orange" | "teal";
  badge?: string;
  href: string;
};

export type AnnouncementItem = {
  id: string;
  text: string;
  cta: string;
  href: string;
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
  announcements: AnnouncementItem[];
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
    eyebrow?: string;
    headline: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    proofTitle: string;
    proofLang: string;
    proofCode: string;
    proofAriaLabel: string;
    /* Secondary link rendered in the footer of the hero proof card. Points
       to runnable tutorials, NOT Composer — Composer is a sibling product
       that doesn't execute MindQuantum code (yet), so promoting "Run in
       Composer →" beneath a Python snippet was a category error. */
    proofLinkLabel: string;
    proofLinkHref: string;
    mirrorsLabel: string;
    opensInNewTab: string;
  };
  features: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: HomeFeature[];
  };
  research: {
    heading: string;
    subtitle: string;
    universities: string[];
    featuredUniversities: string[];
    statement: string;
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
    announcements: [
      {
        id: "composer",
        text: "Composer — a standalone visual circuit editor that runs entirely in your browser.",
        cta: "Try Composer",
        href: "/composer/",
      },
    ],
    framework: {
      release: "MindSpore Quantum V0.12 released",
      releaseHref: "/docs/en/src/RELEASE/",
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
      eyebrow: "Open source · MindSpore ecosystem",
      headline: "Quantum circuits, differentiated end\u2011to\u2011end",
      description:
        "Python framework for parameterized quantum circuits. CPU, GPU, and Ascend backends. Auto-differentiation via MindSpore.",
      ctaLabel: "Read the docs",
      ctaHref: "/documentation/",
      proofTitle: "bell_state.py",
      proofLang: "python",
      proofCode:
        "from mindquantum.core.circuit import Circuit\n" +
        "from mindquantum.core.gates import H, X\n" +
        "from mindquantum.simulator import Simulator\n" +
        "\n" +
        "# Prepare a Bell state |\u03a6\u207a\u27e9\n" +
        "circ = Circuit([H.on(0), X.on(1, 0)])\n" +
        "sim = Simulator('mqvector', 2)\n" +
        "sim.apply_circuit(circ)\n" +
        "\n" +
        "print(sim.get_qs())\n" +
        "# array([0.707+0.j, 0.+0.j, 0.+0.j, 0.707+0.j])",
      proofAriaLabel: "Sample MindQuantum code — prepare a Bell state in Python",
      proofLinkLabel: "More examples",
      proofLinkHref: "/docs/en/",
      mirrorsLabel: "Source",
      opensInNewTab: "(opens in new tab)",
    },
    features: {
      eyebrow: "Core capabilities",
      heading: "User-friendly, high-performance, AI-compatible",
      lead:
        "MindSpore Quantum is built around the NISQ era. Four pillars take a quantum program from a Python expression to a real chip: a typed circuit DSL, differentiable circuits through MindSpore, three first-class simulator backends, and a batteries-included algorithm library.",
      items: [
        {
          title: "A Pythonic circuit DSL",
          description:
            "Quantum gates, circuits, parameter resolvers, and Hamiltonians as typed Python primitives. Arbitrary control on any gate, chain-rule circuit composition, and OpenQASM export.",
          keywords: [
            "Quantum Gate",
            "Quantum Circuit",
            "Parameter Resolver",
            "Observable",
          ],
        },
        {
          title: "Differentiable end to end",
          description:
            "Parameterized circuits differentiate through MindSpore's autograd via the adjoint method. VQE, QAOA, and QNN models compose with any MindSpore optimizer, an order of magnitude faster on QAOA than competing frameworks.",
          keywords: [
            "VQE",
            "QAOA",
            "QNN",
            "Adjoint gradient",
            "Ansatz library",
          ],
        },
        {
          title: "Three backends, one model",
          description:
            "State-vector and density-matrix simulators tuned per architecture: SIMD with OpenMP on x86, CUDA on NVIDIA, NEON on Ascend. Switch single- and double-precision per run, no recompile.",
          keywords: [
            "x86 (AVX)",
            "GPU (CUDA)",
            "Ascend (NEON)",
            "Noise channels",
          ],
        },
        {
          title: "Algorithms, batteries included",
          description:
            "VQE, QAOA, Grover, Shor, HHL, and Quantum Phase Estimation as one-line APIs. A dedicated VQE quantum-chemistry simulator is open-sourced in-tree, ready for LiH, H\u2082O, and beyond.",
          keywords: [
            "Grover",
            "Shor",
            "HHL",
            "QPE",
            "VQE chemistry simulator",
          ],
        },
      ],
    },
    research: {
      heading: "Research",
      subtitle: "Over 100 papers researched based on MindSpore Quantum",
      statement:
        "100+ peer-reviewed papers from 30+ institutions — including Peking University, Tsinghua, and Shanghai Jiao Tong.",
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
      installHref: "/docs/en/src/mindquantum_install/",
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
    announcements: [
      {
        id: "composer",
        text: "Composer——独立的可视化量子电路编辑器，完全运行于浏览器中。",
        cta: "试用 Composer",
        href: "/zh/composer/",
      },
    ],
    framework: {
      release: "MindSpore Quantum V0.12 发布",
      releaseHref: "/docs/zh/src/RELEASE/",
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
      eyebrow: "开源 · MindSpore 生态",
      headline: "端到端可微分的量子电路",
      description:
        "基于 Python 的参数化量子电路框架，可运行于 CPU、GPU 与昇腾，通过 MindSpore 实现自动微分。",
      ctaLabel: "阅读文档",
      ctaHref: "/zh/documentation/",
      proofTitle: "bell_state.py",
      proofLang: "python",
      proofCode:
        "from mindquantum.core.circuit import Circuit\n" +
        "from mindquantum.core.gates import H, X\n" +
        "from mindquantum.simulator import Simulator\n" +
        "\n" +
        "# 准备 Bell 态 |\u03a6\u207a\u27e9\n" +
        "circ = Circuit([H.on(0), X.on(1, 0)])\n" +
        "sim = Simulator('mqvector', 2)\n" +
        "sim.apply_circuit(circ)\n" +
        "\n" +
        "print(sim.get_qs())\n" +
        "# array([0.707+0.j, 0.+0.j, 0.+0.j, 0.707+0.j])",
      proofAriaLabel: "MindQuantum 示例代码：用 Python 准备 Bell 态",
      proofLinkLabel: "更多示例",
      proofLinkHref: "/docs/zh/",
      mirrorsLabel: "源代码",
      opensInNewTab: "（在新标签页打开）",
    },
    features: {
      eyebrow: "核心能力",
      heading: "用户友好、高性能、AI 兼容",
      lead:
        "MindSpore Quantum 面向 NISQ 时代构建。四大支柱将量子程序从一行 Python 表达式带到真实量子芯片：类型化的电路 DSL、通过 MindSpore 端到端可微分的电路、三套一等公民的模拟器后端，以及开箱即用的算法库。",
      items: [
        {
          title: "Python 原生电路 DSL",
          description:
            "量子门、量子电路、参数解析器与哈密顿量皆以类型化 Python 原语呈现。任意门支持任意控制位，电路可链式组合，并可导出 OpenQASM。",
          keywords: [
            "量子门",
            "量子电路",
            "参数解析器",
            "可观测量",
          ],
        },
        {
          title: "端到端可微分",
          description:
            "参数化量子电路通过 MindSpore 自动微分引擎求导，采用伴随方法实现高效梯度计算。VQE、QAOA 与 QNN 可直接接入任意 MindSpore 优化器，QAOA 任务较同类框架快一个数量级以上。",
          keywords: [
            "VQE",
            "QAOA",
            "QNN",
            "伴随梯度",
            "拟设库",
          ],
        },
        {
          title: "三种后端，统一模型",
          description:
            "全振幅与密度矩阵模拟器针对各架构优化：x86 上使用 SIMD 与 OpenMP，NVIDIA 上使用 CUDA，昇腾上使用 NEON。单精度与双精度可在运行时切换，无需重新编译。",
          keywords: [
            "x86 (AVX)",
            "GPU (CUDA)",
            "昇腾 (NEON)",
            "噪声信道",
          ],
        },
        {
          title: "算法开箱即用",
          description:
            "VQE、QAOA、Grover、Shor、HHL 与量子相位估计均提供一行式 API。专为 VQE 设计的量子化学模拟器已在 MindQuantum 中开源集成，可直接用于 LiH、H\u2082O 等分子的求解。",
          keywords: [
            "Grover",
            "Shor",
            "HHL",
            "QPE",
            "VQE 化学模拟器",
          ],
        },
      ],
    },
    research: {
      heading: "研究",
      subtitle: "超过 100 篇基于 MindSpore Quantum 的论文",
      statement:
        "超过 100 篇同行评审论文，覆盖 30 余所院校——包括北京大学、清华大学与上海交通大学。",
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
      installHref: "/docs/zh/src/mindquantum_install/",
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
