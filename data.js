// =============================================================
// 每周更新主要修改这个文件。
// 1) 更新 REPORT_META.date / issue / headline
// 2) 在 INTELLIGENCE_DATA 中新增、修改或删除情报卡片
// 3) Manufacturing AI Map 覆盖热度、指标、筛选项会自动重新计算
// =============================================================

const REPORT_META = {
  date: "2026-08-21",
  issue: "2026-W34",
  headline: "Scale-up Economics × Smart Fab × Chemical Intelligence"
};

// 本期首页信号：每周只在数据层维护，页面会自动渲染。
const WEEKLY_SIGNALS = [
  { title: "AI 采用缺口开始被量化", insight: "制造业开始用长期 GDP 与产业能力缺口衡量延迟采用前沿技术的代价。" },
  { title: "Smart Fab 走向自主决策", insight: "AI 检测、工业物联网、机器人与自主决策正在汇入统一工厂运营体系。" },
  { title: "Physical AI 增加化学感知", insight: "边缘 AI 开始把泄漏、污染、工艺漂移等化学变化转化为机器可读信号。" },
  { title: "自治工厂与能源系统合流", insight: "生产、物流、质量、维护与能源管理开始被设计为一个持续优化的工业系统。" }
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
    "id": "I05",
    "issue": "2026-W34",
    "status": "新增",
    "lib": "行业趋势",
    "title": "印度制造业量化前沿技术采用缺口",
    "date": "2026-08-20",
    "publishedAt": "2026-08-20",
    "discoveredAt": "2026-08-21",
    "verifiedAt": "2026-08-21",
    "freshness": "本期新增",
    "org": "Angel One / ANI",
    "summary": "Angel One测算，若印度未释放先进制造潜力，2047年制造业GDP缺口可能达到5.1万亿美元。",
    "signal": "制造业AI的价值衡量正在从单项目ROI扩展到产业能力与长期经济增长缺口。",
    "maps": [
      "产品研发",
      "工艺工程",
      "生产执行",
      "供应链/物流",
      "机器人/自动化"
    ],
    "caps": [
      "Industrial AI",
      "Automation",
      "Robotics",
      "Advanced Manufacturing",
      "Semiconductor"
    ],
    "url": "http://www.indiagazette.com/news/279253627/india-may-lose-usd-270-bn-manufacturing-gdp-by-2035-usd-1-tn-by-2047-without-frontier-tech-report",
    "sourcePage": "https://economictimes.indiatimes.com/news/economy/indicators/india-may-lose-270-bn-manufacturing-gdp-by-2035-1-tn-by-2047-without-frontier-tech-report/articleshow/133368746.cms",
    "coreDocumentUrl": null,
    "evidenceStatus": "新闻正文已核验；Angel One核心报告待定位",
    "maturityCode": "concept",
    "maturity": "概念/趋势",
    "impact": 5,
    "novelty": 3,
    "swot": {
      "strength": "报告用2035年和2047年的经济缺口量化前沿技术采用价值，并明确点名AI、自动化、机器人和半导体等重点领域。",
      "weakness": "当前仅核验新闻正文，Angel One原始报告、测算模型及三组经济数字的口径关系仍待确认。",
      "opportunity": "可据此把制造AI方案的价值模型扩展到企业KPI、供应链自主性与关键产业能力建设。",
      "threat": "宏观长期预测不能直接替代企业项目ROI，若缺少行业和工厂基线，容易形成过度外推。"
    }
  },
  {
    "id": "I06",
    "issue": "2026-W34",
    "status": "新增",
    "lib": "行业趋势",
    "title": "ITAP 2026推动工业AI从试点走向商业部署",
    "date": "2026-08-18",
    "publishedAt": "2026-08-18",
    "discoveredAt": "2026-08-21",
    "verifiedAt": "2026-08-21",
    "freshness": "本期新增",
    "org": "Deutsche Messe / Singapore Manufacturing Federation",
    "summary": "ITAP 2026重启并聚焦工业AI、自动化、智能制造、先进机器人及从试点到商业部署的集成路径。",
    "signal": "亚太制造业的关注点正转向投资回报、系统集成与中小企业可执行的规模化采用路径。",
    "maps": [
      "工艺工程",
      "生产执行",
      "工厂工程",
      "现场作业",
      "机器人/自动化"
    ],
    "caps": [
      "Industrial AI",
      "Automation",
      "Smart Manufacturing",
      "Physical AI",
      "Humanoid Robotics",
      "Digitalisation"
    ],
    "url": "http://www.asiabulletin.com/news/279248848/deutsche-messe-and-singapore-manufacturing-federation-relaunch-itap-2026",
    "sourcePage": "https://industrial-transformation.com/",
    "coreDocumentUrl": null,
    "evidenceStatus": "活动新闻稿已核验；落地案例与KPI待活动后验证",
    "maturityCode": "concept",
    "maturity": "概念/趋势",
    "impact": 4,
    "novelty": 3,
    "swot": {
      "strength": "活动将工业AI、自动化、智能制造和Physical AI置于同一落地议程，并明确关注从试点到商业部署。",
      "weakness": "当前证据属于活动重启和议程发布，尚未提供制造项目交付结果或量化KPI。",
      "opportunity": "可将ITAP作为亚太制造需求、供应商方案和中小企业采用路径的持续观察窗口。",
      "threat": "活动主题热度未必转化为实际投资，需在会后核对采购动作、合作项目和量产案例。"
    }
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
    "id": "T05",
    "issue": "2026-W34",
    "status": "新增",
    "lib": "技术趋势",
    "title": "SEMICON Taiwan强化AI驱动Smart Fab",
    "date": "2026-08-19",
    "publishedAt": "2026-08-19",
    "discoveredAt": "2026-08-21",
    "verifiedAt": "2026-08-21",
    "freshness": "本期新增",
    "org": "SEMI / SEMICON Taiwan",
    "summary": "SEMICON Taiwan 2026首次设置Smart Fab Zone，重点展示AI检测、工业物联网、机器人与自主决策。",
    "signal": "半导体制造正把AI从单点质量检测扩展到设备、工艺、质量和自主决策协同的工厂运营体系。",
    "maps": [
      "工艺工程",
      "生产执行",
      "质量",
      "设备维护",
      "机器人/自动化"
    ],
    "caps": [
      "Smart Fab",
      "AI Inspection",
      "Industrial IoT",
      "Robotics",
      "Autonomous Decision-making",
      "Advanced Packaging"
    ],
    "url": "https://en.prnasia.com/releases/apac/semicon-taiwan-2026-highlights-ai-driven-manufacturing-transformation-544452.shtml",
    "sourcePage": "https://www.semicontaiwan.org/en/Smart_Fab_Zone",
    "coreDocumentUrl": null,
    "evidenceStatus": "SEMI新闻稿与官方专区已核验",
    "maturityCode": "concept",
    "maturity": "概念/趋势",
    "impact": 5,
    "novelty": 4,
    "swot": {
      "strength": "新闻明确列出AI检测、工业物联网、机器人和自主决策能力，Smart Manufacturing Pavilion规模同比增长20%。",
      "weakness": "公开材料以展会主题和市场预测为主，尚未给出具体晶圆厂的运行KPI与参考架构。",
      "opportunity": "可围绕设备、工艺、质量和维护数据构建跨域Smart Fab方案，并跟踪先进封装带来的新制造场景。",
      "threat": "多厂商设备与OT系统的互操作、安全和数据语义差异可能限制自主决策能力的复制。"
    }
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
    "id": "P06",
    "issue": "2026-W34",
    "status": "新增",
    "lib": "新兴产品",
    "title": "Ainos第二代AI Nose增加Physical AI化学感知",
    "date": "2026-08-17",
    "publishedAt": "2026-08-17",
    "discoveredAt": "2026-08-21",
    "verifiedAt": "2026-08-21",
    "freshness": "本期新增",
    "org": "Ainos",
    "summary": "第二代AI Nose升级Edge AI、气流、泵、模块化维护、云端管理与OTA能力，面向工业环境24×7运行。",
    "signal": "Physical AI的感知层正从视觉和声音扩展到化学信号，为工艺漂移、泄漏和材料劣化提供早期异常入口。",
    "maps": [
      "生产执行",
      "质量",
      "设备维护",
      "现场作业"
    ],
    "caps": [
      "Chemical Intelligence",
      "Edge AI",
      "Physical AI",
      "Industrial Sensing",
      "Fleet Management",
      "OTA"
    ],
    "url": "https://www.accessnewswire.com/newsroom/en/computers-technology-and-internet/ainos-unveils-next-generation-ai-nose-advancing-the-infrastructur-1205419",
    "sourcePage": "https://www.ainos.com/news/",
    "coreDocumentUrl": null,
    "evidenceStatus": "厂商新闻稿已核验；性能指标与交付状态待验证",
    "maturityCode": "announced",
    "maturity": "已发布",
    "impact": 4,
    "novelty": 5,
    "swot": {
      "strength": "产品把Edge AI、OTA、模块化维护和云端设备管理组合为面向连续工业部署的完整节点能力。",
      "weakness": "8.78亿条气味数据为厂商自报，尚无第三方准确率、误报率、漂移和长期可靠性验证。",
      "opportunity": "可在半导体制造、工业安全、设备维护和质量监测中补足视觉与传统阈值传感器的感知盲区。",
      "threat": "现场气体交叉干扰、传感器漂移、维护周期和OT告警集成可能影响规模化使用。"
    }
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
  },
  {
    "id": "S05",
    "issue": "2026-W34",
    "status": "新增",
    "lib": "前沿方案",
    "title": "Statetron发布自治能源一体化工厂架构",
    "date": "2026-08-19",
    "publishedAt": "2026-08-19",
    "discoveredAt": "2026-08-21",
    "verifiedAt": "2026-08-21",
    "freshness": "本期新增",
    "org": "Statetron",
    "summary": "Andromean Class把AI生产、机器人装配、自主物流、数字孪生、自动质量和能源管理整合为统一工业架构。",
    "signal": "工厂正在被设计为生产系统与能源系统共同优化的自治基础设施，但当前仍属于待验证蓝图。",
    "maps": [
      "工厂工程",
      "生产执行",
      "质量",
      "设备维护",
      "供应链/物流",
      "机器人/自动化"
    ],
    "caps": [
      "AI-driven Production",
      "Robotic Assembly",
      "Autonomous Logistics",
      "Digital Twin",
      "Automated Quality",
      "Energy Management"
    ],
    "url": "https://www.prnewswire.com/news-releases/statetron-introduces-andromean-class-302855096.html",
    "sourcePage": "https://www.statetron.com/",
    "coreDocumentUrl": null,
    "evidenceStatus": "原始新闻稿已核验；项目建设与投产证据待确认",
    "maturityCode": "concept",
    "maturity": "概念/趋势",
    "impact": 4,
    "novelty": 5,
    "swot": {
      "strength": "方案把生产、机器人、物流、质量、维护和能源管理统一到一个工厂级架构中。",
      "weakness": "首个卡塔尔设施仍以proposed和concept描述，缺少投资、工期、合作方及投产证据。",
      "opportunity": "可为储能、半导体等高能耗工厂提供数字孪生、自治运营与能源协同的方案蓝图。",
      "threat": "高资本投入、跨OT与能源系统集成、监管许可和项目进度可能削弱蓝图的可实现性。"
    }
  }
];
