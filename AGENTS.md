# Repository Guidelines

## Project Structure & Module Organization
- `src/` hosts the runnable Node.js demo: `index.js` orchestrates demos, `promptManager.js` resolves templates plus variable injection, `aiClient.js` handles OpenAI/Azure calls, and `config.js` centralizes environment defaults.
- `templates/` keeps plain-text prompt blueprints (`code-review.txt`, `email-composer.txt`, `technical-writer.txt`); add new templates here and reference them by file stem.
- `segments/`, `resources/`, `knowledge/`, and `attachments/` store curriculum content, slides, and examples that the demos reference in documentation.
- `prompt-template-demo/` contains auxiliary walkthroughs, while `.github/` houses workflow settings and issue templates; keep media in `images/` to avoid bloating the repo root.

## Build, Test, and Development Commands
- `npm install` — install dependencies (Node 18+ as enforced in `package.json`).
- `npm start` — run the full prompt template demo once with the current `.env`.
- `npm run dev` — watch `src/` for changes; useful when iterating on new demos.
- `npm test` — executes `src/test.js`, verifying template loading, substitution, and context handling; extend this script when adding behaviors.

## Coding Style & Naming Conventions
- Use modern ECMAScript modules with two-space indentation, camelCase for functions/variables, and PascalCase only for exported classes (`PromptManager`, `AIClient`).
- Keep template filenames kebab-case text files and mirror that stem when referencing them in code (`buildPrompt('code-review')` loads `templates/code-review.txt`).
- Favor small, single-responsibility modules; pass configuration via `config` imports rather than global state, and document tricky flows with concise inline comments.

## Testing Guidelines
- Maintain and expand `src/test.js`; add a dedicated async test per new capability (e.g., retry logic, history trimming) and ensure assertions cover both happy-path and error messaging.
- Prefer fixtures inside `templates/` or a `tests/fixtures/` subfolder instead of embedding long sample prompts inside the tests themselves.
- Aim for full coverage of context mutations so regressions in `PromptManager` surface quickly; record failing cases in the test output summary for rapid triage.

## Commit & Pull Request Guidelines
- Follow the existing short, imperative subjects visible in `git log` (e.g., `add warner's laws in advance of Oct 2025 delivery`); mention the delivery window or artifact touched when it adds clarity.
- Each PR should describe the scenario (new template, segment refresh, demo fix), list test commands run (`npm test`, manual demo), link to any tracking issue, and include screenshots or prompt transcripts if UX is affected.

## Environment & Security Tips
- Copy `env.example` to `.env` and set `OPENAI_API_KEY`; only define Azure keys when you actively test Azure OpenAI flows.
- Never commit secrets or participant data—use `attachments/` for sanitized assets and redact learner information before uploading.
- When sharing logs, strip prompt content that may include private course material; prefer referencing filenames (`templates/code-review.txt`) and line numbers instead.
