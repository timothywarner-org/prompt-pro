# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo backs Tim Warner's **How to Prompt Like a Pro** O'Reilly Live Learning course (4 × 50 min). It is content-first: Markdown lesson plans inside `segments/`, supporting research and decks in `docs/`, and visual assets in `images/`. There is no top-level application - the root `package.json` is a legacy stub (it references a `src/index.js` that no longer exists). The only runnable code lives under `segments/segment-4-agentic-orchestration/mcp-demos/`.

All demo content uses the **Contoso Robotics** scenario (mid-size robotics manufacturer, 500 employees, $120M revenue, Austin TX, CEO Maria Chen). Keep new demo material consistent with this fiction. The course is structured around **Warner's 26 Laws of Generative AI** (`WARNERS-LAWS.md`), split 7-7-8-4 across the four segments.

## Repository Layout

- `segments/segment-1-identity-mindset-context/` – Laws 1-7: anchor trap, context disclosure, identity awareness. Contoso Robotics scenario data and demos.
- `segments/segment-2-context-sculpting-technique/` – Laws 8-14: few-shot, chain-of-thought, role-play, meta-prompting. Budget exercises and product brief templates.
- `segments/segment-3-workflow-multimodal-security/` – Laws 15-22: custom instructions, prompt versioning, privacy audits. Includes retained `knowledge/` subfolder from prior deliveries.
- `segments/segment-4-agentic-orchestration/` – Laws 23-26: LLM matching, subagents, checkpoints. Plus `mcp-demos/weather-server/` (a working MCP server used for live demos).
- `docs/` – Long-form references (`context-engineering.md`) and the master slide deck `warner-prompt-pro-december-2025.pptx`.
- `images/` – Cover art and `social-preview.png`. Keep optimized PNG/JPG here.
- `.github/` – Issue/PR templates, custom instructions, and the `markdownlint-autofix.yml` workflow (runnable on-demand via **Actions → Run workflow**).

Keep existing segment directory names - drop new material into the matching segment rather than introducing parallel folders.

## Authoring Workflow

1. `npm install` at the repo root installs `markdownlint-cli2` (the root `package.json`'s `start`/`dev`/`test` scripts are stale and should not be run).
2. Edit Markdown with two-space list indentation and blank lines around headings (enforced by `markdownlint.json`).
3. Lint before pushing: `npx markdownlint-cli2 "**/*.md" --config markdownlint.json --fix`
4. For slide deck updates in `docs/`, export to PDF to verify fonts and charts before sharing with learners.

## Weather MCP Demo (segment 4)

The only runnable code in the repo. From `segments/segment-4-agentic-orchestration/mcp-demos/weather-server/`:

- `npm install` – install `@modelcontextprotocol/sdk` and `zod`.
- `npm start` – run the MCP server (`node server.js`).
- `npm run inspect` – launch MCP Inspector against the local server using `inspector.json`.

Document any manual prerequisites (API keys, network) in that segment's README - do not assume learners can execute code locally.

## Content Guidelines

- Use relative links for assets (e.g., `segments/segment-2-context-sculpting-technique/README.md`, `images/social-preview.png`).
- Prefer short sections with tables or callouts so lessons are scannable on screen shares.
- Sentence-case headings; kebab-case directories and filenames.
- Reserve emoji for callouts and exercises where they aid scannability.
- Never embed production API keys in lesson text - reference `env.example` and remind learners to set their own environment variables.
- Do not reintroduce the deleted `attachments/` datasets. If sanitized data is required, keep it inside the relevant segment folder with clear provenance.

## Key Reference Files

- `README.md` – Course overview and segment table.
- `WARNERS-LAWS.md` / `README.md` – "Warner's Laws of Generative AI Prompting" (the course's guiding principles; keep lesson content consistent with them).
- `COURSE-PLAN-APRIL-2026.md` – April 2026 delivery plan (segment titles, law assignments, demo ideas).
- `docs/INSTRUCTOR-MANIFEST.md` – Run-of-show delivery notes.
- `AGENTS.md` – Contributor playbook (commit style, PR expectations).
- `markdownlint.json` – Enforced spacing rules.
- `SECURITY.md` – Disclosure steps (`tim@techtrainertim.com`).
