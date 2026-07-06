const demoCampaigns = [
  {
    date: "2026-06-24",
    platform: "Google Ads",
    campaignName: "Emergency Dentist Search",
    spend: 1450,
    impressions: 38200,
    clicks: 1910,
    leads: 128,
    bookedCalls: 52,
    sales: 24,
    revenue: 11800
  },
  {
    date: "2026-06-24",
    platform: "Google Ads",
    campaignName: "Teeth Whitening Search",
    spend: 980,
    impressions: 29600,
    clicks: 1184,
    leads: 74,
    bookedCalls: 21,
    sales: 9,
    revenue: 4050
  },
  {
    date: "2026-06-25",
    platform: "Meta Ads",
    campaignName: "Dental Cleaning Offer",
    spend: 760,
    impressions: 64200,
    clicks: 1733,
    leads: 112,
    bookedCalls: 28,
    sales: 8,
    revenue: 2400
  },
  {
    date: "2026-06-25",
    platform: "Meta Ads",
    campaignName: "Family Dentist Awareness",
    spend: 890,
    impressions: 89000,
    clicks: 1424,
    leads: 38,
    bookedCalls: 7,
    sales: 0,
    revenue: 0
  },
  {
    date: "2026-06-26",
    platform: "Google Ads",
    campaignName: "Dentist Near Me",
    spend: 1320,
    impressions: 41200,
    clicks: 2060,
    leads: 116,
    bookedCalls: 44,
    sales: 18,
    revenue: 8650
  },
  {
    date: "2026-06-26",
    platform: "Meta Ads",
    campaignName: "Whitening Discount Retargeting",
    spend: 430,
    impressions: 22600,
    clicks: 802,
    leads: 68,
    bookedCalls: 19,
    sales: 11,
    revenue: 4620
  },
  {
    date: "2026-06-27",
    platform: "Google Ads",
    campaignName: "Braces Consultation",
    spend: 1180,
    impressions: 34400,
    clicks: 1032,
    leads: 46,
    bookedCalls: 17,
    sales: 5,
    revenue: 5250
  },
  {
    date: "2026-06-27",
    platform: "Meta Ads",
    campaignName: "Smile Makeover Creative Test",
    spend: 640,
    impressions: 51800,
    clicks: 1191,
    leads: 24,
    bookedCalls: 5,
    sales: 1,
    revenue: 900
  }
];

let campaigns = [];

const EMPTY_ANALYSIS_MESSAGE = "Load demo data or add campaigns to generate analysis.";

const form = document.querySelector("#campaignForm");
const tableBody = document.querySelector("#campaignTableBody");
const kpiGrid = document.querySelector("#kpiGrid");
const highlightGrid = document.querySelector("#highlightGrid");
const platformGrid = document.querySelector("#platformGrid");
const roasAnalyzer = document.querySelector("#roasAnalyzer");
const funnelSummary = document.querySelector("#funnelSummary");
const cplCpaAnalyzer = document.querySelector("#cplCpaAnalyzer");
const wasteList = document.querySelector("#wasteList");
const recommendationGrid = document.querySelector("#recommendationGrid");
const optimizationPlan = document.querySelector("#optimizationPlan");
const summaryNote = document.querySelector("#summaryNote");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormat = new Intl.NumberFormat("en-US");

function safeDivide(value, divisor) {
  return divisor > 0 ? value / divisor : 0;
}

function formatMoney(value) {
  return money.format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value) {
  return numberFormat.format(Math.round(Number.isFinite(value) ? value : 0));
}

function formatPercent(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(2)}%`;
}

function formatRatio(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(2)}x`;
}

function getMetrics(campaign) {
  const ctr = safeDivide(campaign.clicks, campaign.impressions) * 100;
  const cpc = safeDivide(campaign.spend, campaign.clicks);
  const cpl = safeDivide(campaign.spend, campaign.leads);
  const costPerBookedCall = safeDivide(campaign.spend, campaign.bookedCalls);
  const cpa = safeDivide(campaign.spend, campaign.sales);
  const leadConversionRate = safeDivide(campaign.leads, campaign.clicks) * 100;
  const salesConversionRate = safeDivide(campaign.sales, campaign.leads) * 100;
  const bookedCallRate = safeDivide(campaign.bookedCalls, campaign.leads) * 100;
  const roas = safeDivide(campaign.revenue, campaign.spend);
  const profit = campaign.revenue - campaign.spend;
  const wastedSpend = getWastedSpendIssues(campaign, {
    ctr,
    cpc,
    cpl,
    costPerBookedCall,
    cpa,
    leadConversionRate,
    salesConversionRate,
    bookedCallRate,
    roas,
    profit
  });

  return {
    ctr,
    cpc,
    cpl,
    costPerBookedCall,
    cpa,
    leadConversionRate,
    salesConversionRate,
    bookedCallRate,
    roas,
    profit,
    wastedSpend
  };
}

function getWastedSpendIssues(campaign, metrics) {
  const issues = [];
  const highSpendThreshold = 750;
  const lowLeadThreshold = 40;
  const highCplThreshold = 40;
  const highCpaThreshold = 180;

  if (campaign.spend > 0 && campaign.sales === 0) {
    issues.push({
      issue: "Spend but zero sales",
      why: "Budget is being consumed without producing revenue.",
      action: "Pause or reduce budget until targeting, offer, and follow-up are reviewed.",
      priority: "High"
    });
  }

  if (campaign.spend > 0 && metrics.roas < 1.5) {
    issues.push({
      issue: "Low ROAS",
      why: "Revenue is not high enough to justify current spend.",
      action: "Lower bids or budget, then test stronger intent, offer, or creative angles.",
      priority: "High"
    });
  }

  if (campaign.spend >= highSpendThreshold && campaign.leads < lowLeadThreshold) {
    issues.push({
      issue: "High spend with low leads",
      why: "The campaign is using meaningful budget without generating enough lead volume.",
      action: "Review targeting, search intent, creative promise, and landing page message match.",
      priority: "Medium"
    });
  }

  if (campaign.leads > 0 && metrics.cpl > highCplThreshold) {
    issues.push({
      issue: "High CPL",
      why: "Lead acquisition cost is above the working benchmark for this demo account.",
      action: "Improve audience quality, landing page relevance, and conversion friction.",
      priority: "Medium"
    });
  }

  if (campaign.sales > 0 && metrics.cpa > highCpaThreshold) {
    issues.push({
      issue: "High CPA",
      why: "Each sale is costing too much compared with healthier campaigns.",
      action: "Shift budget to lower CPA campaigns and review conversion path quality.",
      priority: "Medium"
    });
  }

  if (campaign.clicks >= 700 && metrics.leadConversionRate < 3) {
    issues.push({
      issue: "Many clicks but few leads",
      why: "Traffic is not converting into inquiries at a healthy rate.",
      action: "Improve the landing page, call to action, offer, and page-load experience.",
      priority: "Medium"
    });
  }

  if (campaign.leads > 0 && campaign.sales === 0) {
    issues.push({
      issue: "Leads but no sales",
      why: "Lead quality or sales follow-up may be breaking after conversion.",
      action: "Review lead source quality, speed to lead, booking process, and sales scripts.",
      priority: "High"
    });
  }

  return issues;
}

function getStatus(campaign, metrics) {
  if (campaign.spend > 0 && campaign.sales === 0) {
    return "Wasting budget";
  }

  if (campaign.spend > 0 && metrics.roas < 1.5) {
    return "Wasting budget";
  }

  if (metrics.roas >= 3 && campaign.sales > 0) {
    return "Strong";
  }

  if (metrics.roas >= 1.5 && metrics.roas < 3) {
    return "Needs optimization";
  }

  if (campaign.leads > 0) {
    return "Watch closely";
  }

  return "Wasting budget";
}

function getStatusClass(status) {
  return {
    Strong: "strong",
    "Needs optimization": "needs",
    "Wasting budget": "wasting",
    "Watch closely": "watch"
  }[status] || "watch";
}

function enrichCampaigns() {
  return campaigns.map((campaign) => {
    const metrics = getMetrics(campaign);
    return {
      ...campaign,
      metrics,
      status: getStatus(campaign, metrics)
    };
  });
}

function getTotals(rows) {
  const totals = rows.reduce((acc, row) => {
    acc.spend += row.spend;
    acc.revenue += row.revenue;
    acc.impressions += row.impressions;
    acc.clicks += row.clicks;
    acc.leads += row.leads;
    acc.bookedCalls += row.bookedCalls;
    acc.sales += row.sales;
    return acc;
  }, {
    spend: 0,
    revenue: 0,
    impressions: 0,
    clicks: 0,
    leads: 0,
    bookedCalls: 0,
    sales: 0
  });

  totals.profit = totals.revenue - totals.spend;
  totals.roas = safeDivide(totals.revenue, totals.spend);
  totals.averageCpl = safeDivide(totals.spend, totals.leads);
  totals.averageCpa = safeDivide(totals.spend, totals.sales);
  totals.ctr = safeDivide(totals.clicks, totals.impressions) * 100;
  totals.leadConversionRate = safeDivide(totals.leads, totals.clicks) * 100;
  totals.bookedCallRate = safeDivide(totals.bookedCalls, totals.leads) * 100;
  totals.salesConversionRate = safeDivide(totals.sales, totals.leads) * 100;
  totals.bookedCallToSaleRate = safeDivide(totals.sales, totals.bookedCalls) * 100;
  totals.revenuePerSale = safeDivide(totals.revenue, totals.sales);

  return totals;
}

function getBudgetEfficiencyScore(rows, totals) {
  if (!rows.length || totals.spend === 0) {
    return 0;
  }

  const strongCount = rows.filter((row) => row.status === "Strong").length;
  const wastingSpend = rows
    .filter((row) => row.status === "Wasting budget")
    .reduce((sum, row) => sum + row.spend, 0);
  const strongShare = strongCount / rows.length;
  const wastedSpendShare = safeDivide(wastingSpend, totals.spend);
  const roasScore = Math.min(totals.roas / 3, 1) * 45;
  const profitScore = totals.profit > 0 ? 20 : 0;
  const strongScore = strongShare * 20;
  const wasteScore = Math.max(0, 15 - wastedSpendShare * 30);

  return Math.round(Math.max(0, Math.min(100, roasScore + profitScore + strongScore + wasteScore)));
}

function getPriorityClass(priority) {
  return priority.toLowerCase();
}

function createEmptyState(message) {
  return `<div class="empty-state">${message}</div>`;
}

function renderKpis(rows, totals) {
  const kpis = [
    { label: "Total Spend", value: formatMoney(totals.spend), caption: "Manual campaign budget entered.", icon: "$" },
    { label: "Total Revenue", value: formatMoney(totals.revenue), caption: "Fictional revenue attributed to campaigns.", icon: "R" },
    { label: "Overall ROAS", value: formatRatio(totals.roas), caption: "Revenue divided by ad spend.", icon: "x" },
    { label: "Total Leads", value: formatNumber(totals.leads), caption: "Lead volume from all rows.", icon: "L" },
    { label: "Total Sales", value: formatNumber(totals.sales), caption: "Closed sales entered manually.", icon: "S" },
    { label: "Average CPL", value: formatMoney(totals.averageCpl), caption: "Spend divided by leads.", icon: "C" },
    { label: "Average CPA", value: formatMoney(totals.averageCpa), caption: "Spend divided by sales.", icon: "A" },
    { label: "Estimated Profit", value: formatMoney(totals.profit), caption: "Revenue minus ad spend.", icon: "P" }
  ];

  kpiGrid.innerHTML = kpis.map((kpi) => `
    <article class="metric-card">
      <div class="metric-top">
        <span>${kpi.label}</span>
        <span class="metric-icon">${kpi.icon}</span>
      </div>
      <strong class="metric-value">${kpi.value}</strong>
      <p class="metric-caption">${kpi.caption}</p>
    </article>
  `).join("");

  if (!rows.length) {
    highlightGrid.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  const bestRoas = [...rows].sort((a, b) => b.metrics.roas - a.metrics.roas)[0];
  const worstRoas = [...rows].sort((a, b) => a.metrics.roas - b.metrics.roas)[0];
  const bestCpa = [...rows].filter((row) => row.sales > 0).sort((a, b) => a.metrics.cpa - b.metrics.cpa)[0] || bestRoas;
  const score = getBudgetEfficiencyScore(rows, totals);

  highlightGrid.innerHTML = `
    <article class="highlight-card">
      <span>Best campaign</span>
      <strong>${bestRoas.campaignName}</strong>
      <p>${formatRatio(bestRoas.metrics.roas)} ROAS with ${formatMoney(bestRoas.metrics.profit)} estimated profit.</p>
    </article>
    <article class="highlight-card">
      <span>Worst campaign</span>
      <strong>${worstRoas.campaignName}</strong>
      <p>${formatRatio(worstRoas.metrics.roas)} ROAS. Review budget, targeting, and conversion path.</p>
    </article>
    <article class="highlight-card">
      <span>Budget efficiency score</span>
      <strong>${score}/100</strong>
      <p>Based on ROAS, profit, strong campaign share, and wasted spend exposure.</p>
    </article>
    <article class="highlight-card">
      <span>Best CPA campaign</span>
      <strong>${bestCpa.campaignName}</strong>
      <p>${formatMoney(bestCpa.metrics.cpa)} CPA across ${formatNumber(bestCpa.sales)} sales.</p>
    </article>
  `;
}

function renderTable(rows) {
  if (!rows.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="12">No campaigns yet. Add a row manually or load demo data.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = rows.map((row) => `
    <tr>
      <td>${row.platform}</td>
      <td>${row.campaignName}</td>
      <td>${formatMoney(row.spend)}</td>
      <td>${formatMoney(row.revenue)}</td>
      <td>${formatNumber(row.leads)}</td>
      <td>${formatNumber(row.sales)}</td>
      <td>${formatPercent(row.metrics.ctr)}</td>
      <td>${formatMoney(row.metrics.cpc)}</td>
      <td>${formatMoney(row.metrics.cpl)}</td>
      <td>${row.sales > 0 ? formatMoney(row.metrics.cpa) : "No sales"}</td>
      <td>${formatRatio(row.metrics.roas)}</td>
      <td><span class="status ${getStatusClass(row.status)}">${row.status}</span></td>
    </tr>
  `).join("");
}

function getPlatformStats(rows) {
  return ["Google Ads", "Meta Ads"].map((platform) => {
    const platformRows = rows.filter((row) => row.platform === platform);
    const totals = getTotals(platformRows);
    return {
      platform,
      rows: platformRows,
      totals
    };
  });
}

function renderPlatforms(rows) {
  const platforms = getPlatformStats(rows);
  const maxRevenue = Math.max(...platforms.map((item) => item.totals.revenue), 1);
  const maxLeads = Math.max(...platforms.map((item) => item.totals.leads), 1);
  const leader = [...platforms].sort((a, b) => b.totals.roas - a.totals.roas)[0];

  if (!rows.length) {
    platformGrid.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  platformGrid.innerHTML = platforms.map((item) => {
    const recommendation = getPlatformRecommendation(item, platforms);

    return `
      <article class="platform-card">
        <div class="platform-top">
          <strong>${item.platform}</strong>
          <span>${item.rows.length} campaigns</span>
        </div>
        <div class="mini-metrics">
          <div><span>Spend</span><strong>${formatMoney(item.totals.spend)}</strong></div>
          <div><span>Leads</span><strong>${formatNumber(item.totals.leads)}</strong></div>
          <div><span>Sales</span><strong>${formatNumber(item.totals.sales)}</strong></div>
          <div><span>ROAS</span><strong>${formatRatio(item.totals.roas)}</strong></div>
        </div>
        <div class="mini-metrics">
          <div><span>Revenue</span><strong>${formatMoney(item.totals.revenue)}</strong></div>
          <div><span>Avg CPL</span><strong>${formatMoney(item.totals.averageCpl)}</strong></div>
          <div><span>Avg CPA</span><strong>${item.totals.sales > 0 ? formatMoney(item.totals.averageCpa) : "No sales"}</strong></div>
          <div><span>Profit</span><strong>${formatMoney(item.totals.profit)}</strong></div>
        </div>
        <div class="bar-row">
          <div class="bar-label"><span>Revenue share</span><span>${formatMoney(item.totals.revenue)}</span></div>
          <div class="bar-track"><span class="bar-fill" style="width: ${Math.min(100, safeDivide(item.totals.revenue, maxRevenue) * 100)}%"></span></div>
        </div>
        <div class="bar-row">
          <div class="bar-label"><span>Lead volume</span><span>${formatNumber(item.totals.leads)}</span></div>
          <div class="bar-track"><span class="bar-fill" style="width: ${Math.min(100, safeDivide(item.totals.leads, maxLeads) * 100)}%"></span></div>
        </div>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
      </article>
    `;
  }).join("");
}

function getPlatformRecommendation(item, platforms) {
  const google = platforms.find((platform) => platform.platform === "Google Ads");
  const meta = platforms.find((platform) => platform.platform === "Meta Ads");
  const other = platforms.find((platform) => platform.platform !== item.platform);

  if (item.totals.spend === 0) {
    return "No spend entered yet for this platform.";
  }

  if (google && meta && google.totals.roas > meta.totals.roas && item.platform === "Google Ads") {
    return "Google Ads has stronger ROAS. Shift a controlled budget increase toward high-intent search campaigns and keep reviewing search terms.";
  }

  if (google && meta && google.totals.roas > meta.totals.roas && item.platform === "Meta Ads") {
    return "Meta Ads is trailing on ROAS. Improve creative quality, lead qualification, retargeting, and offer clarity before scaling.";
  }

  if (google && meta && meta.totals.roas > google.totals.roas && item.platform === "Meta Ads") {
    return "Meta Ads has stronger ROAS. Scale carefully through retargeting and winning creatives while monitoring sales quality.";
  }

  if (google && meta && meta.totals.roas > google.totals.roas && item.platform === "Google Ads") {
    return "Google Ads is trailing on ROAS. Tighten keyword intent, add negative keywords, and separate emergency or near-me searches from broad research terms.";
  }

  if (item.platform === "Meta Ads" && other && item.totals.leads > other.totals.leads && item.totals.sales <= other.totals.sales) {
    return "Meta Ads has stronger lead volume but weaker sales output. Improve creative quality, lead qualification, sales follow-up, and retargeting.";
  }

  return "Performance is close between platforms. Keep budgets controlled and judge changes by ROAS, CPA, and sales quality.";
}

function renderRoasAnalyzer(rows) {
  if (!rows.length) {
    roasAnalyzer.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  const best = [...rows].sort((a, b) => b.metrics.roas - a.metrics.roas)[0];
  const lowest = [...rows].sort((a, b) => a.metrics.roas - b.metrics.roas)[0];
  const belowTarget = rows.filter((row) => row.metrics.roas < 3);
  const weak = rows.filter((row) => row.metrics.roas < 1.5);

  roasAnalyzer.innerHTML = `
    <article class="analysis-card">
      <h3>Best ROAS campaign</h3>
      <p>${best.campaignName} leads with ${formatRatio(best.metrics.roas)} ROAS. Consider a measured budget increase if lead quality stays consistent.</p>
    </article>
    <article class="analysis-card">
      <h3>Lowest ROAS campaign</h3>
      <p>${lowest.campaignName} is at ${formatRatio(lowest.metrics.roas)} ROAS. Audit spend, targeting, offer fit, and follow-up quality.</p>
    </article>
    <article class="analysis-card">
      <h3>Campaigns below target ROAS</h3>
      <p>${belowTarget.length ? belowTarget.map((row) => row.campaignName).join(", ") : "No campaigns below the 3.0x target."}</p>
    </article>
    <article class="analysis-card">
      <h3>Suggested budget action</h3>
      <p>${weak.length ? `Reduce or pause ${weak.map((row) => row.campaignName).join(", ")} until the weak ROAS drivers are fixed.` : "Maintain active tests and shift incremental budget toward campaigns above 3.0x ROAS."}</p>
    </article>
  `;
}

function getFunnelNotes(totals) {
  const notes = [];

  if (totals.ctr < 2) {
    notes.push("Impressions to clicks is weak. Review ad relevance, creative hook, keyword intent, and offer clarity.");
  } else {
    notes.push("Impressions to clicks is workable. Continue testing stronger headlines and higher-intent segments.");
  }

  if (totals.leadConversionRate < 4) {
    notes.push("Clicks to leads is weak. Landing page message match, form friction, and offer strength need attention.");
  } else {
    notes.push("Clicks are converting into leads at a usable rate. Watch lead quality before scaling.");
  }

  if (totals.bookedCallRate < 25) {
    notes.push("Leads to booked calls is a bottleneck. Improve lead response speed, booking prompts, and qualification.");
  } else {
    notes.push("Lead to booked call flow is healthy enough to support controlled budget tests.");
  }

  if (totals.bookedCallToSaleRate < 25) {
    notes.push("Booked calls to sales needs review. Audit sales follow-up, lead expectations, and offer fit.");
  } else {
    notes.push("Booked calls are turning into sales at a promising rate.");
  }

  return notes;
}

function renderFunnel(totals) {
  if (totals.impressions === 0) {
    funnelSummary.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  const steps = [
    { title: "Impressions to clicks", value: formatPercent(totals.ctr), detail: `${formatNumber(totals.impressions)} impressions to ${formatNumber(totals.clicks)} clicks.` },
    { title: "Clicks to leads", value: formatPercent(totals.leadConversionRate), detail: `${formatNumber(totals.clicks)} clicks to ${formatNumber(totals.leads)} leads.` },
    { title: "Leads to booked calls", value: formatPercent(totals.bookedCallRate), detail: `${formatNumber(totals.leads)} leads to ${formatNumber(totals.bookedCalls)} booked calls.` },
    { title: "Booked calls to sales", value: formatPercent(totals.bookedCallToSaleRate), detail: `${formatNumber(totals.bookedCalls)} booked calls to ${formatNumber(totals.sales)} sales.` },
    { title: "Sales to revenue", value: formatMoney(totals.revenuePerSale), detail: `Average revenue per sale from ${formatNumber(totals.sales)} sales.` }
  ];
  const notes = getFunnelNotes(totals);

  funnelSummary.innerHTML = `
    ${steps.map((step) => `
      <article class="analysis-card">
        <h3>${step.title}: ${step.value}</h3>
        <p>${step.detail}</p>
      </article>
    `).join("")}
    <article class="analysis-card">
      <h3>Funnel notes</h3>
      <p>${notes.join(" ")}</p>
    </article>
  `;
}

function getCplCpaAnalysis(rows, totals) {
  if (!rows.length) {
    return [];
  }

  const rowsWithLeads = rows.filter((row) => row.leads > 0);
  const rowsWithSales = rows.filter((row) => row.sales > 0);
  const bestCpl = [...rowsWithLeads].sort((a, b) => a.metrics.cpl - b.metrics.cpl)[0] || null;
  const highestCpl = [...rowsWithLeads].sort((a, b) => b.metrics.cpl - a.metrics.cpl)[0] || null;
  const bestCpa = [...rowsWithSales].sort((a, b) => a.metrics.cpa - b.metrics.cpa)[0] || null;
  const highestCpa = [...rowsWithSales].sort((a, b) => b.metrics.cpa - a.metrics.cpa)[0] || null;
  const noSales = rows.filter((row) => row.spend > 0 && row.sales === 0);

  return [
    {
      title: "Average CPL",
      detail: `${formatMoney(totals.averageCpl)} across ${formatNumber(totals.leads)} total leads. Use this as the account-level lead cost benchmark.`
    },
    {
      title: "Best CPL campaign",
      detail: bestCpl ? `${bestCpl.campaignName} is generating leads at ${formatMoney(bestCpl.metrics.cpl)} CPL.` : "No lead-generating campaign available yet."
    },
    {
      title: "Highest CPL campaign",
      detail: highestCpl ? `${highestCpl.campaignName} has the highest CPL at ${formatMoney(highestCpl.metrics.cpl)}. Review targeting, offer, and landing page friction.` : "No CPL risk available yet."
    },
    {
      title: "Average CPA",
      detail: totals.sales > 0 ? `${formatMoney(totals.averageCpa)} across ${formatNumber(totals.sales)} total sales. Compare each campaign against this before reallocating budget.` : "No sales entered yet, so CPA cannot be evaluated."
    },
    {
      title: "Best CPA campaign",
      detail: bestCpa ? `${bestCpa.campaignName} is converting sales at ${formatMoney(bestCpa.metrics.cpa)} CPA.` : "No sales-producing campaign available yet."
    },
    {
      title: "CPA risk",
      detail: highestCpa ? `${highestCpa.campaignName} has the highest CPA at ${formatMoney(highestCpa.metrics.cpa)}. ${noSales.length ? `${noSales.length} campaign(s) also have spend with zero sales.` : "Keep monitoring before scaling."}` : "No CPA risk can be calculated without sales."
    }
  ];
}

function renderCplCpaAnalyzer(rows, totals) {
  const analysis = getCplCpaAnalysis(rows, totals);

  if (!analysis.length) {
    cplCpaAnalyzer.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  cplCpaAnalyzer.innerHTML = analysis.map((item) => `
    <article class="analysis-card">
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
    </article>
  `).join("");
}

function getWastedSpendFindings(rows) {
  return rows.flatMap((row) => row.metrics.wastedSpend.map((finding) => ({
    campaignName: row.campaignName,
    platform: row.platform,
    ...finding
  })));
}

function renderWaste(rows) {
  const findings = getWastedSpendFindings(rows);

  if (!rows.length) {
    wasteList.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  if (!findings.length) {
    wasteList.innerHTML = createEmptyState("No major wasted spend risks detected with the current rules.");
    return;
  }

  wasteList.innerHTML = findings.map((finding) => `
    <article class="risk-card ${getPriorityClass(finding.priority)}-risk">
      <div class="risk-top">
        <h3>${finding.issue}</h3>
        <span class="priority ${getPriorityClass(finding.priority)}">${finding.priority}</span>
      </div>
      <p><strong>${finding.campaignName}</strong> (${finding.platform})</p>
      <p><strong>Why it matters:</strong> ${finding.why}</p>
      <p><strong>Recommended action:</strong> ${finding.action}</p>
    </article>
  `).join("");
}

function getRecommendations(rows, totals) {
  if (!rows.length) {
    return [];
  }

  const strong = rows.filter((row) => row.status === "Strong").sort((a, b) => b.metrics.roas - a.metrics.roas)[0];
  const zeroSales = rows.filter((row) => row.spend > 0 && row.sales === 0).sort((a, b) => b.spend - a.spend);
  const weak = rows.filter((row) => row.status === "Wasting budget").sort((a, b) => b.spend - a.spend)[0];
  const lowRoas = [...rows].sort((a, b) => a.metrics.roas - b.metrics.roas)[0];
  const lowLeadRate = rows.filter((row) => row.clicks >= 700).sort((a, b) => a.metrics.leadConversionRate - b.metrics.leadConversionRate)[0];
  const leadsNoSales = rows.filter((row) => row.leads > 0 && row.sales === 0).sort((a, b) => b.leads - a.leads)[0];
  const salesLowLeadQuality = rows.filter((row) => row.leads >= 20).sort((a, b) => a.metrics.salesConversionRate - b.metrics.salesConversionRate)[0];
  const googleWeak = rows.find((row) => row.platform === "Google Ads" && row.status !== "Strong");
  const metaWeak = rows.find((row) => row.platform === "Meta Ads" && row.status !== "Strong");
  const platforms = getPlatformStats(rows).sort((a, b) => b.totals.roas - a.totals.roas);
  const platformLeader = platforms[0];
  const platformLagger = platforms[1];
  const retargetingCandidate = [...rows].filter((row) => row.clicks > 700 || row.leads > 40).sort((a, b) => (b.clicks + b.leads * 10) - (a.clicks + a.leads * 10))[0];
  const zeroSalesNames = zeroSales.map((row) => row.campaignName).join(", ");

  const recommendations = [
    {
      title: "Increase budget on the highest ROAS campaign",
      reason: strong ? `${strong.campaignName} is leading with ${formatRatio(strong.metrics.roas)} ROAS and ${formatNumber(strong.sales)} sales.` : `${rows[0].campaignName} is not yet a scale-ready winner because no campaign has both 3.0x+ ROAS and sales.`,
      priority: strong ? "Medium" : "Low",
      action: strong ? `Increase ${strong.campaignName} gradually while watching CPL, CPA, booked-call rate, and sales quality.` : "Keep budgets steady until one campaign crosses the strong threshold."
    },
    {
      title: "Pause or reduce zero-sales campaigns",
      reason: zeroSales.length ? `${zeroSalesNames} ${zeroSales.length === 1 ? "has" : "have"} spend but zero sales.` : "No campaign currently has spend with zero sales.",
      priority: zeroSales.length ? "High" : "Low",
      action: zeroSales.length ? "Pause or cap these campaigns until targeting, offer quality, and follow-up are fixed." : "Continue monitoring sales output before making pause decisions."
    },
    {
      title: "Reallocate budget from low ROAS to high ROAS",
      reason: `${lowRoas.campaignName} has the lowest ROAS at ${formatRatio(lowRoas.metrics.roas)}${strong ? `, while ${strong.campaignName} is strongest at ${formatRatio(strong.metrics.roas)}` : ""}.`,
      priority: lowRoas.metrics.roas < 1.5 ? "High" : "Medium",
      action: strong ? `Move a controlled budget share from ${lowRoas.campaignName} to ${strong.campaignName}.` : `Reduce ${lowRoas.campaignName} and retest with sharper intent or a better offer.`
    },
    {
      title: "Improve landing page for weak click-to-lead flow",
      reason: lowLeadRate ? `${lowLeadRate.campaignName} has ${formatNumber(lowLeadRate.clicks)} clicks but only a ${formatPercent(lowLeadRate.metrics.leadConversionRate)} lead conversion rate.` : "No campaign has enough click volume to isolate a landing-page bottleneck.",
      priority: lowLeadRate && lowLeadRate.metrics.leadConversionRate < 3 ? "High" : "Medium",
      action: lowLeadRate ? `Improve ${lowLeadRate.campaignName}'s headline match, offer clarity, proof, form friction, and page speed.` : "Wait for more traffic before making landing-page conclusions."
    },
    {
      title: "Test new hooks and creatives for weak Meta campaigns",
      reason: metaWeak ? `${metaWeak.campaignName} is not strong yet, with ${formatRatio(metaWeak.metrics.roas)} ROAS and ${formatPercent(metaWeak.metrics.leadConversionRate)} click-to-lead conversion.` : "Meta campaigns are currently holding up, but creative testing should continue.",
      priority: metaWeak ? "Medium" : "Low",
      action: metaWeak ? `Create new angles for ${metaWeak.campaignName}: pain-point hook, offer-led creative, proof-led creative, and retargeting variant.` : "Keep refreshing creatives before fatigue appears."
    },
    {
      title: "Add negative keywords for weak Google Ads campaigns",
      reason: googleWeak ? `${googleWeak.campaignName} is below the strong threshold and may be attracting mismatched search intent.` : "Google Ads campaigns are performing strongly enough for now.",
      priority: googleWeak ? "Medium" : "Low",
      action: googleWeak ? `Review ${googleWeak.campaignName}'s search terms, add negatives, and split high-intent terms from research terms.` : "Keep checking search terms weekly."
    },
    {
      title: "Review lead quality where sales are low",
      reason: salesLowLeadQuality ? `${salesLowLeadQuality.campaignName} has ${formatNumber(salesLowLeadQuality.leads)} leads and a ${formatPercent(salesLowLeadQuality.metrics.salesConversionRate)} lead-to-sale rate.` : "Lead-to-sale quality cannot be isolated yet.",
      priority: salesLowLeadQuality && salesLowLeadQuality.metrics.salesConversionRate < 10 ? "High" : "Medium",
      action: salesLowLeadQuality ? `Audit lead source quality, form fields, call notes, and sales objections for ${salesLowLeadQuality.campaignName}.` : "Collect more lead and sales data before making qualification changes."
    },
    {
      title: "Build retargeting for warm traffic",
      reason: retargetingCandidate ? `${retargetingCandidate.campaignName} has ${formatNumber(retargetingCandidate.clicks)} clicks and ${formatNumber(retargetingCandidate.leads)} leads that can feed follow-up audiences.` : "There is not enough click or lead volume yet for a clear retargeting pool.",
      priority: "Medium",
      action: retargetingCandidate ? `Retarget visitors, form starters, and unbooked leads from ${retargetingCandidate.campaignName} with proof, urgency, and reminder messaging.` : "Start retargeting once enough visitors or leads exist."
    },
    {
      title: "Review sales follow-up",
      reason: leadsNoSales ? `${leadsNoSales.campaignName} generated leads but no sales.` : "Sales follow-up quality can hide or unlock campaign performance.",
      priority: leadsNoSales ? "High" : "Medium",
      action: leadsNoSales ? `Check speed to lead, call attempts, booking reminders, and objections for ${leadsNoSales.campaignName}.` : "Keep reviewing call attempts and lead response speed."
    },
    {
      title: "Split Google Ads and Meta Ads strategy",
      reason: platformLeader && platformLagger ? `${platformLeader.platform} currently beats ${platformLagger.platform} on ROAS.` : "Different platforms need different optimization logic.",
      priority: "Medium",
      action: platformLeader && platformLagger
        ? platformLeader.platform === "Google Ads"
          ? "Shift controlled budget toward high-intent search campaigns, while using Meta Ads for retargeting and creative tests."
          : "Use Meta Ads winners for retargeting and creative learning, while tightening Google Ads search intent and negatives."
        : "Separate intent capture, retargeting, and awareness campaigns before judging results."
    }
  ];

  return recommendations;
}

function renderRecommendations(rows, totals) {
  const recommendations = getRecommendations(rows, totals);

  if (!recommendations.length) {
    recommendationGrid.innerHTML = createEmptyState(EMPTY_ANALYSIS_MESSAGE);
    return;
  }

  recommendationGrid.innerHTML = recommendations.map((item) => `
    <article class="recommendation-card">
      <div class="recommendation-top">
        <h3>${item.title}</h3>
        <span class="priority ${getPriorityClass(item.priority)}">${item.priority}</span>
      </div>
      <p><strong>Reason:</strong> ${item.reason}</p>
      <p><strong>Suggested action:</strong> ${item.action}</p>
    </article>
  `).join("");
}

function getOptimizationPlan() {
  return [
    { day: "Day 1", title: "Review spend and ROAS", action: "Compare spend, revenue, ROAS, CPL, and CPA across every campaign." },
    { day: "Day 2", title: "Pause or reduce weak campaigns", action: "Cut back campaigns with zero sales, weak ROAS, or poor lead quality signals." },
    { day: "Day 3", title: "Improve landing page / offer", action: "Tighten the promise, simplify the form, and make the conversion step clearer." },
    { day: "Day 4", title: "Test new ads or keywords", action: "Launch new hooks, search terms, negative keywords, audiences, or creative angles." },
    { day: "Day 5", title: "Review lead quality", action: "Check which leads booked calls, became sales, or failed qualification." },
    { day: "Day 6", title: "Reallocate budget", action: "Move a controlled share of budget toward stronger ROAS and CPA performers." },
    { day: "Day 7", title: "Final campaign report and next tests", action: "Summarize findings, document decisions, and plan the next test cycle." }
  ];
}

function renderPlan() {
  optimizationPlan.innerHTML = getOptimizationPlan().map((item) => `
    <article class="plan-card">
      <strong>${item.day}</strong>
      <h3>${item.title}</h3>
      <p>${item.action}</p>
    </article>
  `).join("");
}

function renderPreview(rows, totals) {
  const riskCount = rows.filter((row) => row.status === "Wasting budget").length;
  const riskLabel = riskCount === 0 ? "Low" : riskCount <= 2 ? "Medium" : "High";
  const score = getBudgetEfficiencyScore(rows, totals);

  document.querySelector("#previewSpend").textContent = formatMoney(totals.spend);
  document.querySelector("#previewRevenue").textContent = formatMoney(totals.revenue);
  document.querySelector("#previewRoas").textContent = formatRatio(totals.roas);
  document.querySelector("#previewRisk").textContent = riskLabel;
  document.querySelector("#previewScore").textContent = `${score}/100`;
  document.querySelector("#previewScoreBar").style.width = `${score}%`;
}

function renderDashboard() {
  const rows = enrichCampaigns();
  const totals = getTotals(rows);

  summaryNote.textContent = rows.length
    ? `${rows.length} campaign rows analyzed locally. Target ROAS: strong 3.0x+, acceptable 1.5x-2.99x, weak below 1.5x.`
    : "Load demo data or add campaigns to generate paid advertising metrics.";

  renderPreview(rows, totals);
  renderKpis(rows, totals);
  renderTable(rows);
  renderPlatforms(rows);
  renderRoasAnalyzer(rows);
  renderFunnel(totals);
  renderCplCpaAnalyzer(rows, totals);
  renderWaste(rows);
  renderRecommendations(rows, totals);
  renderPlan();
}

function getFormValue(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function getNumberValue(id) {
  return Number(document.querySelector(`#${id}`).value) || 0;
}

function handleAddCampaign(event) {
  event.preventDefault();

  campaigns.push({
    date: getFormValue("date"),
    platform: getFormValue("platform"),
    campaignName: getFormValue("campaignName"),
    spend: getNumberValue("spend"),
    impressions: getNumberValue("impressions"),
    clicks: getNumberValue("clicks"),
    leads: getNumberValue("leads"),
    bookedCalls: getNumberValue("bookedCalls"),
    sales: getNumberValue("sales"),
    revenue: getNumberValue("revenue")
  });

  form.reset();
  setDefaultDate();
  renderDashboard();
}

function loadDemoData() {
  campaigns = demoCampaigns.map((item) => ({ ...item }));
  renderDashboard();
}

function resetDashboard() {
  campaigns = [];
  form.reset();
  setDefaultDate();
  renderDashboard();
}

function getReportText(rows, totals) {
  const platforms = getPlatformStats(rows);
  const findings = getWastedSpendFindings(rows);
  const recommendations = getRecommendations(rows, totals);
  const cplCpaAnalysis = getCplCpaAnalysis(rows, totals);
  const funnelNotes = totals.impressions ? getFunnelNotes(totals) : [];
  const best = rows.length ? [...rows].sort((a, b) => b.metrics.roas - a.metrics.roas)[0] : null;
  const worst = rows.length ? [...rows].sort((a, b) => a.metrics.roas - b.metrics.roas)[0] : null;

  return [
    "Ad Performance Dashboard & ROAS Analyzer",
    "Portfolio report generated locally with JavaScript.",
    "",
    "Project disclaimer:",
    "This is not a real ad platform. It does not connect to Google Ads, Meta Ads, analytics tools, APIs, or live ad accounts. All numbers are manual or demo sample data, and all recommendations are rule-based local calculations.",
    "",
    "Summary KPIs:",
    `Total spend: ${formatMoney(totals.spend)}`,
    `Total revenue: ${formatMoney(totals.revenue)}`,
    `Overall ROAS: ${formatRatio(totals.roas)}`,
    `Total leads: ${formatNumber(totals.leads)}`,
    `Total sales: ${formatNumber(totals.sales)}`,
    `Average CPL: ${formatMoney(totals.averageCpl)}`,
    `Average CPA: ${totals.sales > 0 ? formatMoney(totals.averageCpa) : "No sales"}`,
    `Estimated profit: ${formatMoney(totals.profit)}`,
    "",
    "Campaign table:",
    ...(rows.length ? rows.map((row) => `${row.platform} | ${row.campaignName} | Spend ${formatMoney(row.spend)} | Revenue ${formatMoney(row.revenue)} | Leads ${formatNumber(row.leads)} | Sales ${formatNumber(row.sales)} | CTR ${formatPercent(row.metrics.ctr)} | CPC ${formatMoney(row.metrics.cpc)} | CPL ${formatMoney(row.metrics.cpl)} | CPA ${row.sales > 0 ? formatMoney(row.metrics.cpa) : "No sales"} | ROAS ${formatRatio(row.metrics.roas)} | Status ${row.status}`) : ["No campaigns yet. Add a row manually or load demo data."]),
    "",
    "Platform comparison:",
    ...platforms.map((item) => `${item.platform}: Spend ${formatMoney(item.totals.spend)}, Leads ${formatNumber(item.totals.leads)}, Sales ${formatNumber(item.totals.sales)}, Revenue ${formatMoney(item.totals.revenue)}, Avg CPL ${formatMoney(item.totals.averageCpl)}, Avg CPA ${item.totals.sales > 0 ? formatMoney(item.totals.averageCpa) : "No sales"}, ROAS ${formatRatio(item.totals.roas)}. Recommendation: ${getPlatformRecommendation(item, platforms)}`),
    "",
    "Best and worst campaign:",
    best ? `Best campaign: ${best.campaignName} (${best.platform}) at ${formatRatio(best.metrics.roas)} ROAS and ${formatMoney(best.metrics.profit)} estimated profit.` : "Best campaign: No campaign data available.",
    worst ? `Worst campaign: ${worst.campaignName} (${worst.platform}) at ${formatRatio(worst.metrics.roas)} ROAS and ${formatMoney(worst.metrics.profit)} estimated profit.` : "Worst campaign: No campaign data available.",
    "",
    "ROAS analysis:",
    best ? `Best ROAS campaign: ${best.campaignName} at ${formatRatio(best.metrics.roas)}.` : "No campaign data available.",
    worst ? `Lowest ROAS campaign: ${worst.campaignName} at ${formatRatio(worst.metrics.roas)}.` : "No campaign data available.",
    `Campaigns below target ROAS: ${rows.filter((row) => row.metrics.roas < 3).map((row) => row.campaignName).join(", ") || "None"}.`,
    "",
    "CPL and CPA analysis:",
    ...(cplCpaAnalysis.length ? cplCpaAnalysis.map((item) => `${item.title}: ${item.detail}`) : ["No CPL or CPA analysis available."]),
    "",
    "Wasted spend findings:",
    ...(findings.length ? findings.map((finding) => `${finding.priority}: ${finding.campaignName} - ${finding.issue}. ${finding.why} Action: ${finding.action}`) : ["No major wasted spend findings detected."]),
    "",
    "Funnel notes:",
    ...(funnelNotes.length ? funnelNotes : ["No funnel notes available without campaign data."]),
    "",
    "Recommendations:",
    ...(recommendations.length ? recommendations.map((item) => `${item.priority}: ${item.title}. Reason: ${item.reason} Action: ${item.action}`) : ["Add campaign data to generate recommendations."]),
    "",
    "7-day optimization plan:",
    ...getOptimizationPlan().map((item) => `${item.day}: ${item.title}. ${item.action}`)
  ].join("\n");
}

function exportReport() {
  const rows = enrichCampaigns();
  const totals = getTotals(rows);
  const report = getReportText(rows, totals);
  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ad-performance-dashboard-roas-report.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setDefaultDate() {
  const dateInput = document.querySelector("#date");
  if (!dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }
}

form.addEventListener("submit", handleAddCampaign);
document.querySelector("#loadDemoBtn").addEventListener("click", loadDemoData);
document.querySelector("#resetBtn").addEventListener("click", resetDashboard);
document.querySelector("#exportBtn").addEventListener("click", exportReport);

setDefaultDate();
renderDashboard();
