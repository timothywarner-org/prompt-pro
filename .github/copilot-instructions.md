# prompt-pro AI guidance

## Purpose and scope

- This is a **content-first** repository. It backs Tim Warner's O'Reilly Live Learning course **How to Prompt Like a Pro** (4 x 50-minute segments).
- The course teaches **Warner's 26 Laws of Generative AI**, split **7-7-8-4** across the four segments (see [../WARNERS-LAWS.md](../WARNERS-LAWS.md)).
- All demo content uses the fictional **Contoso Robotics** scenario (mid-size robotics manufacturer, 500 employees, $120M revenue, Austin TX, CEO Maria Chen). Keep new demo material consistent with this fiction.
- There is **no top-level application**. The root `package.json` is a legacy stub - do not run its `start`/`dev`/`test` scripts.

## Repository layout

- `segments/segment-1-identity-mindset-context/` - Laws 1-7, Contoso scenario data and demos.
- `segments/segment-2-context-sculpting-technique/` - Laws 8-14, few-shot, chain-of-thought, role-play.
- `segments/segment-3-workflow-multimodal-security/` - Laws 15-22, custom instructions, prompt versioning, privacy audits (includes a vendored `knowledge/` subfolder of Microsoft Learn content - do not edit it).
- `segments/segment-4-agentic-orchestration/` - Laws 23-26, LLM matching, subagents, checkpoints.
- `docs/` - Long-form reference guides and the master slide deck.
- `images/` - Cover art and social preview (optimized PNG/JPG).

Drop new material into the matching segment folder rather than introducing parallel directories.

## The only runnable code

The single piece of executable code is the MCP server under `segments/segment-4-agentic-orchestration/mcp-demos/weather-server/`:

- `npm install` - install `@modelcontextprotocol/sdk` and `zod`.
- `npm start` - run the MCP server (`node server.js`).
- `npm run inspect` - launch MCP Inspector against the local server.

Everything else in the repo is Markdown lesson content, reference docs, or assets.

## Authoring rules

- Two-space list indentation; keep a blank line before and after headings, lists, and fenced code blocks (enforced by [../markdownlint.json](../markdownlint.json)).
- Sentence-case headings; kebab-case directories and filenames.
- Prefer short sections with tables or callouts so lessons stay scannable on screen shares.
- Use relative links for assets and cross-references.
- **Never embed real API keys** in lesson text. Reference `env.example` and remind learners to set their own environment variables.

## Linting

- Lint before pushing: `npx markdownlint-cli2 "**/*.md" --config markdownlint.json --fix`.
- The runner config `.markdownlint-cli2.jsonc` excludes vendored `knowledge/` and `node_modules/` content.

## Key references

- High-level prompting and context guidance: [../docs/context-engineering.md](../docs/context-engineering.md).
- Course overview and segment table: [../README.md](../README.md).
- Delivery plan: [../COURSE-PLAN-JUNE-2026.md](../COURSE-PLAN-JUNE-2026.md).
- Contributor playbook: [../AGENTS.md](../AGENTS.md)

