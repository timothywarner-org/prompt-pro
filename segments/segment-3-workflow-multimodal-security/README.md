# Segment 3: Workflow, Multimodal & Security

**Duration:** 50 minutes
**Level:** Intermediate
**Last Updated:** June 2026

## Segment Overview

This segment covers Warner's Laws 15 through 22, moving from foundational prompting into the operational concerns that separate casual users from professionals. Learners will practice writing and refining custom instructions, versioning their prompts, auditing AI privacy settings, and cross-referencing outputs across multiple LLMs.

## Warner's Laws Covered

| Law | Title | Key Concept |
|-----|-------|-------------|
| 15 | Custom Instructions | Persistent persona and context injection |
| 16 | Refactoring Instructions | Eliminating redundancy and contradiction |
| 17 | Prompt Versioning | Treating prompts as living, tracked artifacts |
| 18 | Voice Input | Dictation-to-prompt workflows |
| 19 | Technical Writing | Clarity, structure, and precision in prompts |
| 20 | Cross-Referencing LLMs | Triangulating accuracy across models |
| 21 | LLM Abuse Protection | Recognizing and resisting adversarial prompts |
| 22 | Privacy | Data retention, PII handling, and audit controls |

## Scenario: Contoso Robotics

All exercises use a shared fictional company:

- **Company:** Contoso Robotics
- **Size:** 500 employees, $120M annual revenue
- **Location:** Austin, TX
- **CEO:** Maria Chen
- **Industry:** Mid-size robotics manufacturer (warehouse and logistics automation)

## File Inventory

### Demos

| File | Description |
|------|-------------|
| `demos/custom-instructions-lifecycle.md` | Create a ChatGPT Project with v1 (bloated) and v2 (refactored) custom instructions |
| `demos/prompt-versioning-exercise.md` | Build a prompt library with 3 versioned iterations of a weekly status report prompt |
| `demos/privacy-audit-walkthrough.md` | Platform-by-platform privacy and data retention audit guide |
| `demos/cross-reference-exercise.md` | Compare the same factual question across ChatGPT, Claude, and Gemini |

### Data

| File | Description |
|------|-------------|
| `data/contoso-custom-instructions-v1.txt` | Deliberately bloated custom instructions (~400 words) for refactoring exercise |
| `data/contoso-custom-instructions-v2.txt` | Refactored custom instructions (~150 words) |
| `data/contoso-weekly-status-template.md` | Weekly status report template with sample Contoso data |
| `data/contoso-sensitive-data-sample.md` | Synthetic PII document for privacy demonstration (all data is fictional) |

### Knowledge (Retained)

The `knowledge/` subfolder contains agile methodology content (`choose-an-agile-approach/`) retained from prior course deliveries. It is not modified by this segment's exercises.

## Prerequisites

- ChatGPT Plus, Team, or Enterprise account (for Projects)
- Claude Pro account (for cross-referencing exercise)
- Google Gemini access (free tier is sufficient)
- Optional: Microsoft 365 Copilot license (for privacy audit walkthrough)
- A Git client (for prompt versioning exercise)

## Delivery Notes

- Start with the custom instructions lifecycle demo to establish the Contoso scenario.
- The privacy audit walkthrough works best as an instructor-led walkthrough with learners following along on their own accounts.
- The cross-reference exercise produces different results every time, which is the point -- use live outputs to drive discussion.
