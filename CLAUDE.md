# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Course Overview

This repository contains materials for "How to Prompt Like a Pro" - an O'Reilly Live Learning course taught by Tim Warner. The course is designed for business professionals to master AI prompting techniques for tools like ChatGPT, Claude, Microsoft 365 Copilot, Google Gemini, and more.

### Critical Course Requirements

The course must deliver 100% on the following promises from the O'Reilly sell page:
- Practical techniques to immediately boost business results with generative AI
- Improve AI outputs including content, data, and insights  
- Hands-on practice with today's leading AI tools
- Coverage applicable to any industry or job role

## Course Structure

The course consists of 4 segments (~50 minutes each):

1. **Core Prompting Skills** - Essential techniques, common pitfalls, reusable prompt recipes
2. **Multimodal Prompting** - Visual AI (ChatGPT Vision, Sora, Midjourney), marketing materials
3. **AI Notebooks** - NotebookLM, ChatGPT, Claude for analysis and reporting
4. **Advanced/Agentic AI** - Automation tools (GitHub Copilot, Cursor, Windsurf, Cline), RAG, and **MCP (Model Context Protocol)**

## MCP Coverage Requirements

**CRITICAL**: Segment 4 requires extensive MCP (Model Context Protocol) coverage. Based on Tim's MCP proposal in `/tim/mcp-proposal.md`, ensure demos include:
- MCP fundamentals and why it solves context persistence
- Live deployment of MCP servers
- GitHub integration as long-term memory
- Azure deployment patterns
- Connection to VS Code, Claude, ChatGPT, and Copilot
- Multi-agent orchestration through MCP

## Demo Requirements

The course will be taught primarily through hands-on demos using:
- **Primary tools**: ChatGPT (mostly), M365 Copilot, Google Gemini
- **Additional tools**: Claude, Perplexity, Azure OpenAI
- **MCP tools**: MCP Inspector, Claude Desktop, VS Code extensions

## Code Architecture

```
/segments/           # Course segment materials and demos
  segment-1-core-prompting/
  segment-2-multimodal-prompting/
  segment-3-ai-notebooks/
  segment-4-agentic-ai/
/resources/          # Prompt frameworks, examples, guides
/tim/               # Instructor materials and course proposals
```

## Development Guidelines

### When Creating Demos
1. Ensure demos are business-focused, not technical/coding heavy
2. Keep demos under 5 minutes for engagement
3. Include examples from multiple industries (healthcare, legal, government, business)
4. Test all demos with free tier accounts when possible

### When Adding Content
1. Follow existing prompt framework patterns in `/resources/frameworks.md`
2. Use real-world examples that business professionals can relate to
3. Avoid nested bullet points in documentation (O'Reilly platform limitation)
4. Include interactive Q&A time in each segment

### MCP Demo Setup
For Segment 4 MCP demonstrations, ensure:
- Node.js 20+ and Python 3.11+ compatibility
- Azure deployment scripts are tested
- GitHub integration works with personal access tokens
- Memory patterns (episodic vs semantic) are clearly demonstrated

## Testing Requirements

Before course delivery:
1. Verify all demos work with current AI tool versions
2. Test with free/trial accounts where possible
3. Confirm MCP servers deploy successfully to Azure
4. Validate GitHub-MCP-AI tool chain works end-to-end

## Important Files

- `/README.md` - Main course description and setup
- `/tim/mcp-proposal.md` - Detailed MCP course content requirements
- `/tim/oreilly-sell-page.md` - Course promises to fulfill
- `/resources/frameworks.md` - Prompt frameworks to reference
- `/resources/examples/real-world-prompts.md` - Example prompts for demos

## Course Delivery Notes

### Audience
- Business professionals with basic AI tool familiarity
- No coding background required
- Regular users of ChatGPT, Copilot, or similar tools

### Prerequisites
- Basic familiarity with ChatGPT or similar tools
- Google account for free AI service signups
- For MCP segment: GitHub account, Azure access (free tier OK)

### Tools Required
- ChatGPT (required - free account minimum)
- Google Gemini, NotebookLM, Claude, Midjourney (optional)
- For MCP: VS Code, Node.js/Python, Azure CLI

## Support Resources

### Recommended Preparation
- "Quick Start Guide to Large Language Models" by Sinan Ozdemir
- "The AI Revolution in Medicine: GPT-4 and Beyond"

### Follow-up Resources
- "Beyond the Algorithm: AI, Security, Privacy, and Ethics"
- "Responsible AI: Best Practices for Creating Trustworthy AI Systems"