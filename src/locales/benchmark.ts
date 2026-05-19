import type { Lang } from "../config/i18n";

export type BenchmarkSpec = {
  label: string;
  value: string;
};

export type BenchmarkMethodologyBlock = {
  label: string;
  value: string;
  detail?: string;
};

export type BenchmarkFramework = {
  name: string;
  version: string;
  /** Mark the framework under test so it gets typographic weight in the list. */
  highlight?: boolean;
};

export type BenchmarkSection = {
  kicker: string;
  heading: string;
  lead: string;
  cpuCaption: string;
  gpuCaption: string;
  cpuFigLabel: string;
  gpuFigLabel: string;
  cpuAlt: string;
  gpuAlt: string;
  finding: string;
  findingSource: string;
  /** Optional href for the finding attribution. When set the source label
      renders as a link (used to point at the source paper on arXiv). */
  findingHref?: string;
};

export type BenchmarkMessages = {
  metaDescription: string;
  kicker: string;
  title: string;
  subtitle: string;
  summary: BenchmarkSpec[];
  methodology: {
    heading: string;
    blocks: BenchmarkMethodologyBlock[];
  };
  frameworks: {
    heading: string;
    lead: string;
    versionLabel: string;
    items: BenchmarkFramework[];
  };
  randomCircuit: BenchmarkSection;
  qaoa: BenchmarkSection;
  cta: {
    heading: string;
    lead: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

const FRAMEWORKS: BenchmarkFramework[] = [
  { name: "MindQuantum", version: "0.9.0", highlight: true },
  { name: "Qiskit", version: "0.45.0" },
  { name: "ProjectQ", version: "0.8.0" },
  { name: "PennyLane", version: "0.33.0" },
  { name: "PyQpanda", version: "3.8.0" },
  { name: "Qulacs", version: "0.6.2" },
  { name: "TensorFlow Quantum", version: "0.7.2" },
  { name: "Intel-QS", version: "2.0.0-beta" },
  { name: "cuQuantum", version: "23.10.0" },
];

const PAPER_HREF = "https://arxiv.org/abs/2406.17248";
const BENCHMARK_CODE_HREF =
  "https://atomgit.com/mindspore/mindquantum/tree/research/whitepaper/code/benchmark";

export const BENCHMARK_MESSAGES: Record<Lang, BenchmarkMessages> = {
  en: {
    metaDescription:
      "Measured performance of MindQuantum against eight other quantum computing frameworks on random circuit simulation and end-to-end QAOA, on CPU and a single NVIDIA V100 GPU.",
    kicker: "Performance benchmark · v0.9.0",
    title: "MindQuantum against eight other quantum frameworks.",
    subtitle:
      "Same hardware, same circuits, double precision. We ran random circuit simulation and end-to-end QAOA on every framework, on both CPU and a single NVIDIA V100. The four charts below are the result.",
    summary: [
      { label: "Frameworks tested", value: "9" },
      { label: "Workloads", value: "2" },
      { label: "Qubit range", value: "4 to 27" },
      { label: "Backends", value: "CPU and GPU" },
    ],
    methodology: {
      heading: "Method",
      blocks: [
        {
          label: "Hardware",
          value: "Intel Xeon E5-2620 v3 @ 2.40 GHz",
          detail: "16 threads, SIMD enabled. NVIDIA V100 for the GPU runs.",
        },
        {
          label: "Test harness",
          value: "pytest-benchmark",
          detail:
            "End-to-end wall-clock per run. Each data point is the median of multiple iterations.",
        },
        {
          label: "Numerical precision",
          value: "Double (FP64)",
          detail:
            "TensorFlow Quantum is single precision (FP32); the framework does not expose a double-precision path.",
        },
      ],
    },
    frameworks: {
      heading: "Nine frameworks, one rig.",
      lead: "Every framework was installed at its current stable release, configured for the same number of threads, and given the same circuit definitions.",
      versionLabel: "Version",
      items: FRAMEWORKS,
    },
    randomCircuit: {
      kicker: "01 / Raw simulation speed",
      heading: "Random circuit evolution, 4 to 27 qubits.",
      lead: "Each framework simulates the same random circuit built from X, Y, Z, H, CNOT, S, T, RX, RY, RZ, Rxx, Ryy, Rzz, SWAP, and their controlled variants. Qubit count scales from 4 to 27. We time each run with pytest-benchmark and plot the median against the qubit count on a log scale.",
      cpuFigLabel: "Fig. 1a — CPU backend",
      gpuFigLabel: "Fig. 1b — GPU backend",
      cpuAlt:
        "Log-scale line chart comparing CPU simulation time of a random circuit for MindQuantum (FP64 and FP32), Qulacs, PyQpanda, ProjectQ, PennyLane, Intel-QS, and TensorFlow Quantum, from 4 to 27 qubits.",
      gpuAlt:
        "Log-scale line chart comparing GPU simulation time of a random circuit for MindQuantum (FP64 and FP32), Qulacs, PennyLane, and TensorFlow Quantum, from 4 to 27 qubits on a single NVIDIA V100.",
      cpuCaption:
        "MindQuantum and Qulacs lead at every qubit count. The dip at 13 qubits is the threshold where MindQuantum switches on OpenMP multi-threading; below it the single-threaded path is faster.",
      gpuCaption:
        "On a single V100, MindQuantum keeps its lead through 27 qubits. TensorFlow Quantum scales more aggressively at the high end, but the comparison is single precision against double.",
      finding:
        "MindQuantum and Qulacs have been optimized to near the limit of the low-level implementation.",
      findingSource: "MindSpore Quantum white paper · arXiv:2406.17248",
      findingHref: PAPER_HREF,
    },
    qaoa: {
      kicker: "02 / End-to-end optimization",
      heading: "QAOA solving max-cut on 4-regular graphs.",
      lead: "End-to-end timing of a real variational workload: build the QAOA ansatz from a one-step Trotter decomposition, then drive it through scipy.optimize.minimize with BFGS until convergence. Problem size ranges from 5 to 23 nodes. Each framework runs until its own time budget is exhausted, which is why the curves end at different qubit counts.",
      cpuFigLabel: "Fig. 2a — CPU backend",
      gpuFigLabel: "Fig. 2b — GPU backend",
      cpuAlt:
        "Log-scale line chart comparing CPU end-to-end QAOA time for MindQuantum (FP64 and FP32), Qulacs, TensorCircuit (FP64 and FP32), TensorFlow Quantum, PennyLane, and PyQpanda, from 5 to 23 qubits.",
      gpuAlt:
        "Log-scale line chart comparing GPU end-to-end QAOA time for MindQuantum (FP64 and FP32), TensorFlow Quantum, and PennyLane, from 5 to 23 qubits on a single NVIDIA V100.",
      cpuCaption:
        "MindQuantum stays at least an order of magnitude ahead through the entire qubit range. Frameworks without an efficient adjoint method fall behind early.",
      gpuCaption:
        "On the V100, the gap widens further. PennyLane drops out at 14 qubits, TensorFlow Quantum at 19; MindQuantum reaches 23.",
      finding:
        "MindQuantum is at least one order of magnitude faster than other frameworks, mainly due to its optimized adjoint method for gradient computation and efficient circuit evolution.",
      findingSource: "MindSpore Quantum white paper · arXiv:2406.17248",
      findingHref: PAPER_HREF,
    },
    cta: {
      heading: "Reproduce these benchmarks.",
      lead: "Every framework, circuit, and harness used here is open source. The text and figures on this page are drawn from the MindSpore Quantum white paper; the runner scripts live next to the paper in the public repository.",
      primary: { label: "Read the paper · arXiv:2406.17248", href: PAPER_HREF },
      secondary: { label: "Run the benchmark code", href: BENCHMARK_CODE_HREF },
    },
  },
  zh: {
    metaDescription:
      "在同一硬件上对 MindQuantum 与其他八个量子计算框架进行性能对比，覆盖随机电路模拟与端到端 QAOA，包含 CPU 与单卡 NVIDIA V100 GPU 两种后端。",
    kicker: "性能基准 · v0.9.0",
    title: "MindQuantum 与八个量子框架同台对比。",
    subtitle:
      "同一套硬件、同一组电路、统一双精度。我们在所有框架上分别跑了随机电路模拟与端到端 QAOA，并覆盖 CPU 与单卡 NVIDIA V100 两种后端。下方四张图即为结果。",
    summary: [
      { label: "参测框架", value: "9 个" },
      { label: "测试任务", value: "2 项" },
      { label: "比特规模", value: "4 至 27" },
      { label: "运行后端", value: "CPU 与 GPU" },
    ],
    methodology: {
      heading: "测试方法",
      blocks: [
        {
          label: "硬件",
          value: "Intel Xeon E5-2620 v3 @ 2.40 GHz",
          detail: "16 线程并开启 SIMD；GPU 测试使用单卡 NVIDIA V100。",
        },
        {
          label: "测试工具",
          value: "pytest-benchmark",
          detail: "记录每次运行的端到端墙钟时间，取多次迭代的中位数。",
        },
        {
          label: "数值精度",
          value: "双精度 FP64",
          detail: "TensorFlow Quantum 仅支持单精度 FP32，框架本身未提供双精度路径。",
        },
      ],
    },
    frameworks: {
      heading: "九个框架，一套环境。",
      lead: "所有框架均安装其当前稳定版本，使用相同的线程配置，并接收完全一致的电路定义。",
      versionLabel: "版本",
      items: FRAMEWORKS,
    },
    randomCircuit: {
      kicker: "01 / 底层模拟性能",
      heading: "随机电路演化，4 至 27 比特。",
      lead: "每个框架模拟同一条随机电路，门集合包含 X、Y、Z、H、CNOT、S、T、RX、RY、RZ、Rxx、Ryy、Rzz、SWAP 及其受控版本。比特数从 4 扩展到 27，使用 pytest-benchmark 计时，以对数坐标绘制中位数耗时随比特数的变化。",
      cpuFigLabel: "图 1a — CPU 后端",
      gpuFigLabel: "图 1b — GPU 后端",
      cpuAlt:
        "对数坐标折线图：在 CPU 上对随机电路的模拟耗时进行对比，包含 MindQuantum（FP64 与 FP32）、Qulacs、PyQpanda、ProjectQ、PennyLane、Intel-QS 与 TensorFlow Quantum，比特数从 4 到 27。",
      gpuAlt:
        "对数坐标折线图：在单卡 NVIDIA V100 上对随机电路的 GPU 模拟耗时进行对比，包含 MindQuantum（FP64 与 FP32）、Qulacs、PennyLane 与 TensorFlow Quantum，比特数从 4 到 27。",
      cpuCaption:
        "MindQuantum 与 Qulacs 在所有比特数下均处于领先。13 比特处的小幅下凹来自 MindQuantum 在该阈值切换到 OpenMP 多线程；阈值以下单线程更快。",
      gpuCaption:
        "在单卡 V100 上，MindQuantum 一直保持领先直至 27 比特。TensorFlow Quantum 在高比特数下扩展更陡，但对比的是单精度对双精度。",
      finding:
        "MindQuantum 与 Qulacs 在底层实现上的优化已接近极限。",
      findingSource: "MindSpore Quantum 技术报告 · arXiv:2406.17248",
      findingHref: PAPER_HREF,
    },
    qaoa: {
      kicker: "02 / 端到端优化",
      heading: "QAOA 在 4-正则图上的最大割求解。",
      lead: "对一个真实的变分工作负载进行端到端计时：用一阶 Trotter 分解构造 QAOA 拟设电路，再通过 scipy.optimize.minimize 的 BFGS 方法优化至收敛。问题规模从 5 个节点扩展到 23 个；各框架在自身时间预算耗尽时停止，因此曲线终止比特数不一致。",
      cpuFigLabel: "图 2a — CPU 后端",
      gpuFigLabel: "图 2b — GPU 后端",
      cpuAlt:
        "对数坐标折线图：在 CPU 上对 QAOA 端到端求解耗时进行对比，包含 MindQuantum（FP64 与 FP32）、Qulacs、TensorCircuit（FP64 与 FP32）、TensorFlow Quantum、PennyLane 与 PyQpanda，比特数从 5 到 23。",
      gpuAlt:
        "对数坐标折线图：在单卡 NVIDIA V100 上对 QAOA 端到端求解耗时进行对比，包含 MindQuantum（FP64 与 FP32）、TensorFlow Quantum 与 PennyLane，比特数从 5 到 23。",
      cpuCaption:
        "MindQuantum 在整个比特范围内至少领先一个数量级。缺少高效伴随方法的框架在早期就掉队。",
      gpuCaption:
        "在 V100 上差距进一步拉大：PennyLane 在 14 比特处终止，TensorFlow Quantum 在 19 比特处终止，而 MindQuantum 跑到了 23 比特。",
      finding:
        "MindQuantum 至少比其他框架快一个数量级，这主要得益于其参数化电路梯度计算上经过优化的伴随方法与高效的电路演化实现。",
      findingSource: "MindSpore Quantum 技术报告 · arXiv:2406.17248",
      findingHref: PAPER_HREF,
    },
    cta: {
      heading: "复现这些基准。",
      lead: "本页所用的框架、电路与测试脚本均为开源代码。文中数据与文字摘自 MindSpore Quantum 技术报告；测试脚本与论文同仓库公开发布。",
      primary: { label: "阅读论文 · arXiv:2406.17248", href: PAPER_HREF },
      secondary: { label: "查看基准测试代码", href: BENCHMARK_CODE_HREF },
    },
  },
};
