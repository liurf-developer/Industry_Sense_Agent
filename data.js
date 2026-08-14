// =============================================================
// 每周更新主要修改这个文件。
// 1) 更新 REPORT_META.date / issue / headline
// 2) 在 INTELLIGENCE_DATA 中新增、修改或删除情报卡片
// 3) Manufacturing AI Map 覆盖热度、指标、筛选项会自动重新计算
// =============================================================

const REPORT_META = {
  date: "2026-08-14",
  issue: "2026-W33",
  headline: "Agentic Manufacturing × Digital Twin × Physical AI"
};

// 本期首页信号：每周只在数据层维护，页面会自动渲染。
const WEEKLY_SIGNALS = [
  { title: "AI 从 Pilot 进入 Scale", insight: "判断标准转向跨工厂复制能力与持续制造 KPI。" },
  { title: "Agent 进入工程与运营工具链", insight: "价值焦点转向调用工具、编排任务与验证结果。" },
  { title: "Digital Twin 成为 AI 验证环境", insight: "虚拟调试、Agent 决策验证与 Physical AI 训练开始汇合。" },
  { title: "Physical AI 开始产品化", insight: "仿真、合成数据、Sim-to-Real 与机器人部署形成工程闭环。" }
];

// 成熟度使用稳定枚举参与统计与筛选；历史中文值通过映射兼容。
const MATURITY_LABELS = {
  research: "研究", concept: "概念/趋势", announced: "已发布",
  pilot: "试验/试点", product: "产品", production: "生产采用", scale: "规模化"
};

const MATURITY_LEGACY_MAP = {
  "研究": "research", "趋势": "concept", "战略/试验": "concept",
  "即将发布": "announced", "试验": "pilot", "试点": "pilot",
  "蓝图/试验": "pilot", "产品/试验": "pilot", "产品": "product",
  "试验→采用": "production", "规模化": "scale"
};

const MANUFACTURING_STAGES = [
  "产品研发",
  "工艺工程",
  "生产计划",
  "生产执行",
  "质量",
  "设备维护",
  "供应链/物流",
  "工厂工程",
  "现场作业",
  "机器人/自动化"
];

const LIBRARIES = [
  "全部",
  "行业趋势",
  "技术趋势",
  "新兴产品",
  "前沿方案"
];

const INTELLIGENCE_DATA = [
  {
    "id": "I01",
    "lib": "行业趋势",
    "title": "WEF Intelligent Industrial Operations Outlook 2026",
    "date": "2026-04-16",
    "org": "World Economic Forum",
    "summary": "工业运营正在从传统自动化走向智能、互联和更高程度自治的系统。",
    "signal": "行业目标正在从“自动化”升级为“自治运营”，人机实时协同会成为新的运营模型。",
    "maps": [
      "生产计划",
      "生产执行",
      "设备维护",
      "供应链/物流"
    ],
    "caps": [
      "Industrial Agent",
      "Physical AI",
      "Autonomous Systems"
    ],
    "url": "https://www.weforum.org/publications/intelligent-industrial-operations-outlook-2026/",
    "maturity": "趋势",
    "impact": 5,
    "novelty": 4
  },
  {
    "id": "I02",
    "lib": "行业趋势",
    "title": "Global Lighthouse Network: Rewiring Operations for Resilience and Impact at Scale",
    "date": "2026-01-15",
    "org": "World Economic Forum",
    "summary": "全球灯塔网络把运营韧性、AI驱动和企业级规模化放在核心位置。",
    "signal": "制造业评判 AI 的标准正在从“有没有案例”转向“能否规模化复制并产生持续 KPI 收益”。",
    "maps": [
      "生产执行",
      "质量",
      "设备维护",
      "供应链/物流"
    ],
    "caps": [
      "Industrial AI",
      "Data Foundation",
      "Scaled Deployment"
    ],
    "url": "https://www.weforum.org/publications/global-lighthouse-network-rewiring-operations-for-resilience-and-impact-at-scale/",
    "maturity": "规模化",
    "impact": 5,
    "novelty": 3
  },
  {
    "id": "I03",
    "lib": "行业趋势",
    "title": "WEF 2026 Global Lighthouse Network — 15 new sites / 238 sites",
    "date": "2026-06-22",
    "org": "World Economic Forum",
    "summary": "2026年6月新增15个灯塔站点，AI规划、数字孪生装配、AI过程控制、GenAI维护等进入核心生产环节。",
    "signal": "AI价值开始直接用产能、良率、成本、停机等制造 KPI 衡量，说明 AI 已进入运营主流程。",
    "maps": [
      "生产计划",
      "生产执行",
      "质量",
      "设备维护",
      "供应链/物流"
    ],
    "caps": [
      "Industrial AI",
      "Digital Twin",
      "GenAI/Copilot"
    ],
    "url": "https://www.weforum.org/press/2026/06/new-global-lighthouse-sites-demonstrate-how-ai-is-rewiring-manufacturing-and-supply-chains/",
    "maturity": "规模化",
    "impact": 5,
    "novelty": 4
  },
  {
    "id": "I04",
    "lib": "行业趋势",
    "title": "2026 State of Smart Manufacturing — APAC",
    "date": "2026-05-20",
    "org": "Rockwell Automation",
    "summary": "APAC制造企业继续增加AI/ML投入，但数据利用率、系统集成、安全与人才仍是规模化阻碍。",
    "signal": "未来制造 AI 项目竞争力会越来越取决于 Industrial Data / Integration Layer，而不只是模型能力。",
    "maps": [
      "生产执行",
      "质量",
      "设备维护",
      "供应链/物流"
    ],
    "caps": [
      "Data Foundation",
      "Industrial AI",
      "Cybersecurity"
    ],
    "url": "https://www.rockwellautomation.com/en-in/company/news/press-releases/apac-sosm-2026.html",
    "maturity": "趋势",
    "impact": 5,
    "novelty": 2
  },
  {
    "id": "T01",
    "lib": "技术趋势",
    "title": "2026 Roadmap on AI and ML for Smart Manufacturing",
    "date": "2026-04-05",
    "org": "Academic consortium / arXiv",
    "summary": "技术路线覆盖工业大数据、感知、自主系统、数字孪生、机器人、供应链，并把 Foundation Model、Semantic AI、Physics-informed AI 列入前沿。",
    "signal": "制造业AI正在形成“数据 + 语义 + 仿真 + 基础模型 + 自主系统”的复合技术栈。",
    "maps": [
      "产品研发",
      "工艺工程",
      "生产执行",
      "质量",
      "设备维护",
      "供应链/物流",
      "机器人/自动化"
    ],
    "caps": [
      "Foundation Model",
      "Digital Twin",
      "Semantic AI",
      "Physics-informed AI",
      "Robotics"
    ],
    "url": "https://arxiv.org/abs/2605.00839",
    "maturity": "研究",
    "impact": 4,
    "novelty": 5
  },
  {
    "id": "T02",
    "lib": "技术趋势",
    "title": "Siemens + NVIDIA: Industrial AI Operating System",
    "date": "2026-01-06",
    "org": "Siemens / NVIDIA",
    "summary": "双方提出覆盖设计、工程、制造、运营与供应链的 Industrial AI Operating System。",
    "signal": "AI能力正在从独立助手上移为跨工业生命周期的平台层，数字孪生将成为持续决策与优化环境。",
    "maps": [
      "产品研发",
      "工艺工程",
      "生产执行",
      "供应链/物流",
      "工厂工程"
    ],
    "caps": [
      "Industrial AI OS",
      "Digital Twin",
      "Agentic AI",
      "Simulation",
      "AI Infrastructure"
    ],
    "url": "https://nvidianews.nvidia.com/news/siemens-and-nvidia-expand-partnership-industrial-ai-operating-system",
    "maturity": "战略/试验",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "T03",
    "lib": "技术趋势",
    "title": "NVIDIA GTC 2026 — Physical AI / Agentic AI / AI Factories",
    "date": "2026-03",
    "org": "NVIDIA",
    "summary": "GTC 2026把 Agentic AI、Physical AI、Robotics 与 AI Factories 放在同一个计算与开发框架中。",
    "signal": "制造AI计算栈正形成“基础设施 + Agent + 仿真世界 + 机器人执行”的完整链条。",
    "maps": [
      "产品研发",
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Agentic AI",
      "Physical AI",
      "Simulation",
      "AI Infrastructure"
    ],
    "url": "https://www.nvidia.com/gtc/",
    "maturity": "趋势",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "T04",
    "lib": "技术趋势",
    "title": "ABB + NVIDIA: Industrial Physical AI / Sim-to-Real",
    "date": "2026-03-09",
    "org": "ABB Robotics / NVIDIA",
    "summary": "ABB把 Omniverse 能力整合进 RobotStudio，通过数字孪生与合成数据支撑 Physical AI 训练和 Sim-to-Real。",
    "signal": "Physical AI 工程化的关键在仿真精度、合成数据、验证流程和真实反馈闭环。",
    "maps": [
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Physical AI",
      "Digital Twin",
      "Synthetic Data",
      "Simulation"
    ],
    "url": "https://new.abb.com/news/detail/134030/prsrl-abb-robotics-partners-with-nvidia-to-deliver-industrial-grade-physical-ai-at-scale",
    "maturity": "试验",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "P01",
    "lib": "新兴产品",
    "title": "Siemens Digital Twin Composer",
    "date": "2026-01-06",
    "org": "Siemens",
    "summary": "结合 Siemens 工业数据与 NVIDIA Omniverse 构建高保真工业数字孪生。",
    "signal": "数字孪生产品正在从设计仿真工具升级为跨团队决策与 AI 运行载体。",
    "maps": [
      "产品研发",
      "工厂工程",
      "生产执行"
    ],
    "caps": [
      "Digital Twin",
      "Simulation",
      "Industrial Data"
    ],
    "url": "https://press.siemens.com/global/en/pressrelease/siemens-unveils-technologies-accelerate-industrial-ai-revolution-ces-2026",
    "maturity": "产品",
    "impact": 4,
    "novelty": 4
  },
  {
    "id": "P02",
    "lib": "新兴产品",
    "title": "Siemens Industrial Copilot Portfolio — 9 copilots",
    "date": "2026-01-06",
    "org": "Siemens",
    "summary": "Siemens将 Industrial Copilot 扩展为覆盖多个工业角色和任务的产品族。",
    "signal": "Copilot 正从单一助手变成角色化产品组合，为后续多 Agent 协作铺路。",
    "maps": [
      "产品研发",
      "工艺工程",
      "生产执行",
      "设备维护"
    ],
    "caps": [
      "GenAI/Copilot",
      "Industrial Agent"
    ],
    "url": "https://press.siemens.com/global/en/pressrelease/siemens-unveils-technologies-accelerate-industrial-ai-revolution-ces-2026",
    "maturity": "产品",
    "impact": 4,
    "novelty": 3
  },
  {
    "id": "P03",
    "lib": "新兴产品",
    "title": "Schneider Industrial Copilot + EcoStruxure Automation Expert",
    "date": "2026-04-16",
    "org": "Schneider Electric / Microsoft",
    "summary": "Industrial Copilot 进入控制配置、文档和软件定义自动化工程流程。",
    "signal": "工业 Copilot 的 ROI 已开始用工程时间和产线变更周期衡量，这是从 Demo 走向生产的重要信号。",
    "maps": [
      "工艺工程",
      "生产执行",
      "机器人/自动化"
    ],
    "caps": [
      "GenAI/Copilot",
      "Software-defined Automation",
      "Industrial Agent"
    ],
    "url": "https://www.se.com/ww/en/about-us/newsroom/news/press-releases/Schneider-Electric-unveils-next-generation-agentic-manufacturing-capabilities-powered-by-Microsoft-Azure-AI-at-Hannover-Messe-2026-69e08de2ddabef15890a48f3/",
    "maturity": "产品",
    "impact": 5,
    "novelty": 4
  },
  {
    "id": "P04",
    "lib": "新兴产品",
    "title": "Rockwell FactoryTalk Design Studio + Emulate3D AI workflow",
    "date": "2026-04-20",
    "org": "Rockwell Automation",
    "summary": "AI编排数字孪生、控制器工程和验证流程，支持自然语言建模并衔接控制器工程。",
    "signal": "自动化工程软件里的 AI 正从代码助手升级为跨模型、控制器和验证流程的编排者。",
    "maps": [
      "工艺工程",
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Industrial Agent",
      "Digital Twin",
      "Controller Engineering"
    ],
    "url": "https://www.rockwellautomation.com/en-ie/company/news/press-releases/ai-orchestrated-factory-design-at-hannover-messe.html",
    "maturity": "产品/试验",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "P05",
    "lib": "新兴产品",
    "title": "ABB RobotStudio HyperReality",
    "date": "2026-03-09",
    "org": "ABB Robotics",
    "summary": "ABB计划通过 HyperReality 增强物理真实的机器人仿真和合成数据能力。",
    "signal": "机器人软件竞争点正在从离线编程迁移到 Physical AI 训练、验证和部署平台。",
    "maps": [
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Physical AI",
      "Digital Twin",
      "Synthetic Data"
    ],
    "url": "https://new.abb.com/news/detail/134030/prsrl-abb-robotics-partners-with-nvidia-to-deliver-industrial-grade-physical-ai-at-scale",
    "maturity": "即将发布",
    "impact": 4,
    "novelty": 5
  },
  {
    "id": "S01",
    "lib": "前沿方案",
    "title": "Agentic Software-defined Manufacturing — Schneider + Microsoft",
    "date": "2026-04-16",
    "org": "Schneider Electric / Microsoft",
    "summary": "专业 Agent 由 Orchestrator 协调，贯穿设计、工程、构建、调试和运营，并在部署前验证自动化逻辑。",
    "signal": "值得关注的 Agentic Manufacturing 架构是“Agent编排 + 工业上下文 + 仿真验证 + OT执行”。",
    "maps": [
      "工艺工程",
      "生产执行",
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Agentic AI",
      "Orchestration",
      "Simulation",
      "Software-defined Automation"
    ],
    "url": "https://www.se.com/ww/en/about-us/newsroom/news/press-releases/Schneider-Electric-unveils-next-generation-agentic-manufacturing-capabilities-powered-by-Microsoft-Azure-AI-at-Hannover-Messe-2026-69e08de2ddabef15890a48f3/",
    "maturity": "试验→采用",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "S02",
    "lib": "前沿方案",
    "title": "AI-orchestrated Factory Engineering — Rockwell",
    "date": "2026-04-20",
    "org": "Rockwell Automation",
    "summary": "自主 Agent、数字孪生和控制器工程形成从工厂设计到硬件部署前验证的闭环。",
    "signal": "工程流程是 Agent 的高价值切入点：输入明确、工具专业、可仿真验证、交付物清晰。",
    "maps": [
      "工艺工程",
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Agentic AI",
      "Digital Twin",
      "Closed-loop Validation"
    ],
    "url": "https://www.rockwellautomation.com/en-ie/company/news/press-releases/ai-orchestrated-factory-design-at-hannover-messe.html",
    "maturity": "试验→采用",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "S03",
    "lib": "前沿方案",
    "title": "Physical AI Robot Deployment — ABB + NVIDIA + Foxconn pilot",
    "date": "2026-03-09",
    "org": "ABB Robotics / NVIDIA",
    "summary": "仿真、合成数据、AI训练和真实机器人部署被连接成一条 Physical AI 工程链。",
    "signal": "Physical AI 从研究走向现场的核心模式已经变得可描述、可复用、可方案化。",
    "maps": [
      "工厂工程",
      "机器人/自动化"
    ],
    "caps": [
      "Physical AI",
      "Simulation",
      "Synthetic Data",
      "Robotics"
    ],
    "url": "https://new.abb.com/news/detail/134030/prsrl-abb-robotics-partners-with-nvidia-to-deliver-industrial-grade-physical-ai-at-scale",
    "maturity": "试点",
    "impact": 5,
    "novelty": 5
  },
  {
    "id": "S04",
    "lib": "前沿方案",
    "title": "AI-driven Adaptive Manufacturing Site — Siemens Erlangen blueprint",
    "date": "2026-01-06",
    "org": "Siemens / NVIDIA",
    "summary": "AI Brain持续分析数字孪生、虚拟测试改进并把验证后的洞察转为现场动作。",
    "signal": "这是最接近“感知—推理—仿真—决策—执行”闭环的头部厂商蓝图之一。",
    "maps": [
      "生产执行",
      "工厂工程",
      "供应链/物流"
    ],
    "caps": [
      "Industrial AI OS",
      "Agentic AI",
      "Digital Twin",
      "Closed-loop Optimization"
    ],
    "url": "https://nvidianews.nvidia.com/news/siemens-and-nvidia-expand-partnership-industrial-ai-operating-system",
    "maturity": "蓝图/试验",
    "impact": 5,
    "novelty": 5
  }
];
