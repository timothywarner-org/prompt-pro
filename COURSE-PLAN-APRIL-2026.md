# Course Plan: How to Prompt Like a Pro — April 2026

**Format:** 4 × 50-min segments, O'Reilly Live Learning
**Delivery date:** April 2026

---

## Segment 1: Identity, Mindset & Context Foundations

**Laws covered:** 1-7

1. You are the pilot; the AI is your co-pilot
2. Always know who you're signed in as
3. Beware the anchor trap — draft before you prompt
4. Trust your gut — never hesitate to second-guess the AI
5. Every AI chat has its own lifecycle (prompt smell)
6. The more you disclose in trust, the more the AI can help
7. Anything you leave out will be inferred

**Demos:**
- Anchor trap live: audience writes their answer to a business question on paper, THEN we prompt ChatGPT — compare drift
- Same prompt in ChatGPT vs Claude vs Gemini: show how omitted context produces three different inferences
- M365 Copilot: show identity/tenant boundaries — same prompt, different signed-in user, different results

---

## Segment 2: Context Sculpting & Prompting Technique

**Laws covered:** 8-14

8. Surgically sculpt your context
9. Role play like you're a director
10. Don't swallow the elephant
11. Show, don't tell — lead with examples
12. Make the AI show its work
13. Think meta — prompt about prompting
14. Strike while the iron's hot

**Demos:**
- Few-shot showdown: zero-shot vs 3-example prompt for the same report format in ChatGPT — side by side
- Chain-of-thought: ask Claude to analyze a budget with and without "think step by step" — compare error rates
- Meta-prompting loop: paste a rough prompt into Gemini, ask it to critique and improve, run the improved version

---

## Segment 3: Workflow, Multimodal & Security

**Laws covered:** 15-22

15. If you need to remind the AI, add it to custom instructions
16. Periodically refactor your custom instructions
17. Treat prompts as assets — version-control them
18. Use your voice if using words is difficult
19. Pick up a good book on technical writing
20. Always have a trusted LLM to cross-reference
21. Protect your LLM against abuse
22. Protect privacy ruthlessly

**Demos:**
- Custom instructions lifecycle: create a ChatGPT Project with custom instructions, refactor them live after a few turns
- Prompt versioning: show a prompt library in a GitHub repo — diff two versions, show how model updates broke v1
- Voice + vision: dictate a task into Gemini, upload a chart screenshot into Claude, extract data hands-free
- Privacy audit: show what ChatGPT/Gemini/Copilot store vs delete — walk through each platform's data settings

---

## Segment 4: Agentic AI, Orchestration & Resilience

**Laws covered:** 23-26

23. Each LLM has its own personality — match the tool to the task
24. Orchestrate subagents as force multipliers
25. Checkpoint before consequence
26. Expect breaking changes

**Demos:**
- LLM personality test: same complex task across ChatGPT, Claude, Gemini — show strengths/weaknesses live
- Claude Code: spin up parallel subagents with git worktrees to refactor, test, and review simultaneously
- Checkpoint rewind: make a risky change in Claude Code, show checkpoint/rollback in real time
- Copilot Studio: build a simple multi-agent workflow with a knowledge source in Foundry
- MCP weather server: run the live demo from `segments/segment-4-agentic-orchestration/mcp-demos/weather-server/`

---

*26 laws, 4 segments, maximum impact. Teach it live.*
