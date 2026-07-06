# Agent Instructions

## Project Identity

This project is a static frontend portfolio project named **Ad Performance Dashboard & ROAS Analyzer**.

It belongs to Fazil Waseem and is positioned as a learning and portfolio project for performance marketing, ad reporting, CRO, campaign analytics, and AI-assisted marketing systems.

## Honesty Rules

Always keep the project honest:

- Do not present it as a real ad platform.
- Do not claim it connects to Google Ads, Meta Ads, analytics tools, APIs, or live ad accounts.
- Do not claim real AI analysis.
- Do not add fake integrations, fake authentication, fake live syncing, or misleading account language.
- Keep all calculations and recommendations local and transparent in JavaScript.
- Make it clear that demo data is realistic but fictional.

## Technical Rules

- Use plain HTML, CSS, and vanilla JavaScript.
- Keep the project GitHub Pages compatible.
- Do not add external frameworks unless explicitly requested.
- Do not add backend services.
- Do not require package installation for the base version.
- Avoid console errors.
- Keep formulas readable and easy to audit.

## UX Rules

- Keep the dashboard polished, professional, and portfolio-ready.
- Make the interface useful, not just decorative.
- Preserve responsive behavior at desktop, tablet, and mobile sizes.
- Keep tables inside responsive scroll wrappers.
- Make buttons clear and easy to tap.
- Use accessible labels and focus states.
- Do not rely only on color for campaign status or priority.

## Analysis Rules

Core formulas:

- CTR = clicks / impressions * 100
- CPC = spend / clicks
- CPL = spend / leads
- Cost per booked call = spend / booked calls
- CPA = spend / sales
- Lead conversion rate = leads / clicks * 100
- Sales conversion rate = sales / leads * 100
- ROAS = revenue / spend
- Profit estimate = revenue - spend

Campaign evaluation:

- ROAS 3.0+ is strong.
- ROAS 1.5 to 2.99 is acceptable but should be watched.
- ROAS below 1.5 is weak.
- Spend with zero sales is wasting budget.
- Many clicks but few leads should trigger landing page or offer improvement.
- Leads but no sales should trigger lead quality and sales follow-up review.
- Poor Google Ads campaigns should mention keywords, search intent, and negative keywords.
- Poor Meta Ads campaigns should mention creative, hook, audience, and offer testing.

## Documentation Rules

Keep these files aligned when the product changes:

- `README.md`
- `docs/PROJECT_BRIEF.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CONTENT.md`
- `AGENTS.md`

## Future Improvement Ideas

Good future additions:

- CSV import
- Editable rows
- localStorage persistence
- PDF-style print report
- Custom thresholds
- More chart views
- Ecommerce vs lead generation modes

Avoid future additions that make the project look like it is connected to live ad accounts unless a real integration is explicitly built and documented honestly.
