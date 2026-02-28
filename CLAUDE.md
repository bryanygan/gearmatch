## Loadout Feature
- Implementation plan: see LOADOUT_AGENTS.md in project root
- Product data lives in src/data/products/ as JSON files
- Categories: mouse, audio, keyboard, monitor
- Stack: React 18, TypeScript, Vite, Tailwind, shadcn/ui, React Router, React Query, Zod
- Use shadcn/ui components wherever possible (use shadcn MCP for accurate component APIs)
- Follow existing code patterns — check other pages/components before creating new ones
- Run `npx tsc --noEmit` after every change to verify types
- Run `npx vitest run` to check for test regressions