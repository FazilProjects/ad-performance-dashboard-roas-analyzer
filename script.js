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
    return "No spend entered yet for t
