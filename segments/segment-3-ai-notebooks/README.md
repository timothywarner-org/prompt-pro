# Segment 3: AI Workspaces—Notebooks, Projects, and Custom Assistants

**Duration:** 50 minutes
**Level:** Intermediate
**Last Updated:** December 2025

## What You're Learning

Transform how you analyze data and manage knowledge using AI workspace tools. Learn practical workflows with M365 Copilot Notebooks, ChatGPT Projects, Claude Projects, and Gemini Gems—plus how to create custom AI assistants (M365 Agents and Custom GPTs) for repeatable tasks.

---

## The AI Workspace Landscape (2025)

| Platform | Workspace Feature | Custom Assistant |
|----------|------------------|------------------|
| **Microsoft 365** | Copilot Notebooks | M365 Agents (Copilot Studio) |
| **ChatGPT** | Projects | Custom GPTs |
| **Claude** | Projects | Project-based customization |
| **Gemini** | — | Gems |
| **Google** | NotebookLM | — |

---

## Microsoft 365 Copilot Notebooks

### What It Is
An AI-powered workspace that consolidates all relevant content for your tasks or projects into one environment. Ask questions, generate content, and gain insights based on your selected materials.

### Key Capabilities (December 2025)
- **100-file support**: Ground responses on up to 100 files without compromising quality
- **Multi-format sources**: Word docs, PowerPoint decks, Excel sheets, Copilot chats, OneNote pages, meeting notes
- **Audio Overview**: Generate podcast-style discussions of your content with two AI hosts
- **Save & Share Audio**: Export audio overviews to OneDrive for downloading or sharing
- **Researcher Agent Integration**: Conduct complex, multi-step research across enterprise data using OpenAI's deep researcher model with chain-of-thought reasoning
- **Mobile Access**: Full notebook functionality in the M365 Copilot mobile app

### Best Use Cases
- Quarterly business reviews across multiple reports
- Project documentation synthesis
- Onboarding materials compilation
- Research paper analysis
- Executive briefing preparation

### Sample Prompts for M365 Copilot Notebooks

```
Analyze all documents in this notebook and create:
1. A unified executive summary (max 500 words)
2. Key themes that appear across multiple documents
3. Contradictions or inconsistencies between sources
4. Action items mentioned in any document
5. Questions that remain unanswered

Cite which document each finding comes from.
```

```
I need to prepare for a board meeting. From these materials:
- Extract all financial metrics and their trends
- Identify risks mentioned anywhere
- Create a FAQ anticipating board questions
- Generate talking points for each major topic

Format for quick scanning during the meeting.
```

---

## ChatGPT Projects

### What It Is
Dedicated project spaces that group related conversations, files, and custom instructions. Each project maintains its own context and behavior settings.

### Key Capabilities (December 2025)
- **Project-level custom instructions**: Tailor ChatGPT's behavior per project
- **Persistent file storage**: Up to 40 files for Pro users
- **Conversation grouping**: Keep related chats organized
- **Project sharing**: Share entire projects with your team (available to all tiers)
- **Live connectors**: Google Drive, Dropbox, GitHub, SharePoint integration
- **Cross-platform sync**: Web, desktop, iOS, and Android

### Best Use Cases
- Product development workflows
- Client engagement tracking
- Research projects with evolving documents
- Team collaboration on shared knowledge bases
- Personal learning and skill development

### Sample Project Setup

```
Project: Q1 Marketing Campaign

Custom Instructions:
- You are helping with our Q1 2025 marketing campaign for [Product]
- Target audience: Mid-market B2B SaaS companies
- Brand voice: Professional, innovative, slightly playful
- Always reference our brand guidelines when suggesting copy
- Default to suggesting A/B test variants for all content
- Flag any messaging that might conflict with competitor claims

Files attached:
- Brand guidelines PDF
- Competitor analysis spreadsheet
- Previous campaign performance data
- Product feature list
```

### Sample Prompts for ChatGPT Projects

```
Based on all the materials in this project, draft 5 email subject lines
for our product launch. Each should:
- Be under 50 characters
- Reference a specific pain point from our customer research
- Align with our brand voice
- Include an A/B variant
```

```
Review the conversation history in this project and create a
"decisions made" document that captures:
- All decisions we've finalized
- The reasoning behind each
- Any open questions we still need to resolve
- Dependencies between decisions
```

---

## Claude Projects

### What It Is
Anthropic's workspace feature for organizing knowledge bases and maintaining context across sessions. Projects support long-document analysis and multi-document synthesis.

### Key Capabilities
- **Large context window**: Analyze extensive documents in full
- **Knowledge base creation**: Upload and organize reference materials
- **Custom instructions**: Set project-specific behavior
- **Persistent context**: Maintain understanding across conversations
- **Multi-document synthesis**: Draw insights from multiple sources

### Best Use Cases
- Legal document review and comparison
- Technical documentation maintenance
- Long-form content creation
- Academic research synthesis
- Complex analysis requiring deep context

### Sample Prompts for Claude Projects

```
I've uploaded our complete employee handbook and three competitor
handbooks. Please:

1. Create a gap analysis comparing our policies to competitors
2. Identify areas where we exceed industry standards
3. Flag policies that may need updating based on current best practices
4. Suggest 5 new policies we should consider adding
5. Note any compliance risks you identify

Prioritize findings by business impact.
```

```
Using the technical documentation in this project, create a
troubleshooting guide for our support team. Structure it as:

- Symptom (what the customer reports)
- Likely causes (ranked by probability)
- Diagnostic steps
- Resolution steps
- Escalation criteria

Cover the 20 most common issues based on the support tickets I've uploaded.
```

---

## Google Gemini Gems

### What It Is
Custom AI assistants you create within Gemini. Each Gem has its own personality, instructions, and knowledge base for specialized tasks.

### Key Capabilities
- **Free to create**: Available with any Gmail account
- **Up to 10 reference files**: Attach documents for grounding
- **Living documents**: Connect to Google Drive for auto-updating content
- **1M+ token context**: Handle extensive reference materials
- **Google ecosystem integration**: Native access to Gmail, Drive, Calendar

### Limitations (as of December 2025)
- Cannot share Gems with others (private only)
- No Gem marketplace (unlike Custom GPTs)
- More limited than Custom GPTs for complex workflows

### Best Use Cases
- Personal productivity assistants
- Role-specific helpers (writing, coding, analysis)
- Project-specific experts
- Learning and study aids
- Quick-reference specialists

### Sample Gem Setup

```
Gem Name: Marketing Copy Editor

Instructions:
You are an expert marketing copywriter and editor. Your role is to:
- Review and improve marketing copy for clarity and impact
- Ensure consistency with our brand voice (professional, innovative)
- Optimize for the specified channel (email, social, web)
- Suggest headline alternatives
- Flag potential compliance issues (claims, disclaimers)
- Keep copy concise—business audiences are time-poor

When reviewing copy:
1. First assess the current state (strengths, weaknesses)
2. Provide specific, actionable suggestions
3. Offer a revised version
4. Explain your key changes

Reference files: Brand guidelines, previous high-performing copy examples
```

---

## Custom GPTs (ChatGPT)

### What It Is
Create specialized versions of ChatGPT with custom instructions, knowledge, and capabilities. Can be shared publicly or kept private.

### Key Capabilities
- **Custom instructions**: Define personality and behavior
- **Knowledge upload**: Up to 20 files per GPT
- **Actions/API connections**: Connect to external services
- **Public sharing**: GPT Store for discovery
- **Team sharing**: Workspace-level distribution

### Sample Custom GPT Configuration

```
Name: Contract Review Assistant

Description: Helps legal teams quickly review and summarize contracts

Instructions:
You are a meticulous contract review assistant. When given a contract:

1. Identify contract type and parties involved
2. Extract key terms (duration, value, termination, liability)
3. Flag unusual or potentially problematic clauses
4. Compare against standard terms when reference provided
5. Create a plain-English summary for non-legal stakeholders
6. List questions for the legal team to investigate

Always note:
- Jurisdiction and governing law
- Important dates and deadlines
- Renewal/auto-renewal terms
- Non-compete or exclusivity provisions
- Indemnification obligations

Tone: Professional, thorough, risk-aware
Flag anything that deviates from typical commercial contracts.

Conversation starters:
- "Review this NDA for red flags"
- "Summarize this vendor agreement for my manager"
- "Compare this lease to standard terms"
- "What questions should I ask about this contract?"
```

---

## Microsoft 365 Agents (Copilot Studio)

### What It Is
Build custom AI agents that extend Microsoft 365 Copilot with specialized capabilities, knowledge, and integrations. Agents can automate workflows and connect to enterprise systems.

### Key Capabilities (December 2025)
- **Multi-agent orchestration**: Agents can hand off to other agents
- **Computer use (preview)**: Agents operate apps and websites directly
- **1,400+ connectors**: Power Platform, MCP, Microsoft Graph
- **GPT-5 and GPT-5.2 models**: Latest AI capabilities
- **SharePoint deployment**: One-click publishing to SharePoint sites
- **WhatsApp channel**: Direct customer engagement
- **Sensitivity labels**: Microsoft Purview integration for data protection
- **Time/cost analytics**: Track ROI of agent interactions

### Sample M365 Agent Use Cases

#### IT Help Desk Agent
```
This agent helps employees with common IT issues:

Knowledge sources:
- IT knowledge base articles
- Device setup guides
- Software request procedures
- VPN troubleshooting documentation

Capabilities:
- Answer common IT questions
- Create tickets in ServiceNow (via connector)
- Schedule appointments with IT support
- Provide status updates on existing tickets

Escalation: If unable to resolve, create a ticket and notify the IT team
```

#### HR Policy Agent
```
This agent helps employees understand HR policies:

Knowledge sources:
- Employee handbook
- Benefits documentation
- Leave policies
- Expense guidelines

Capabilities:
- Answer policy questions with citations
- Direct employees to appropriate forms
- Calculate PTO balances (via connector)
- Initiate leave requests

Boundaries:
- Cannot discuss individual performance or compensation
- Cannot make policy exceptions
- Must refer sensitive issues to HR directly
```

---

## Comparison: When to Use What

| Need | Best Tool |
|------|-----------|
| Multi-document analysis (enterprise) | M365 Copilot Notebooks |
| Multi-document analysis (personal) | NotebookLM, Claude Projects |
| Ongoing project with team | ChatGPT Projects (shareable) |
| Personal specialized assistant | Gemini Gems (free) |
| Public/shareable assistant | Custom GPTs |
| Enterprise workflow automation | M365 Agents (Copilot Studio) |
| Deep research with citations | NotebookLM |
| Long document analysis | Claude Projects |
| Real-time data grounding | Gemini Gems (Google Search) |

---

## Hands-On Exercises

1. **M365 Copilot Notebook**: Upload 5 documents and generate an executive briefing
2. **ChatGPT Project**: Set up a project with custom instructions for your current work
3. **Gemini Gem**: Create a personal writing assistant with your style preferences
4. **Custom GPT**: Build a specialized assistant for a repetitive task you do
5. **Cross-platform comparison**: Same documents, same questions—compare outputs

---

## Key Takeaways

By the end of this segment, you'll:
- ✅ Turn hours of document analysis into minutes
- ✅ Create AI workspaces that maintain context across sessions
- ✅ Build custom assistants for your specific workflows
- ✅ Know which platform to use for different scenarios
- ✅ Set up effective custom instructions for consistent results
- ✅ Leverage enterprise features for team collaboration

---

## Tools We'll Use

- **Google NotebookLM** (free with Google account)
- **Microsoft 365 Copilot Notebooks** (M365 Copilot license)
- **ChatGPT Projects** (all tiers, Pro for full features)
- **Claude Projects** (Claude Pro)
- **Gemini Gems** (free with Google account)
- **Copilot Studio** (M365 license + Copilot Studio)

---

## Resources

- [M365 Copilot Notebooks Documentation](https://support.microsoft.com/en-us/copilot-notebooks)
- [ChatGPT Projects Guide](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt)
- [Gemini Gems Guide](https://ai.google.dev/gemini-api/docs/gems)
- [Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [Custom GPT Building Guide](https://help.openai.com/en/articles/8554397-creating-a-gpt)
- Analysis prompt templates (provided during session)
- Industry-specific workspace workflows

---

## Interactive Q&A

Bring your analysis challenges! We'll work through real scenarios and build custom workspaces for your specific needs.

---

*This segment delivers on the O'Reilly course promise: "Improve AI outputs, including content, data, and insights"*
