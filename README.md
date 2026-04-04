# agent-activity-playground

Simple activity feed experiment for AI agent actions.

A design engineering prototype exploring how an AI CRM agent shows its work — contact syncing, task creation, deal updates, and reasoning steps rendered as a staggered real-time feed with interactive drill-down panels.

## Features

- Staggered real-time card loading with CSS grid transitions
- Interactive summary cards with expandable contact, task, and deal detail views
- Fully responsive (480px → 2-col stats, 360px → 1-col, touch-optimized)
- Systematic spacing scale (4px base grid) and radius hierarchy
- SF Pro system font stack with tabular numerals
- Keyboard-accessible with `focus-visible` ring, `prefers-reduced-motion` support
- Touch-gated hover states (`pointer: fine`)

## Stack

React · Vite · Inline styles + scoped CSS · SF Pro icons (inline SVG)

## License

MIT
