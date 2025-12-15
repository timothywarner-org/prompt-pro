# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the O'Reilly Live Learning course "How to Prompt Like a Pro" - a training repository teaching prompt engineering for business professionals. It contains a Node.js prompt template demo and course curriculum organized into 4 segments.

## Commands

```bash
npm install          # Install dependencies (Node 18+ required)
npm start            # Run the prompt template demo
npm run dev          # Watch mode for development
npm test             # Run tests (src/test.js)
```

## Environment Setup

Copy `env.example` to `.env` and set `OPENAI_API_KEY`. Azure OpenAI fields are optional.

## Architecture

### Node.js Demo (`src/`)

The demo showcases prompt templates via three core modules:

- **config.js** - Environment configuration with validation; exits if `OPENAI_API_KEY` is missing
- **promptManager.js** - `PromptManager` class handles template loading, `{{variable}}` substitution, and context management via Map
- **aiClient.js** - `AIClient` class handles OpenAI/Azure API calls with conversation history
- **index.js** - `PromptTemplateDemo` orchestrates demos (code review, email composition, technical writing)

Data flow: validate config → load template → substitute variables + merge context → call OpenAI

### Templates (`templates/` and `segments/segment-1-core-prompting/templates/`)

Plain text files with `{{variable}}` placeholders. Reference by kebab-case filename stem without extension (e.g., `buildPrompt('code-review')` loads `templates/code-review.txt`).

### Course Segments (`segments/`)

- **segment-1-core-prompting/** - Core prompting skills, context engineering concepts
- **segment-2-multimodal-prompting/** - Visual AI prompting, contains duplicate demo
- **segment-3-ai-notebooks/** - NotebookLM, ChatGPT, Claude workflows
- **segment-4-agentic-ai/** - MCP, RAG, autonomous agents

## Coding Conventions

- ES modules with explicit imports including file extensions
- Two-space indentation
- camelCase for functions/variables, PascalCase for exported classes (`PromptManager`, `AIClient`)
- Emoji-prefixed console logging for demo output
- Tests avoid external API calls - keep them deterministic

## Key Patterns

- Use `PromptManager.loadTemplate()` for template loading (caches via Map)
- Context stored as Map entries merged into template variables; clear/override keys explicitly
- `manageConversationHistory()` trims from newest messages first for token limits
- Mirror patterns when adding features to duplicate demo in `segments/segment-2-multimodal-prompting/prompt-template-demo/`

## Course Content

Curriculum files under `segments/`, `docs/`, and `resources/` are course materials - avoid destructive edits unless updating official content. Large CSV datasets in `attachments/` support workshop exercises.
