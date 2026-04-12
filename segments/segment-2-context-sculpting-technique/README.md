# Segment 2: Context Sculpting Technique

**Duration:** 50 minutes | **Level:** Intermediate | **Last Updated:** April 2026

## What You Will Learn

This segment covers Warner's Laws 8-14 -- the craft of shaping context so that any LLM produces sharper, more reliable output on the first try.

| Law | Title | Core Idea |
|-----|-------|-----------|
| 8 | Surgical Context Sculpting | Give the model exactly the context it needs -- no more, no less. |
| 9 | Role-Play Directing | Assign a specific persona with stakes and accountability. |
| 10 | Task Decomposition | Break complex asks into discrete, ordered steps. |
| 11 | Few-Shot Examples | Show the model what "good" looks like before asking it to produce. |
| 12 | Chain-of-Thought | Ask the model to reason step by step so it catches its own errors. |
| 13 | Meta-Prompting | Use the model to critique and improve your own prompts. |
| 14 | Strike While the Iron Is Hot | Iterate in the same session while context is fresh. |

---

## Scenario: Contoso Robotics

All demos use a single fictional company so learners can focus on technique, not backstory.

- **Company:** Contoso Robotics
- **Size:** 500 employees, $120 M annual revenue
- **HQ:** Austin, TX
- **CEO:** Maria Chen
- **Products:** WarehouseBot Pro, WarehouseBot Lite, LogiMover 500
- **Strategic initiative:** Expanding into healthcare logistics

---

## File Inventory

### Demos

| File | Law(s) | What Learners Do |
|------|--------|------------------|
| `demos/few-shot-showdown.md` | 11 | Compare zero-shot vs. few-shot product briefs side by side. |
| `demos/chain-of-thought-budget.md` | 12 | Allocate an $8 M R&D budget with and without chain-of-thought. |
| `demos/meta-prompting-loop.md` | 13, 14 | Use Gemini to critique and improve a mediocre prompt, then re-run. |
| `demos/role-play-director.md` | 9 | Run three versions of a supply-chain risk review with escalating role specificity. |

### Data

| File | Purpose |
|------|---------|
| `data/contoso-rd-budget-2026.csv` | R&D budget data for the chain-of-thought demo. |
| `data/contoso-product-brief-template.md` | House-style product brief template for the few-shot demo. |

---

## How to Use These Materials

1. Open the demo file for the law you are teaching.
2. Have learners run **Version A** first and capture the output.
3. Then run **Version B** (or C) and compare.
4. Discuss what changed and why, referencing the relevant law.

Data files in `data/` can be pasted directly into a chat window or uploaded as attachments depending on the tool.
