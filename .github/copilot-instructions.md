# prompt-pro AI Guidance

## Purpose & Scope

- Main deliverable is the Node demo in [src/index.js](src/index.js) showcasing prompt templates via PromptManager and AIClient
- Supporting course material lives under [segments](segments), [resources](resources), and [attachments](attachments); keep edits non-destructive
- Duplicate demo lives in [prompt-template-demo](prompt-template-demo) for standalone use; mirror patterns when adding features

## Core Node App

- Uses ES modules throughout; export classes/functions explicitly and import with file extensions
- Prompt orchestration flows: validate config → construct prompts → call OpenAI; follow existing call chain before adding new entrypoints
- Templates are plain text files in [templates](templates); keep naming kebab-case without extensions when referencing in code

## Runtime Configuration

- Env vars loaded via dotenv in [src/config.js](src/config.js); copy env.example to .env and set OPENAI_API_KEY before running
- Azure OpenAI fields are optional but wired through config.azure; guard new code against missing azure settings
- Retain config validation so missing OPENAI_API_KEY exits immediately; extend validateConfig when introducing new required settings

## Development Workflow

- Install deps with `npm install`; run the demo with `npm start`, watch mode with `npm run dev`, tests with `npm test`
- Node 18+ is enforced by package.json engines; prefer language features compatible with that baseline
- When scripting data transformations, keep helpers in their language-specific folders (e.g., Python utilities in [resources](resources) or [knowledge](knowledge))

## Prompt Templates & Context

- PromptManager in [src/promptManager.js](src/promptManager.js) caches templates via Map; reuse loadTemplate instead of manual fs reads
- Context is stored as Map entries merged into template variables; clear or override keys explicitly to avoid stale data
- manageConversationHistory trims from newest messages first; rely on it for long chats instead of mutating history arrays directly

## Testing & Quality

- [src/test.js](src/test.js) exercises template loading, substitution, context merge; add cases here when introducing new template features
- Tests avoid external API calls, so they can run without OpenAI credentials; keep future tests deterministic
- Logging follows emoji-prefixed messages in existing demos; stay consistent for readability during live sessions

## Extended Materials

- Large CSV datasets in [attachments](attachments) support workshop exercises; do not rewrite them unless updating official course material
- Slide extraction scripts like [resources/convert_ppt.py](resources/convert_ppt.py) expect python-pptx; document extra tooling when expanding them
- High-level prompting guidance resides in [context-engineering.md](context-engineering.md); align new documentation with its terminology
