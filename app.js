(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  let activeLib = "全部";

  function maturityCode(item) { return item.maturityCode || MATURITY_LEGACY_MAP[item.maturity] || ""; }
  function maturityLabel(item) { return MATURITY_LABELS[maturityCode(item)] || item.maturity || "未定义"; }

  function validateData() {
    const errors = [];
    const ids = new Set();
    if (!Array.isArray(INTELLIGENCE_DATA)) return ["INTELLIGENCE_DATA 必须是数组"];
    INTELLIGENCE_DATA.forEach((x, i) => {
      const ref = x.id || `第 ${i + 1} 条`;
      if (!x.id || ids.has(x.id)) errors.push(`${ref}: ID 缺失或重复`); else ids.add(x.id);
      if (!LIBRARIES.includes(x.lib) || x.lib === "全部") errors.push(`${ref}: 非法知识库 ${x.lib}`);
      (x.maps || []).filter(s => !MANUFACTURING_STAGES.includes(s)).forEach(s => errors.push(`${ref}: 非法制造环节 ${s}`));
      if (![x.impact, x.novelty].every(v => Number(v) >= 1 && Number(v) <= 5)) errors.push(`${ref}: impact/novelty 必须为 1–5`);
      ["title","summary","signal","url"].forEach(k => { if (!String(x[k] || "").trim()) errors.push(`${ref}: ${k} 不能为空`); });
      try { new URL(x.url); } catch (_) { errors.push(`${ref}: URL 格式错误`); }
      if (!maturityCode(x)) errors.push(`${ref}: 成熟度未映射 ${x.maturity}`);
      if (x.issue && !/^\d{4}-W\d{2}$/.test(x.issue)) errors.push(`${ref}: issue 格式错误 ${x.issue}`);
      ["publishedAt","discoveredAt","verifiedAt"].forEach(k => {
        if (x[k] && !/^\d{4}-\d{2}-\d{2}$/.test(x[k])) errors.push(`${ref}: ${k} 日期格式错误`);
      });
      if (x.publishedAt && x.date !== x.publishedAt) errors.push(`${ref}: date 与 publishedAt 不一致`);
      if (x.swot) ["strength","weakness","opportunity","threat"].forEach(k => {
        if (!String(x.swot[k] || "").trim()) errors.push(`${ref}: swot.${k} 不能为空`);
      });
    });
    errors.forEach(e => console.error(`[Data validation] ${e}`));
    return errors;
  }

  function computeHeat() {
    const counts = Object.fromEntries(MANUFACTURING_STAGES.map(s => [s, 0]));
    INTELLIGENCE_DATA.forEach(x => (x.maps || []).forEach(s => { if (s in counts) counts[s] += 1; }));
    const max = Math.max(1, ...Object.values(counts));
    return MANUFACTURING_STAGES.map(stage => ({stage, count:counts[stage], pct:Math.round(counts[stage] / max * 100)}));
  }

  function renderMeta() {
    const total = INTELLIGENCE_DATA.length;
    const avg = total ? (INTELLIGENCE_DATA.reduce((n,x) => n + Number(x.impact || 0), 0) / total).toFixed(1) : "0.0";
    const matureCodes = new Set(["product","production","scale"]);
    $("#metricTotal").textContent = total;
    $("#metricImpact").textContent = `${avg}/5`;
    $("#metricFrontier").textContent = INTELLIGENCE_DATA.filter(x => Number(x.novelty) >= 5).length;
    $("#metricMature").textContent = INTELLIGENCE_DATA.filter(x => matureCodes.has(maturityCode(x))).length;
    $("#reportDate").textContent = REPORT_META.date;
    $("#reportIssue").textContent = REPORT_META.issue;
    $("#heroHeadline").textContent = `本期主线 / ${REPORT_META.headline}`;
    document.title = `Manufacturing AI Radar｜${REPORT_META.issue}`;
  }

  function heatClass(x){return x.count===0?"zero":x.pct>=75?"hot":x.pct>=40?"mid":"low";}
  function renderMap() {
    const heat = computeHeat();
    $("#mapGrid").innerHTML = heat.map(x => `<button class="map-cell ${heatClass(x)}" data-stage="${esc(x.stage)}"><strong>${esc(x.stage)}</strong><div class="v">${x.count}</div><div class="hint">相关情报</div></button>`).join("");
    $("#bars").innerHTML = heat.map(x => `<div class="bar-row"><span>${esc(x.stage)}</span><div class="bar-track"><div class="bar-fill" style="width:${x.pct}%"></div></div><span class="bar-num">${x.count}</span></div>`).join("");
    $$(".map-cell").forEach(el => el.addEventListener("click", () => { $("#stage").value=el.dataset.stage; location.hash="intelligence"; renderCards(); }));
  }

  function renderSignals(){ $("#signals").innerHTML = WEEKLY_SIGNALS.map((x,i) => `<div class="signal-item"><div class="signal-index">${String(i+1).padStart(2,"0")}</div><div><b>${esc(x.title)}</b><span>${esc(x.insight)}</span></div></div>`).join(""); }
  function unique(a){return [...new Set(a.filter(Boolean))].sort((a,b)=>a.localeCompare(b,"zh-CN"));}
  function fillFilters(){
    unique(INTELLIGENCE_DATA.flatMap(x=>x.maps||[])).forEach(v => $("#stage").insertAdjacentHTML("beforeend",`<option>${esc(v)}</option>`));
    unique(INTELLIGENCE_DATA.map(x=>x.org)).forEach(v => $("#org").insertAdjacentHTML("beforeend",`<option>${esc(v)}</option>`));
    Object.entries(MATURITY_LABELS).forEach(([code,label]) => $("#maturity").insertAdjacentHTML("beforeend",`<option value="${esc(code)}">${esc(label)}</option>`));
  }
  function renderTabs(){
    $("#tabs").innerHTML=LIBRARIES.map(lib=>`<button class="tab ${activeLib===lib?"active":""}" data-lib="${esc(lib)}">${esc(lib)} <span class="count-badge">${lib==="全部"?INTELLIGENCE_DATA.length:INTELLIGENCE_DATA.filter(x=>x.lib===lib).length}</span></button>`).join("");
    $$(".tab").forEach(btn=>btn.addEventListener("click",()=>{activeLib=btn.dataset.lib;renderTabs();renderCards();}));
  }
  function swotFor(x) {
    if (x.swot) return x.swot;
    const early = ["research","concept","announced","pilot"].includes(maturityCode(x));
    return {
      strength: x.signal,
      weakness: early
        ? `当前处于“${maturityLabel(x)}”阶段，规模复用、稳定性和量化收益仍需在真实制造环境验证。`
        : `现有公开信息侧重成果呈现，实施成本、数据治理和跨工厂复制条件仍需进一步核对。`,
      opportunity: `可优先在${(x.maps || []).join("、") || "相关制造环节"}评估落地，并复用 ${(x.caps || []).slice(0,3).join("、") || "现有工业能力"} 形成方案组合。`,
      threat: `信息主要来自 ${x.org} 的公开材料，需防范叙事偏差、系统集成复杂度及 OT 安全约束对价值兑现的影响。`
    };
  }

  function cardHtml(x){return `<article class="card" data-id="${esc(x.id)}" data-impact="${esc(x.impact)}" tabindex="0" role="button" aria-label="打开 ${esc(x.title)} SWOT 详情"><div class="impact-stripe" title="影响程度 ${esc(x.impact)}/5" aria-hidden="true"></div><div class="card-top"><span class="lib-pill">${esc(x.lib)}</span><span>${esc(x.date)} · ${esc(x.org)}</span></div><h3>${esc(x.title)}</h3><div class="card-brief"><span>发生了什么</span><p class="core">${esc(x.summary)}</p></div><div class="card-brief card-judgement"><span>核心判断</span><p>${esc(x.signal)}</p></div><div class="card-foot"><span>点击展开 SWOT</span><span class="detail-link">查看解读 →</span></div></article>`;}

  function openDetail(id) {
    const x = INTELLIGENCE_DATA.find(item => item.id === id);
    if (!x) return;
    const swot = swotFor(x);
    $("#detailDialog").dataset.impact = x.impact;
    $("#detailLibrary").textContent = `${x.lib} / ${x.id}`;
    $("#detailTitle").textContent = x.title;
    $("#detailImpact").innerHTML = `<span>Impact signal</span><b>${x.impact}/5</b>`;
    $("#detailBody").innerHTML = `
      <section class="swot"><div class="swot-head"><div><span class="detail-label">知识解读 / 主体</span><h3>SWOT 分析</h3></div><p>基于情报内容、成熟度、制造环节与来源可信边界形成的架构师判断。</p></div><div class="swot-grid"><article class="swot-s"><b>S / 优势</b><p>${esc(swot.strength)}</p></article><article class="swot-w"><b>W / 局限</b><p>${esc(swot.weakness)}</p></article><article class="swot-o"><b>O / 机会</b><p>${esc(swot.opportunity)}</p></article><article class="swot-t"><b>T / 风险</b><p>${esc(swot.threat)}</p></article></div></section>
      <aside class="detail-context"><section class="metadata"><span class="detail-label">知识元数据</span><dl><div><dt>发布日期</dt><dd>${esc(x.date)}</dd></div><div><dt>来源机构</dt><dd>${esc(x.org)}</dd></div><div><dt>知识库</dt><dd>${esc(x.lib)}</dd></div><div><dt>成熟度</dt><dd>${esc(maturityLabel(x))}</dd></div><div><dt>前沿度</dt><dd>${esc(x.novelty)}/5</dd></div></dl><a href="${esc(x.url)}" target="_blank" rel="noopener">核对原始来源 ↗</a></section><section class="detail-map"><span class="detail-label">Manufacturing AI Map</span><div class="tags">${(x.maps||[]).map(t=>`<span class="tag map">${esc(t)}</span>`).join("")}</div><span class="detail-label capability-label">Capability</span><div class="tags capability-tags">${(x.caps||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div></section></aside>`;
    $("#detailDialog").showModal();
  }

  function bindCardEvents() {
    $$(".card").forEach(card => {
      card.addEventListener("click", () => openDetail(card.dataset.id));
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetail(card.dataset.id); } });
    });
  }

  function syncUrl(){
    const p=new URLSearchParams(); const values={q:$("#q").value,stage:$("#stage").value,org:$("#org").value,maturity:$("#maturity").value,sort:$("#sort").value,library:activeLib};
    Object.entries(values).forEach(([k,v])=>{if(v && !(["sort","library"].includes(k)&&["date","全部"].includes(v)))p.set(k,v);});
    history.replaceState(null,"",`${location.pathname}${p.size?`?${p}`:""}${location.hash}`);
  }
  function renderCards(){
    const q=$("#q").value.trim().toLowerCase(),stage=$("#stage").value,org=$("#org").value,maturity=$("#maturity").value,sort=$("#sort").value;
    const filtered=INTELLIGENCE_DATA.filter(x=>{const text=[x.title,x.org,x.summary,x.signal,...(x.maps||[]),...(x.caps||[])].join(" ").toLowerCase();return(activeLib==="全部"||x.lib===activeLib)&&(!q||text.includes(q))&&(!stage||(x.maps||[]).includes(stage))&&(!org||x.org===org)&&(!maturity||maturityCode(x)===maturity);}).sort((a,b)=>sort==="impact"?b.impact-a.impact||b.date.localeCompare(a.date):sort==="novelty"?b.novelty-a.novelty||b.date.localeCompare(a.date):b.date.localeCompare(a.date));
    $("#cards").innerHTML=filtered.map(cardHtml).join(""); bindCardEvents(); $("#empty").style.display=filtered.length?"none":"block"; $("#resultCount").textContent=`显示 ${filtered.length} / ${INTELLIGENCE_DATA.length} 条`; syncUrl();
  }
  function reset(){activeLib="全部";["q","stage","org","maturity"].forEach(id=>$("#"+id).value="");$("#sort").value="date";renderTabs();renderCards();}
  function restore(){const p=new URLSearchParams(location.search);["q","stage","org","maturity","sort"].forEach(id=>{if(p.has(id)&&$("#"+id))$("#"+id).value=p.get(id);});if(LIBRARIES.includes(p.get("library")))activeLib=p.get("library");}
  function bind(){["q","stage","org","maturity","sort"].forEach(id=>$("#"+id).addEventListener(id==="q"?"input":"change",renderCards));$("#resetFilters").addEventListener("click",reset);$("[data-reset]").addEventListener("click",reset);$("#detailClose").addEventListener("click",()=>$("#detailDialog").close());$("#detailDialog").addEventListener("click",e=>{if(e.target===$("#detailDialog"))$("#detailDialog").close();});}
  function init(){
    try{const errors=validateData();if(errors.length)$("#fatal").style.display="block";renderMeta();renderMap();renderSignals();fillFilters();restore();renderTabs();renderCards();bind();}
    catch(error){console.error("[App init]",error);$("#fatal").style.display="block";}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
