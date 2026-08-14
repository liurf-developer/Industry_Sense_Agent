(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));

  let activeLib = "全部";

  function computeHeat() {
    const counts = Object.fromEntries(MANUFACTURING_STAGES.map((s) => [s, 0]));
    INTELLIGENCE_DATA.forEach((item) => {
      (item.maps || []).forEach((stage) => {
        if (stage in counts) counts[stage] += 1;
      });
    });
    const max = Math.max(1, ...Object.values(counts));
    return MANUFACTURING_STAGES.map((stage) => ({
      stage,
      count: counts[stage],
      pct: Math.round((counts[stage] / max) * 100)
    }));
  }

  function renderMeta() {
    const total = INTELLIGENCE_DATA.length;
    const avgImpact = total
      ? (INTELLIGENCE_DATA.reduce((s, x) => s + Number(x.impact || 0), 0) / total).toFixed(1)
      : "0.0";
    const frontier = INTELLIGENCE_DATA.filter((x) => Number(x.novelty || 0) >= 5).length;
    const mature = INTELLIGENCE_DATA.filter((x) =>
      /产品|采用|规模化/.test(String(x.maturity || ""))
    ).length;

    $("#metricTotal").textContent = total;
    $("#metricImpact").textContent = `${avgImpact}/5`;
    $("#metricFrontier").textContent = frontier;
    $("#metricMature").textContent = mature;
    $("#cardCount").textContent = total;
    $("#reportDate").textContent = REPORT_META.date;

    document.title = `智能制造 AI 情报报告｜${REPORT_META.date}`;
    const heroNote = document.querySelector(".hero-note");
    if (heroNote && REPORT_META.headline) {
      heroNote.textContent = `本期观察主线：${REPORT_META.headline}`;
    }
  }

  function renderBars() {
    const heat = computeHeat();
    $("#bars").innerHTML = heat.map((x) => `
      <div class="bar-row">
        <span>${esc(x.stage)}</span>
        <div class="bar-track">
          <div class="bar-fill ${x.count === 0 ? "zero" : x.count <= 2 ? "low" : ""}"
               style="width:${x.pct}%"></div>
        </div>
        <span class="bar-num">${x.count}</span>
      </div>
    `).join("");
  }

  function heatClass(x) {
    if (x.count === 0) return "zero";
    if (x.pct >= 75) return "hot";
    if (x.pct >= 40) return "mid";
    return "low";
  }

  function renderMap() {
    const heat = computeHeat();
    $("#mapGrid").innerHTML = heat.map((x) => `
      <button class="map-cell ${heatClass(x)}" data-stage="${esc(x.stage)}"
              style="text-align:left;cursor:pointer">
        <strong>${esc(x.stage)}</strong>
        <div class="v">${x.count}</div>
        <div class="hint">相关情报条目</div>
      </button>
    `).join("");

    $$(".map-cell").forEach((el) => {
      el.addEventListener("click", () => {
        $("#stage").value = el.dataset.stage;
        location.hash = "intelligence";
        renderCards();
      });
    });
  }

  function unique(arr) {
    return [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  function fillFilters() {
    const stage = $("#stage");
    const org = $("#org");
    const maturity = $("#maturity");

    stage.innerHTML = '<option value="">全部制造环节</option>';
    org.innerHTML = '<option value="">全部机构</option>';
    maturity.innerHTML = '<option value="">全部成熟度</option>';

    unique(INTELLIGENCE_DATA.flatMap((x) => x.maps || []))
      .forEach((v) => stage.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));

    unique(INTELLIGENCE_DATA.map((x) => x.org))
      .forEach((v) => org.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));

    unique(INTELLIGENCE_DATA.map((x) => x.maturity))
      .forEach((v) => maturity.insertAdjacentHTML("beforeend", `<option>${esc(v)}</option>`));
  }

  function renderTabs() {
    $("#tabs").innerHTML = LIBRARIES.map((lib) => {
      const n = lib === "全部"
        ? INTELLIGENCE_DATA.length
        : INTELLIGENCE_DATA.filter((x) => x.lib === lib).length;
      return `<button class="tab ${activeLib === lib ? "active" : ""}" data-lib="${esc(lib)}">
        ${esc(lib)} <span class="count-badge">${n}</span>
      </button>`;
    }).join("");

    $$(".tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeLib = btn.dataset.lib;
        renderTabs();
        renderCards();
      });
    });
  }

  function cardHtml(x) {
    return `
      <article class="card">
        <div class="card-top">
          <span class="lib-pill">${esc(x.lib)}</span>
          <span>${esc(x.date)} · ${esc(x.org)}</span>
        </div>
        <h3>${esc(x.title)}</h3>
        <div class="core">${esc(x.summary)}</div>
        <div class="analysis"><b>一眼 Get：</b>${esc(x.signal)}</div>

        <div class="map-rel">
          <div class="map-label">AI MAP RELATION</div>
          <div class="tags">
            ${(x.maps || []).map((t) => `<span class="tag map">${esc(t)}</span>`).join("")}
          </div>
          <div class="tags" style="margin-top:6px">
            ${(x.caps || []).slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
          </div>
        </div>

        <div class="card-foot">
          <span>成熟度：${esc(x.maturity)} · 影响 ${esc(x.impact)}/5</span>
          <a href="${esc(x.url)}" target="_blank" rel="noopener">原始来源 ↗</a>
        </div>
      </article>
    `;
  }

  function renderCards() {
    const q = $("#q").value.trim().toLowerCase();
    const stage = $("#stage").value;
    const org = $("#org").value;
    const maturity = $("#maturity").value;

    const filtered = INTELLIGENCE_DATA.filter((x) => {
      const text = [
        x.title, x.org, x.summary, x.signal,
        ...(x.maps || []), ...(x.caps || [])
      ].join(" ").toLowerCase();

      return (activeLib === "全部" || x.lib === activeLib) &&
        (!q || text.includes(q)) &&
        (!stage || (x.maps || []).includes(stage)) &&
        (!org || x.org === org) &&
        (!maturity || x.maturity === maturity);
    });

    $("#cards").innerHTML = filtered.map(cardHtml).join("");
    $("#empty").style.display = filtered.length ? "none" : "block";
  }

  function bindEvents() {
    $("#q").addEventListener("input", renderCards);
    $("#stage").addEventListener("change", renderCards);
    $("#org").addEventListener("change", renderCards);
    $("#maturity").addEventListener("change", renderCards);
  }

  function init() {
    renderMeta();
    renderBars();
    renderMap();
    fillFilters();
    renderTabs();
    renderCards();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
