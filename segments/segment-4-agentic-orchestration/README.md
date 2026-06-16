# Segment 4: Agentic Orchestration & Resilience

**Duration:** 50 minutes
**Level:** Advanced
**Last Updated:** June 2026

## Warner's Laws Covered

| Law | Title | Core Idea |
|-----|-------|-----------|
| 23 | LLM Personality Matching | Different models have different strengths; match the model to the task |
| 24 | Subagent Orchestration | Parallel subagents dramatically reduce cycle time for complex workflows |
| 25 | Checkpoint Before Consequence | Always create a rewind point before any high-risk operation |
| 26 | Expect Breaking Changes | Agentic tooling evolves fast; build for adaptability, not permanence |

## Scenario: Contoso Robotics

All exercises use a shared fictional company:

- **Company:** Contoso Robotics
- **Size:** 500 employees, $120M annual revenue
- **HQ:** Austin, TX
- **CEO:** Maria Chen
- **Products:** WarehouseBot Pro, WarehouseBot Lite, LogiMover 500
- **Strategic Goal:** Evaluate entry into the healthcare logistics robotics market

## File Inventory

### Demos

| File | Law | Description |
|------|-----|-------------|
| `demos/llm-personality-test.md` | 23 | Send the same Contoso prompt to ChatGPT, Claude, and Gemini; score outputs with a rubric |
| `demos/subagent-orchestration.md` | 24 | Parallel subagent walkthrough in Claude Code: security review, test generation, and doc updates |
| `demos/checkpoint-rewind-exercise.md` | 25 | Risky refactor with checkpoint and rewind in Claude Code |
| `demos/copilot-studio-agent.md` | 26 | Build a Contoso customer support agent in Microsoft Copilot Studio |

### Data

| File | Purpose |
|------|---------|
| `data/contoso-llm-comparison-rubric.csv` | Scoring rubric CSV for the LLM personality test |
| `data/contoso-agent-knowledge-base.md` | Knowledge base document for Copilot Studio upload |
| `data/contoso-healthcare-market-brief.md` | Grounding document for the healthcare logistics prompt |

### Live Demo

| Folder | Description |
|--------|-------------|
| `mcp-demos/` | Working MCP weather server used for the live Model Context Protocol demo (see its own README for setup) |

## Prerequisites

- Claude Pro or API access (for Claude Code exercises)
- ChatGPT Plus or Team account
- Google Gemini Advanced
- Microsoft 365 with Copilot Studio license (for the Copilot Studio exercise)
- Git installed locally

## Quick Start

1. Read `data/contoso-healthcare-market-brief.md` to understand the scenario context.
2. Open the demo files in order (Laws 23 through 26).
3. Use `data/contoso-llm-comparison-rubric.csv` to score outputs from the LLM personality test.
4. Upload `data/contoso-agent-knowledge-base.md` as a knowledge source in Copilot Studio.
