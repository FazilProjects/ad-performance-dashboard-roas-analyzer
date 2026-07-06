# Design System

## Direction

The dashboard should feel like a clean premium analytics tool for performance marketing and ad reporting. It should be polished enough for a portfolio review while remaining honest, readable, and useful.

## Visual Style

- Light background
- Dark readable text
- White translucent panels
- Subtle borders
- Soft shadows
- Dashboard-style cards
- Scrollable data tables
- Compact report components
- Clean status badges
- Chart-style progress bars

## Color Tokens

- Analytics blue: `#2563eb`
- Primary blue dark: `#1d4ed8`
- Strong green: `#16a34a`
- Warning yellow: `#ca8a04`
- Risk red: `#dc2626`
- Main text: `#162033`
- Muted text: `#647084`
- Background: `#f6f8fb`
- Borders: `rgba(30, 48, 76, 0.12)`

## Color Usage

- Blue: primary actions, analytics emphasis, progress bars
- Green: profitable or strong performance
- Yellow: warning, acceptable but needs review, watch closely
- Red: wasted spend, high risk, weak performance
- Neutral dark: export button, text, report structure

Do not rely on color alone. Status labels must include readable text.

## Layout

- Max content width: approximately `1180px`
- Main page padding: responsive, with narrow gutters on mobile
- Sections use full-width panels inside the content area
- KPI cards use a responsive grid
- Tables are wrapped in horizontal scroll containers
- Analysis and recommendation cards stack cleanly on mobile

## Components

### Hero

- Large project title
- Supporting description
- Small focus chips
- Dashboard preview card
- Honest local sample-data badge

### Forms

- Every input has a visible label
- Form grid uses four columns on desktop
- Fields stack on mobile
- Buttons are large enough for touch interaction

### KPI Cards

- Label
- Large value
- Short explanatory caption
- Small symbol block

### Tables

- Sticky header
- Clear column labels
- Responsive horizontal scroll
- Status badges for campaign health

### Platform Cards

- Spend, leads, sales, revenue, average CPL, average CPA, ROAS, profit
- Revenue and lead volume bars
- Recommendation text

### Risk Cards

- Issue
- Campaign and platform
- Why it matters
- Recommended action
- Priority badge

### Recommendation Cards

- Recommendation title
- Reason
- Priority
- Suggested action

## Animation

Animations should be subtle, slow, smooth, and professional.

Allowed:

- Soft animated gradient movement
- Faint analytics-style grid texture
- Subtle moving line details
- Progress bar transitions

Rules:

- Keep text readable.
- Avoid flashy movement.
- Avoid heavy animation.
- Respect `prefers-reduced-motion`.

## Responsive Rules

Breakpoints:

- `max-width: 1024px`
- `max-width: 768px`
- `max-width: 540px`

Responsive behavior:

- Hero stacks to one column.
- Forms stack from four columns to two columns, then one column.
- KPI cards stack on small screens.
- Platform, risk, and recommendation cards stack on mobile.
- Tables remain horizontally scrollable.
- Buttons remain readable and easy to tap.

## Accessibility

- Use semantic HTML landmarks and sections.
- Use labels for every input.
- Maintain readable contrast.
- Add visible focus styles.
- Do not communicate status through color alone.
- Keep button text clear and descriptive.
