# Project Brief

## Project Name

Ad Performance Dashboard & ROAS Analyzer

## Goal

Build a polished frontend dashboard that helps users analyze ad campaign performance using sample or manually entered campaign data.

The dashboard calculates paid advertising metrics, identifies weak campaigns, highlights wasted spend risks, compares platform performance, and generates practical optimization recommendations.

## Portfolio Context

This project is for Fazil Waseem, an aspiring Performance Marketer learning:

- Google Ads
- Meta Ads
- Lead generation
- Ecommerce marketing
- Conversion rate optimization
- Campaign analytics
- AI-assisted marketing systems

## Scope

The first version is a static local dashboard built with HTML, CSS, and JavaScript. It is designed to run on GitHub Pages without any build step.

Included:

- Manual campaign data form
- Demo campaign data
- Campaign performance table
- KPI cards
- Platform comparison
- ROAS, CPL, and CPA analysis
- Wasted spend detector
- Funnel performance summary
- Action recommendations
- 7-day optimization plan
- Exportable text report

Not included:

- Google Ads API
- Meta Ads API
- Analytics integrations
- Live ad account data
- Real AI model analysis
- Backend database
- User authentication

## User Workflow

1. Open the dashboard.
2. Add campaign data manually or click **Load Demo Data**.
3. Review KPI summary cards.
4. Inspect the campaign performance table.
5. Compare Google Ads and Meta Ads performance.
6. Review ROAS analysis and wasted spend risks.
7. Read funnel notes and practical recommendations.
8. Export a local report.
9. Reset the dashboard when needed.

## Input Fields

Each campaign row includes:

- Date
- Platform
- Campaign name
- Spend
- Impressions
- Clicks
- Leads
- Booked calls
- Sales
- Revenue

## Calculated Metrics

- CTR = clicks / impressions * 100
- CPC = spend / clicks
- CPL = spend / leads
- Cost per booked call = spend / booked calls
- CPA = spend / sales
- Lead conversion rate = leads / clicks * 100
- Sales conversion rate = sales / leads * 100
- ROAS = revenue / spend
- Profit estimate = revenue - spend
- Wasted spend flag based on poor leads, sales, CPA, CPL, or ROAS

## Analysis Rules

- ROAS 3.0+ is strong.
- ROAS 1.5 to 2.99 is acceptable but should be watched.
- ROAS below 1.5 is weak.
- Spend with zero sales is flagged as wasting budget.
- Many clicks with few leads triggers landing page or offer recommendations.
- Leads with no sales triggers lead quality and sales follow-up recommendations.
- Weak Google Ads campaigns trigger keyword, intent, and negative keyword review.
- Weak Meta Ads campaigns trigger creative, hook, and audience test review.
- The stronger platform receives a controlled budget shift recommendation.

## Limitations

This is a local portfolio dashboard. It does not validate real attribution, account setup, offline conversion quality, margin, customer lifetime value, or CRM outcomes. Its recommendations are rule-based and educational, not a substitute for real campaign management.
