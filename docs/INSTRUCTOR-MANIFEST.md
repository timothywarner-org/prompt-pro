# Instructor Manifest: How to Prompt Like a Pro

Quick navigation guide for delivering the 4-segment O'Reilly Live Learning course.

**Total Duration:** 4 × 50 minutes (with Q&A breaks)

---

## Pre-Flight Checklist

### Accounts to Have Open

- [ ] Microsoft 365 Copilot (with Notebooks access)
- [ ] ChatGPT Plus (logged in, Project ready)
- [ ] Google Gemini Advanced
- [ ] Claude Pro (with a Project set up)
- [ ] GitHub (with Copilot subscription)
- [ ] VS Code with GitHub Copilot extension

### Demo Files Ready

- Sample documents for Notebook demos (quarterly reports, proposals)
- Code screenshots for vision demos
- Sample repo with `.github/copilot-instructions.md`
- MCP weather server in `segments/segment-4-agentic-orchestration/mcp-demos/`

---

## Segment 1: Core Prompting & Context Engineering

**File:** [segments/segment-1-identity-mindset-context/README.md](segments/segment-1-identity-mindset-context/README.md)

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Intro: Prompt Engineering → Context Engineering | Show the comparison table |
| 5-10 | Context Engineering Stack | Walk through 6 layers |
| 10-15 | CRAFT & CLEAR Frameworks | Live demo: build a prompt together |
| 15-25 | Scenarios WITHOUT Context (1-5) | Run 2-3 prompts live in M365/ChatGPT/Gemini |
| 25-40 | Scenarios WITH Context (6-10) | Demo M365 Notebook with uploaded docs |
| 40-45 | Platform-Specific Tips | Quick tour of each platform's context features |
| 45-50 | Q&A + Hands-on time | Attendees try CRAFT on their own task |

### Key Demos to Prepare

1. **M365 Copilot Notebook**: Pre-load 3-5 quarterly reports, demo cross-document synthesis
2. **ChatGPT Project**: Show custom instructions + file upload workflow
3. **Gemini**: Show 1M token context handling with large document

### Talking Points

- "Most AI failures aren't model failures - they're context failures"
- Warner's Laws: "Anything you leave out will be inferred"
- Show the difference: same prompt, with vs. without context grounding

---

## Segment 2: Multimodal Prompting & AI-Assisted Coding

**File:** [segments/segment-2-context-sculpting-technique/README.md](segments/segment-2-context-sculpting-technique/README.md)

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Image Generation Landscape | Show comparison table |
| 5-15 | Image Gen Demos | Create same image in Gemini, M365 Designer, DALL-E |
| 15-25 | Vision Prompting | Analyze chart screenshot, code screenshot |
| 25-35 | GitHub Copilot Configuration | Show copilot-instructions.md, prompt files |
| 35-45 | Prompt File Workflow | Create and use a `.prompt.md` file live |
| 45-50 | Q&A + Hands-on | Attendees set up their own instruction file |

### Key Demos to Prepare

1. **Image Generation**: Same prompt ("team collaborating in modern office") across 3 tools
2. **Vision**: Upload a chart image, extract data to markdown table
3. **GitHub Copilot**: Show a repo with `.github/copilot-instructions.md` and demo the `#` prompt menu

### Talking Points

- Text-in-image: Gemini Imagen 4 wins for accuracy
- Vision analysis saves hours of manual data extraction
- Copilot instruction files = context engineering for code

---

## Segment 3: AI Workspaces - Notebooks, Projects, and Custom Assistants

**File:** [segments/segment-3-workflow-multimodal-security/README.md](segments/segment-3-workflow-multimodal-security/README.md)

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | AI Workspace Landscape | Show platform comparison table |
| 5-15 | M365 Copilot Notebooks | Demo 100-file analysis, Audio Overview |
| 15-25 | ChatGPT Projects | Create project, add files, set custom instructions |
| 25-30 | Claude Projects | Show long-document analysis |
| 30-35 | Gemini Gems | Create a simple Gem live |
| 35-45 | Custom GPTs & M365 Agents | Show configuration examples |
| 45-50 | Q&A + Comparison discussion | When to use what? |

### Key Demos to Prepare

1. **M365 Notebook**: Pre-loaded with 5+ documents, show Audio Overview generation
2. **ChatGPT Project**: Create "Marketing Campaign" project with custom instructions
3. **Gemini Gem**: Create "Writing Editor" gem with style preferences
4. **Custom GPT**: Show the Contract Review Assistant configuration

### Talking Points

- Notebooks = analysis power; Projects = workflow continuity
- Custom instructions are the secret weapon for consistency
- M365 Agents can orchestrate multi-step enterprise workflows

### Sample Knowledge Files

- `segments/segment-3-workflow-multimodal-security/knowledge/choose-an-agile-approach/` - Use this as example content for Notebook demo

---

## Segment 4: Agentic AI - Autonomous Coding and Enterprise Agents

**File:** [segments/segment-4-agentic-orchestration/README.md](segments/segment-4-agentic-orchestration/README.md)

### Teaching Flow (50 min)

| Time | Topic | Demo/Activity |
|------|-------|---------------|
| 0-5 | Agentic AI Landscape | Show comparison table |
| 5-15 | Claude Code | Demo feature development, show checkpoints |
| 15-25 | GitHub Copilot Coding Agent | Show issue assignment, track agent session |
| 25-35 | Copilot Studio Agents | Walk through Sales Assistant config |
| 35-42 | MCP Overview | Show weather server demo |
| 42-50 | Course Wrap-up + Q&A | Key takeaways, next steps |

### Key Demos to Prepare

1. **Claude Code**: Run `claude "Add a simple feature..."` in terminal, show checkpoint/rewind
2. **GitHub Copilot Agent**: Have an issue ready to assign to @copilot (or show session view)
3. **MCP Server**: Weather server in `segments/segment-4-agentic-orchestration/mcp-demos/weather-server/`

### Talking Points

- Claude Code = terminal-first, sandboxed, checkpoint safety
- GitHub Copilot Agent = cloud-based, issue-driven, validates with your tests
- MCP = the standard for persistent AI memory (Anthropic + Microsoft)

### MCP Demo Setup

```bash
cd segments/segment-4-agentic-orchestration/mcp-demos/weather-server
npm install
# Then restart VS Code to load MCP config
```

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

"Now that you understand how to engineer context in your prompts, let's go beyond text. We'll see how these same principles apply to images and code."

### After Segment 2 → 3

"You've seen how to prompt for images and configure Copilot. Now let's build persistent workspaces that remember your context across sessions."

### After Segment 3 → 4

"You've mastered workspaces and custom assistants. Now let's hand over the wheel entirely - autonomous agents that work while you focus elsewhere."

---

## Emergency Backup Demos

If a live demo fails:

1. **Screenshots**: Keep screenshots of successful outputs in a backup folder
2. **Recorded clips**: 30-second screen recordings of key workflows
3. **Participant interaction**: "Let's have someone in the audience try this..."

---

## Post-Course Resources to Share

- This repository URL
- [Anthropic Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [GitHub Copilot Custom Instructions Docs](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

---

*Good luck with the delivery! Remember: Start simple, show real results, let them try it themselves.*
