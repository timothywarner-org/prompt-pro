# CLAUDE.md

These notes brief Claude Code (claude.ai/code) or any AI copilot when working in this repository.

## Project Overview

This repo backs Tim Warner’s **How to Prompt Like a Pro** course. It is content-first: Markdown lesson plans inside `segments/`, supporting research and decks in `docs/`, and visual assets in `images/`. There is no active Node app—the `package.json` only pins Markdown tooling (markdownlint CLI).

## Key Directories

- `segments/segment-*` – Four numbered segments containing learner workbooks, facilitator notes, MCP demos, and exercises. Keep existing directory names; drop new material into the matching segment.
- `docs/` – Long-form references such as `context-engineering.md` and the slide deck `warner-prompt-pro-december-2025.pptx`.
- `images/` – Repo cover art and social previews (`social-preview.png`). Save optimized PNG/JPG files here.
- `.github/` – Issue/PR templates, custom instructions, and workflows (notably `markdownlint-autofix.yml` for lint + autofix on demand).

## Authoring Workflow

1. `npm install` (installs markdownlint-cli2 locally).
2. Edit Markdown with two-space indentation for lists and blank lines around headings (rules enforced by `markdownlint.json`).
3. Run `npx markdownlint-cli2 "**/*.md" --config markdownlint.json --fix` before pushing. The workflow `Markdownlint Autofix` can also be triggered via **Actions → Run workflow**.
4. For PPT updates, export to PDF to confirm slides render well before sharing with learners (store the PPT in `docs/`).

## Content Guidelines

- When referencing assets, use relative links (e.g., `segments/segment-2-multimodal-prompting/README.md` or `images/social-preview.png`).
- For MCP demos inside `segments/segment-4-agentic-ai/mcp-demos/`, document manual prerequisites in the segment README; do not assume local code execution.
- Prefer short sections with tables or callouts so lessons are scannable on screen shares.

## Security & Privacy

- Do not reintroduce the deleted `attachments/` datasets; if sanitized data is required, keep it inside the relevant segment folder with clear provenance.
- Follow `SECURITY.md` for disclosure steps (`tim@techtrainertim.com`).
- Never embed production API keys in lesson text—reference `env.example` and remind learners to set their own environment variables.

## Useful Links

- Main README: `README.md`
- Instructor guide: `INSTRUCTOR-MANIFEST.md`
- Agent playbook: `AGENTS.md`
- Markdown spacing rules: `markdownlint.json`
- Security policy: `SECURITY.md`
