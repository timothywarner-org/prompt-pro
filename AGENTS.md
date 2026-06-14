# Repository Guidelines

## Project Structure & Module Organization

- `segments/segment-*` hold the four lesson tracks. Each segment owns its worksheets, demos, and facilitator notes - edit in place rather than inventing new folder layouts.
- `docs/` contains reference material (e.g., `context-engineering.md`) plus the master slide deck (`warner-prompt-pro-december-2025.pptx`). Update these when the narrative shifts.
- `images/` stores marketing assets, covers, and the GitHub social preview (`social-preview.png`); drop any learner-facing artwork here.
- `.github/` includes instructions, PR templates, and workflows. `.claude/` and `.vscode/` capture local agent/editor preferences - only tweak when adjusting teaching tooling.

## Build, Test, and Development Commands

- `npm install` - installs Markdown tooling from `package.json` (markdownlint CLI and helpers).
- `npx markdownlint-cli2 \"**/*.md\" --config markdownlint.json` - lint all Markdown files using the repo spacing rules.
- `npx markdownlint-cli2 \"**/*.md\" --config markdownlint.json --fix` - apply safe spacing fixes (run locally before pushing).
- `python -m http.server` (optional) - spin up a simple server if you want to preview linked assets from `docs/` or `segments/`.

## Coding Style & Naming Conventions

- Markdown first: keep headings sentence-case, include blank lines around headings and lists (see `markdownlint.json` for enforced spacing).
- Keep directories kebab-case and prefer descriptive filenames (`segment-3-workflow-multimodal-security/overview.md`).
- For screenshots or diagrams, export optimized PNGs/JPGs to `images/` and reference them with relative paths in lesson READMEs.
- Use emoji sparingly in course text; reserve them for callouts or exercises where they aid scannability.

## Testing Guidelines

- Run the markdownlint command (see above) before opening PRs; the Actions workflow `Markdownlint Autofix` can clean spacing, but manual review avoids noisy diffs.
- When editing slide decks, export a PDF preview to verify fonts and charts before sharing with learners.
- For MCP or agent demos inside `segments/segment-4-agentic-orchestration/mcp-demos/`, document manual test steps in the segment README since automated tests are out of scope for this repo.

## Commit & Pull Request Guidelines

- Follow the existing short, imperative subjects visible in `git log` (e.g., `add warner's laws in advance of Oct 2025 delivery`); mention the delivery window or artifact touched when it adds clarity.
- Each PR should describe the scenario (new template, segment refresh, demo fix), list test commands run (`npm test`, manual demo), link to any tracking issue, and include screenshots or prompt transcripts if UX is affected.

## Environment & Security Tips

- Copy `env.example` to `.env` only if you need to demo API-powered workflows; most classroom work relies on external SaaS, not local code.
- Never commit secrets or participant data - store sanitized assets in `docs/` or `images/` and scrub learner identifiers before upload.
- When sharing logs or MCP transcripts, reference segment filenames and line numbers so facilitators can follow along without exposing private content.
