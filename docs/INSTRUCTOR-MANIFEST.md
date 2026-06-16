# Instructor Manifest: How to Prompt Like a Pro

Quick navigation guide for delivering the 4-segment O'Reilly Live Learning course.

**Total Duration:** 4 × 50 minutes (with Q&A breaks)

**Delivery date:** June 2026

The course is organized around **Warner's 26 Laws of Generative AI**, split 7-7-8-4 across the
four segments. Every segment uses the **Contoso Robotics** scenario (500-employee robotics
manufacturer, $120M revenue, Austin TX, CEO Maria Chen, founded 2018, expanding into healthcare
logistics). Keep the fiction consistent live.

---

## Pre-Flight Checklist

### Accounts to Have Open

- [ ] Microsoft 365 Copilot (with Notebooks access)
- [ ] ChatGPT Plus (logged in, Project ready)
- [ ] Google Gemini Advanced
- [ ] Claude Pro (with a Project set up)
- [ ] GitHub (with Copilot subscription)
- [ ] VS Code with GitHub Copilot extension
- [ ] Copilot Studio (for the segment 4 customer-support agent)

### Demo Files Ready

- Contoso scenario data (per-segment `data/` folders) loaded and skimmed
- Code/chart screenshots for any vision moments
- Sample repo with `.github/copilot-instructions.md`
- MCP weather server in `segments/segment-4-agentic-orchestration/mcp-demos/weather-server/`
  installed (`npm install`) and inspectable

---

## Segment 1: Identity, Mindset & Context Foundations

**File:** [../segments/segment-1-identity-mindset-context/README.md](../segments/segment-1-identity-mindset-context/README.md)

**Laws 1-7:** pilot/co-pilot, identity awareness, the anchor trap, trust your gut,
prompt smell, context disclosure, inference from omission.

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Welcome + you are the pilot, AI is the co-pilot (Laws 1-2) | Set the mindset; show the 26 Laws map |
| 5-15 | Identity awareness + the anchor trap (Laws 2-3) | identity-awareness-checklist.md |
| 15-25 | Trust your gut + prompt smell (Laws 4-5) | Spot a bad answer live; anchor-trap-exercise.md |
| 25-40 | Context disclosure + inference from omission (Laws 6-7) | context-vs-no-context.md with Contoso data |
| 40-45 | Platform context features tour | Where each tool takes context (files, projects) |
| 45-50 | Q&A + hands-on | Attendees run a with/without-context comparison |

### Key Demos to Prepare

1. **anchor-trap-exercise.md** - show how a leading number anchors the model's estimate
2. **context-vs-no-context.md** - same Contoso question, with and without the company profile
3. **identity-awareness-checklist.md** - have learners self-assess pilot vs. passenger habits

### Scenario Data

- `data/contoso-company-profile.md` - source of truth for the Contoso fiction
- `data/contoso-q1-2026-sales-summary.csv` - grounding data for context demos

### Talking Points

- "You are the pilot - the model is the co-pilot, never the other way round."
- Warner's Law: "Anything you leave out will be inferred."
- Most AI failures are context failures, not model failures.

---

## Segment 2: Context Sculpting & Prompting Technique

**File:** [../segments/segment-2-context-sculpting-technique/README.md](../segments/segment-2-context-sculpting-technique/README.md)

**Laws 8-14:** surgical context sculpting, role-play directing, task decomposition,
few-shot, chain-of-thought, meta-prompting, strike while the iron's hot.

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | From disclosure to sculpting (Law 8) | Trim a bloated prompt to its load-bearing parts |
| 5-15 | Role-play directing + task decomposition (Laws 9-10) | role-play-director.md |
| 15-25 | Few-shot prompting (Law 11) | few-shot-showdown.md (zero vs. few-shot) |
| 25-35 | Chain-of-thought (Law 12) | chain-of-thought-budget.md on the R&D budget |
| 35-45 | Meta-prompting (Law 13) + strike while it's hot (Law 14) | meta-prompting-loop.md |
| 45-50 | Q&A + hands-on | Attendees sculpt a prompt for their own task |

### Key Demos to Prepare

1. **few-shot-showdown.md** - zero-shot vs. few-shot on a Contoso classification task
2. **chain-of-thought-budget.md** - reason step-by-step over the R&D budget numbers
3. **meta-prompting-loop.md** - have the model improve its own prompt
4. **role-play-director.md** - direct the model into a specific expert role

### Scenario Data

- `data/contoso-rd-budget-2026.csv` - figures for the chain-of-thought demo
- `data/contoso-product-brief-template.md` - structure for few-shot / role-play output

### Talking Points

- Context sculpting is surgical: add what's load-bearing, cut what isn't.
- Few-shot teaches format; chain-of-thought teaches reasoning - know which you need.
- Meta-prompting: the model is a good editor of its own prompts.

---

## Segment 3: Workflow, Multimodal & Security

**File:** [../segments/segment-3-workflow-multimodal-security/README.md](../segments/segment-3-workflow-multimodal-security/README.md)

**Laws 15-22:** custom instructions, refactoring instructions, prompt versioning,
voice input, technical writing, cross-referencing LLMs, abuse protection, privacy.

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Workflow landscape | Where custom instructions live per platform |
| 5-15 | Custom instructions + refactoring them (Laws 15-16) | custom-instructions-lifecycle.md (v1 bloat → v2 clean) |
| 15-25 | Prompt versioning + voice/tech writing (Laws 17-19) | prompt-versioning-exercise.md |
| 25-35 | Cross-referencing LLMs (Law 20) | cross-reference-exercise.md |
| 35-45 | Abuse protection + privacy (Laws 21-22) | privacy-audit-walkthrough.md on sensitive sample |
| 45-50 | Q&A + discussion | When to trust one model vs. cross-check |

### Key Demos to Prepare

1. **custom-instructions-lifecycle.md** - compare the bloated v1 to the clean v2
2. **prompt-versioning-exercise.md** - treat prompts as versioned artifacts
3. **cross-reference-exercise.md** - same question across two models, reconcile
4. **privacy-audit-walkthrough.md** - find and redact sensitive data before sending

### Scenario Data

- `data/contoso-custom-instructions-v1.txt` - deliberately bloated example
- `data/contoso-custom-instructions-v2.txt` - the clean, corrected version
- `data/contoso-weekly-status-template.md` - target for the versioning demo
- `data/contoso-sensitive-data-sample.md` - input for the privacy audit

### Talking Points

- Custom instructions are the highest-leverage consistency tool you have.
- Version your prompts - "what changed and why" matters at team scale.
- Privacy first: audit before you paste; never send what you can't expose.

---

## Segment 4: Agentic Orchestration & Resilience

**File:** [../segments/segment-4-agentic-orchestration/README.md](../segments/segment-4-agentic-orchestration/README.md)

**Laws 23-26:** LLM personality matching, subagent orchestration, checkpoint before
consequence, expect breaking changes.

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Agentic landscape | What "agent" means here; the four laws |
| 5-12 | LLM personality matching (Law 23) | llm-personality-test.md with the comparison rubric |
| 12-22 | Subagent orchestration (Law 24) | subagent-orchestration.md |
| 22-30 | Checkpoint before consequence (Law 25) | checkpoint-rewind-exercise.md |
| 30-40 | Enterprise agents + expect breaking changes (Law 26) | copilot-studio-agent.md (customer-support agent) |
| 40-47 | MCP overview | Live weather-server demo |
| 47-50 | Course wrap-up + Q&A | Key takeaways, next steps |

### Key Demos to Prepare

1. **llm-personality-test.md** - run one task across models, score with the rubric
2. **subagent-orchestration.md** - decompose a job across specialized subagents
3. **checkpoint-rewind-exercise.md** - checkpoint, take a risky step, rewind
4. **copilot-studio-agent.md** - walk through the Contoso **customer-support** agent config
5. **Live MCP server** - weather server in `mcp-demos/weather-server/`

### Scenario Data

- `data/contoso-llm-comparison-rubric.csv` - scoring grid for the personality test
- `data/contoso-agent-knowledge-base.md` - grounding for the customer-support agent
- `data/contoso-healthcare-market-brief.md` - context for the healthcare expansion

### MCP Demo Setup

```bash
cd segments/segment-4-agentic-orchestration/mcp-demos/weather-server
npm install
npm start        # run the server (node server.js)
npm run inspect  # launch MCP Inspector against the local server
```

### Talking Points

- Match the model to the job - personalities differ; the rubric makes it objective.
- Subagents: divide and conquer, then orchestrate.
- Checkpoint before anything consequential, and always expect breaking changes.
- MCP = the open standard for connecting AI to tools and data (Anthropic, adopted by Microsoft).

---

## Quick Reference: Tool Access Requirements

| Tool | Minimum Access |
|------|----------------|
| M365 Copilot + Notebooks | Microsoft 365 Copilot license |
| ChatGPT Projects | ChatGPT Free (Pro for full features) |
| Claude Projects | Claude Pro |
| Gemini Gems | Free Google account |
| GitHub Copilot | Copilot Individual/Business/Enterprise |
| GitHub Copilot Agent | Copilot Enterprise/Pro+/Business |
| Copilot Studio | M365 + Copilot Studio license |
| Claude Code | Claude Pro or API access |

---

## Segment Transitions

### After Segment 1 → 2

"You've seen that you are the pilot and that the model infers whatever you leave out. Now let's get
surgical - we'll sculpt context and apply specific techniques: role-play, few-shot, chain-of-thought,
and meta-prompting."

### After Segment 2 → 3

"You can now shape a single prompt with precision. Next we make it durable - custom instructions,
prompt versioning, cross-referencing models, and the security and privacy guardrails that keep you
safe at work."

### After Segment 3 → 4

"You've got a solid, secure workflow. Now we hand off real work - matching models to tasks,
orchestrating subagents, checkpointing before consequences, and staying resilient when the tools
break underneath you."

---

## Emergency Backup Demos

If a live demo fails:

1. **Screenshots**: Keep screenshots of successful outputs in a backup folder
2. **Recorded clips**: 30-second screen recordings of key workflows
3. **Participant interaction**: "Let's have someone in the audience try this..."

Per-segment fallbacks:

- **Seg 1**: walk the saved context-vs-no-context outputs side by side
- **Seg 2**: read through the few-shot-showdown transcript instead of running it
- **Seg 3**: diff the v1 and v2 custom-instructions files in the editor
- **Seg 4**: if the MCP server won't start, show `npm run inspect` output from a screenshot

---

## Post-Course Resources to Share

- This repository URL
- [Anthropic Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [GitHub Copilot Custom Instructions Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)

---

*Good luck with the delivery. Remember: start simple, show real results, let them try it themselves.*
