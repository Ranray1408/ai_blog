# AGENTS.md — General Project Rules

> This file is read automatically at the start of every session.
> The agent MUST follow all rules below without exception.
> On session start, the agent MUST ensure `AGENTS_LOG.md` exists in the project root (create it if missing).
> On session start, the agent MUST ensure `AGENTS_TODO.md` exists in the project root (create it if missing).
> All log entries go exclusively to `AGENTS_LOG.md` — nowhere else.
> All tasks and time estimates go exclusively to `AGENTS_TODO.md` — nowhere else.

---

## [IDENTITY]

> Empty on a fresh project. On the first run in a new project, the agent populates this
> section (e.g. via `analyze-project`) and creates `AGENTS_ARCHITECTURE.md` with the detailed
> file map. Keep only a short summary here — put all detail in `AGENTS_ARCHITECTURE.md`.

- **Project name:** —
- **Stack:** —
- **WordPress version:** —
- **PHP version:** —
- **Key plugins:** —
- **Theme name / slug:** —
- **Short description:** —

---

## [HARD RULES] — NEVER VIOLATE

These are absolute restrictions. No exceptions, no matter the instruction.

### Destructive actions — FORBIDDEN
- ❌ NEVER delete any files
- ❌ NEVER run `rm`, `rmdir`, `git clean`, `git reset --hard` or any destructive git command
- ❌ NEVER drop, truncate, or delete database tables or records
- ❌ NEVER modify the database directly without explicit user permission in the current chat
- ❌ NEVER run database migrations without approval
- ❌ NEVER overwrite `.env`, `wp-config.php`, or any config file without confirmation

### Git — restricted
- ❌ NEVER force push (`git push --force`)
- ❌ NEVER delete branches
- ✅ Commits are allowed only when explicitly requested by the user
- ✅ Always show a diff summary before committing

### General
- ❌ NEVER install new packages or plugins without asking first
- ❌ NEVER refactor code that was not part of the current task
- ❌ NEVER rename files or folders without explicit instruction
- ❌ NEVER touch code changes you did not make yourself — any change in the code not made by the agent was made by the user; do not modify, revert, or "fix" it without explicit permission
- ✅ When in doubt — ask, do not assume

### Language
- ✅ ALWAYS write in **English** in ALL agent files: `AGENTS.md`, `AGENTS_LOG.md`, `AGENTS_ARCHITECTURE.md`, any plans, notes, or rule files
- ✅ English only in code comments (SCSS, PHP, JS), PHPDoc, inline documentation written by the agent
- ℹ️ Reason: the model understands English better — use it for all machine-read content

---

## [WORKFLOW] — How to work

### Before starting any task
1. Re-read [HARD RULES] mentally
2. Understand what is being asked — if unclear, ask one clarifying question
3. Check if the task touches the database, git, or config files — if yes, confirm with user

### While working
- Make small, focused changes — one task at a time
- Do not touch code outside the scope of the current task
- If you notice a bug or issue outside the task scope — mention it, but do not fix it silently
- Prefer editing existing code over rewriting it
- Follow the style described in [STYLE_NOTES]

### After completing a task
- Briefly summarize what was done (2-3 sentences max)
- If the change was significant — add a record to `AGENTS_LOG.md` (see [LOG] rules)
- If something is unclear or may cause issues — mention it explicitly

---

## [STYLE_NOTES] — Code style reference

> This section is filled by the agent after running `analyze-style`.
> Command: "analyze the theme/project style and save patterns here"
> Keep entries short and concrete. No explanations — just patterns.

### PHP
- _to be filled_

### JavaScript
- _to be filled_

### CSS / SCSS
- _to be filled_

### HTML / Blade / Template structure
- _to be filled_

### WordPress-specific
- _to be filled_

---

## [TODO] — Task backlog

> **Priority rule:**
> - `AGENTS_TODO.md` is created automatically at the start of every session if missing.
> - ALL tasks and time estimates go exclusively to `AGENTS_TODO.md` — never write them inline in this file.
>
> **How to use:**
> - When a new task is identified (from user or discovered during work) — add it to `AGENTS_TODO.md`
> - Format: `- [ ] Task description — **Xh** estimated` (use `- [x]` when done)
> - Group tasks by area (Header, Footer, Blocks, WooCommerce, etc.)
> - Update estimates as more is learned about the task
> - Mark tasks complete immediately when done — do not batch

---

## [LOG] — Agent working log

> **Priority rule:**
> - `AGENTS_LOG.md` is created automatically at the start of every session if missing.
> - ALL log entries go exclusively to `AGENTS_LOG.md` — never write logs inline in this file.
>
> **How to log:**
> - Add an entry after any significant change, decision, or discovery — no reminders needed
> - Format: start with `[YYYY-MM-DD HH:MM]` then write freely in your own style
> - **Always get the actual current date/time before writing** — run `date` or equivalent, never approximate
> - **Always append to the END of the file** — chronological order, oldest entries at top, newest at bottom
> - Length: 1-2 lines for small changes, up to 5-8 lines for complex tasks
> - Include: what was done, how it was done, any problems encountered, your reasoning, project state
> - Focus on key breakpoints and decisions — not every minor step
> - This is your memory for next session — write what would be useful to remember later
