# Contributing to Prompt Pro

Thanks for helping me (Tim Warner) keep this course repo polished and teachable. Every change should make it easier for learners to understand agentic AI patterns, reproduce demos, and adapt the content in their own orgs.

## Start Here

1. **Review the guides** – skim `README.md`, `AGENTS.md`, and `CODE_OF_CONDUCT.md` to understand expectations for instructors, agents, and students.
2. **Set up your env** – copy `env.example` to `.env`, add your OpenAI (or Azure OpenAI) keys, and run `npm install`.
3. **Pick an issue** – choose from the labeled teaching tasks (`good-first-lesson`, `curriculum-update`, `agent-demo`) or open a new issue that explains the instructional value.

## Workflow

1. Create a topic branch from `main` using a descriptive, kebab-case name (`feature-context-playbook`).
2. Make small, well-documented commits that explain the learner benefit (e.g., `add retry demo for lesson 4`).
3. Run `npm test` plus any scenario-specific scripts, and document manual demo steps when automation is not possible.
4. Open a pull request that includes:
   - Purpose and lesson/segment affected
   - Screenshots or transcript snippets if UX/content changed
   - Test evidence (`npm test`, `node src/index.js`, etc.)
   - Any follow-up work for assistants or facilitators

## Quality Checklist

- Content follows the two-space indentation/camelCase conventions from `src/`.
- Templates live in `templates/` and are referenced by their stem names.
- Docs call out teaching tips, prerequisites, and risk considerations.
- Secrets never land in git history; use `.env` and redact workshop artifacts.

## Reporting Issues & Asking Questions

Open an issue using the templates or email me directly at `tim@techtrainertim.com` when you need an expedited response (e.g., live session blockers). Please include reproduction steps, expected outcome, and any teaching implications.

## Code of Conduct

Participation means you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). We are modeling professional, inclusive collaboration for every learner who opens this repo.
