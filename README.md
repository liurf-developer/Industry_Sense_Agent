# Manufacturing AI Weekly Report Framework

## 文件结构

- `index.html`：页面结构。通常无需每周修改。
- `styles.css`：页面视觉样式。需要调整布局/样式时修改。
- `app.js`：数据渲染、搜索、筛选、AI Map 统计与交互。通常无需每周修改。
- `data.js`：**每周主要维护文件**。新增新闻/报告、修改本期日期与主题即可。

## 每周更新流程

1. 修改 `data.js` 中的 `REPORT_META.date`、`issue`、`headline`。
2. 在 `INTELLIGENCE_DATA` 数组里新增本周新闻/报告。
3. 每条资料至少维护：
   - `lib`：行业趋势 / 技术趋势 / 新兴产品 / 前沿方案
   - `title`
   - `date`
   - `org`
   - `summary`：发生了什么
   - `signal`：一眼 Get 的核心分析
   - `maps`：对应 Manufacturing AI Map 的制造环节
   - `caps`：AI/工业能力标签
   - `url`
   - `maturity`
   - `impact`：1–5
   - `novelty`：1–5
4. 保存后刷新 `index.html`。
5. 页面会自动重算：
   - 情报总数
   - 平均影响评分
   - 高前沿度条目数
   - 产品/采用/规模化条目数
   - Manufacturing AI Map 覆盖热度
   - 各知识库数量
   - 所有筛选器选项

## 新增一条数据模板

```javascript
{
  id: "S05",
  lib: "前沿方案",
  title: "方案标题",
  date: "2026-08-20",
  org: "厂商 / 机构",
  summary: "一句话说明发生了什么。",
  signal: "一句话说明为什么值得解决方案架构师关注。",
  maps: ["生产执行", "质量"],
  caps: ["Industrial Agent", "Digital Twin"],
  url: "https://...",
  maturity: "试点",
  impact: 5,
  novelty: 4
}
```

## 推荐维护原则

每周尽量只新增真正会改变以下至少一项认知的信息：
- 行业采用阶段
- Manufacturing AI 技术栈
- 可选产品能力
- 可复用解决方案模式
- Manufacturing AI Map 的覆盖盲区
