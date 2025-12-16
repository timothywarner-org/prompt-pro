# How to Prompt Like a Pro: Master AI for Business Innovation

[![Website](https://img.shields.io/badge/Website-TechTrainerTim.com-blue?style=for-the-badge)](https://techtrainertim.com)
[![GitHub](https://img.shields.io/badge/GitHub-timothywarner-181717?style=for-the-badge&logo=github)](https://github.com/timothywarner)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-timothywarner-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/timothywarner/)

<img src="images/cover.png" alt="How to Prompt Like a Pro Course Cover" width="450"/>

An **O'Reilly Live Learning** course teaching business professionals how to extract maximum value from AI tools like Microsoft 365 Copilot, ChatGPT, Claude, and Google Gemini.

*Last updated: December 2025*

---

## Course Segments

| # | Segment | Duration | Key Topics |
|---|---------|----------|------------|
| 1 | [**Core Prompting & Context Engineering**](segments/segment-1-core-prompting/) | 50 min | CRAFT/CLEAR frameworks, context engineering stack, with/without context scenarios |
| 2 | [**Multimodal Prompting & AI-Assisted Coding**](segments/segment-2-multimodal-prompting/) | 50 min | Imagen 3, DALL-E 3, vision analysis, GitHub Copilot instruction files |
| 3 | [**AI Workspaces & Custom Assistants**](segments/segment-3-ai-notebooks/) | 50 min | M365 Notebooks, ChatGPT Projects, Gemini Gems, Custom GPTs, M365 Agents |
| 4 | [**Agentic AI & Autonomous Coding**](segments/segment-4-agentic-ai/) | 50 min | Claude Code, GitHub Copilot Coding Agent, Copilot Studio, MCP |

---

## Warner's Laws of Generative AI Prompting

1. You are the pilot; the AI is your co-pilot. You're responsible for its actions.
2. Always know who you're signed in as and who you're chatting with.
3. The more you disclose about yourself in trust, the more the AI can help you.
4. Anything you leave out of your prompt will be inferred by the AI.
5. Role play like you're a director.
6. Don't swallow the elephant—break down complex tasks with the AI.
7. Surgically sculpt your context. Just because you can doesn't mean you should.
8. Always have a trusted LLM to cross-reference responses.
9. Strike while the iron's hot.
10. Every AI chat has its own lifecycle; develop your "prompt smell."
11. If you need to remind the AI of something, add it to custom instructions.
12. Periodically refactor your custom instructions and memories.
13. Think meta: Prompt about prompting and custom instructions.
14. Use your voice if using your words is difficult.
15. Pick up a good book on technical writing essentials.
16. Protect your LLM against abuse by integrating test prompts.
17. Each LLM (and vendor) has its own priorities and personality.
18. Expect breaking changes. Stay agile, adaptable, and be an eternal learner.

---

## Context Engineering vs Prompt Engineering

| Prompt Engineering | Context Engineering |
|---|---|
| Focus on *what to say* | Focus on *what the model knows* |
| One-off interactions | System-wide reliability |
| Phrasing and examples | Everything in the context window |

**Key Insight:** Most AI failures aren't model failures—they're context failures.

---

## Tools Covered

### Primary Platforms
- **Microsoft 365 Copilot** — Notebooks, Agents, enterprise integration
- **ChatGPT** — Projects, Custom GPTs, DALL-E 3, Vision
- **Google Gemini** — Gems, Imagen 3, 1M+ token context
- **Claude** — Projects, long-form analysis, Claude Code

### Agentic AI
- **Claude Code** — Terminal-based autonomous coding with checkpoints
- **GitHub Copilot Coding Agent** — Issue-to-PR cloud automation
- **M365 Copilot Studio** — Enterprise multi-agent orchestration

---

## Prerequisites

### Required
- Internet connection
- ChatGPT free account
- Google account

### Recommended
- Microsoft 365 Copilot license
- Claude Pro
- GitHub Copilot subscription
- VS Code

---

## Quick Start

### CRAFT Framework
```text
Context: [situation]
Role: You are a [role]
Action: [task]
Format: [output format]
Tone: [voice/style]
```

### Example Prompt
```text
Context: I'm preparing a quarterly business review for my VP.
Role: You are a senior business analyst.
Action: Analyze this sales data and identify the top 3 trends.
Format: Executive summary with bullet points, max 200 words.
Tone: Professional and data-driven.
```

---

## Repository Structure

```
docs/                               # Reference guides + slide deck
images/                             # Cover art, social preview assets
segments/
├─ segment-1-core-prompting/        # Frameworks, scenarios, platform tips
├─ segment-2-multimodal-prompting/  # Image gen, vision, Copilot config
├─ segment-3-ai-notebooks/          # Workspaces, custom assistants
└─ segment-4-agentic-ai/            # Claude Code, agents, MCP demos
.github/                            # Issue templates, workflows, AI instructions
```

**For instructors:** See [INSTRUCTOR-MANIFEST.md](INSTRUCTOR-MANIFEST.md) for delivery guide.  
**For agents:** Review [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) before editing lessons.

---

## Resources

- [Anthropic Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

---

## License & Contributing

Licensed under [MIT](LICENSE). See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and [AGENTS.md](AGENTS.md) for the agent-focused repository playbook.

### Code of Conduct
Participation in this project is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).

### Security
Found a vulnerability or risky prompt scenario? Follow the disclosure steps in [SECURITY.md](SECURITY.md) or email Tim directly at `tim@techtrainertim.com`.

---

## Repo Guides & Automation

- [AGENTS.md](AGENTS.md) - Contributor playbook
- [CLAUDE.md](CLAUDE.md) - Copilot instructions
- [INSTRUCTOR-MANIFEST.md](INSTRUCTOR-MANIFEST.md) - Run-of-show notes
- [markdownlint.json](markdownlint.json) & [Markdownlint workflow](.github/workflows/markdownlint-autofix.yml) - spacing rules + one-click lint/autofix

---

**Ready to prompt like a pro? Let's transform how you work with AI!**
