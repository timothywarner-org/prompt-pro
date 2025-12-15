# Segment 4: Agentic AI—Autonomous Coding and Enterprise Agents

**Duration:** 50 minutes
**Level:** Advanced
**Last Updated:** December 2025

## What You're Learning

Step into the future of AI with autonomous agents that work independently. Master Claude Code for terminal-based development, GitHub Copilot's cloud coding agent for issue-driven development, and Microsoft Copilot Studio for enterprise workflow automation.

---

## The Agentic AI Landscape (2025)

| Agent | Primary Use | Key Feature |
|-------|-------------|-------------|
| **Claude Code** | Terminal-based autonomous coding | Sandboxed execution, checkpoints |
| **GitHub Copilot Coding Agent** | Issue-to-PR automation | Cloud-based, GitHub-native |
| **M365 Copilot Studio Agents** | Enterprise workflow automation | Multi-agent orchestration, 1400+ connectors |
| **Cursor/Windsurf** | IDE-integrated agentic coding | Composer, multi-file edits |
| **Cline** | Open-source coding agent | File system access, planning |

---

## Claude Code: Terminal-Based Autonomous Coding

### What It Is
An agentic coding tool from Anthropic that lives in your terminal, understands your codebase, and helps you code faster through natural language commands. It executes tasks, explains code, handles git workflows, and operates autonomously with safety guardrails.

### Key Capabilities (December 2025)

#### Sandboxed Execution
- **Filesystem isolation**: Claude can only access specified directories
- **Network isolation**: Only connects to approved servers
- **84% reduction in permission prompts** compared to unsandboxed operation
- Protection against prompt injection attacks

#### Checkpoints for Safe Experimentation
- Automatically saves code state before each change
- Instant rewind with `Esc Esc` or `/rewind` command
- Enables ambitious, wide-scale refactoring with confidence
- Perfect for "what if" exploration

#### Parallel Development with Subagents
- Delegate specialized tasks to subagents
- Example: One agent builds backend API while main agent builds frontend
- Background tasks for long-running processes (dev servers, builds)
- Hooks for automated actions (run tests after changes, lint before commits)

#### Claude Code on the Web
- Run Claude Code in an isolated cloud sandbox
- Connect GitHub repositories without local setup
- Kick off coding sessions from anywhere
- Safe separation of credentials from execution environment

#### Slack Integration
- Tag Claude Code directly in Slack conversations
- Maintains full codebase awareness
- Creates files, refactors code, runs tests
- Works like a junior engineer in your team chat

### Sample Claude Code Workflows

#### Feature Development
```bash
# In your terminal
claude "Add a user authentication system to this Express app.
Include:
- JWT-based auth with refresh tokens
- Login and registration endpoints
- Password hashing with bcrypt
- Middleware for protected routes
- Basic rate limiting

Run tests after implementation."
```

#### Bug Investigation
```bash
claude "Users are reporting that the checkout flow fails intermittently.
Investigate:
1. Check the error logs for patterns
2. Review the payment processing code
3. Look for race conditions or timeout issues
4. Propose a fix with test coverage"
```

#### Code Review and Refactoring
```bash
claude "Review the /src/services directory for:
- Code duplication that should be abstracted
- Inconsistent error handling patterns
- Missing TypeScript types
- Performance concerns

Create a refactoring plan, then implement the top 3 improvements."
```

#### Documentation Generation
```bash
claude "Generate comprehensive documentation for this codebase:
- README with setup instructions
- API documentation from the route handlers
- Architecture diagram description
- Contributing guide

Follow our existing doc style in /docs."
```

---

## GitHub Copilot Coding Agent

### What It Is
A GitHub-hosted, autonomous AI developer that works independently in the background to complete development tasks. Assign a GitHub issue to Copilot, and it implements features, fixes bugs, and makes changes across your repository.

### Key Capabilities (December 2025)

#### How It Works
1. **Assign an issue** to Copilot (or delegate from VS Code chat)
2. Agent explores the repository in its own secure cloud environment
3. Makes changes, validates with your tests and linter
4. Pushes commits to a draft pull request
5. **Track progress** through agent session logs
6. **Iterate** through PR review comments

#### Cloud-Based Execution
- Runs in secure GitHub Actions-powered environment
- Uses your repo's test suite for validation
- Respects your linting and formatting rules
- No local resources consumed

#### Ideal Task Complexity
- Low-to-medium complexity tasks
- Well-tested codebases (agent validates its own work)
- Adding features, fixing bugs
- Extending tests, refactoring
- Improving documentation
- **Multiple issues in parallel**

#### Access & Pricing
- Available to Copilot Enterprise, Pro+, and Business users
- Uses premium requests (one per model request)
- Available in GitHub Enterprise Cloud with data residency

### Sample GitHub Copilot Agent Workflows

#### Issue-to-PR Workflow
```markdown
## Issue: Add dark mode support to the dashboard

**Description:**
Users have requested dark mode for the dashboard. We need:
- A toggle in the settings page
- CSS variables for theme colors
- Persistence of preference in localStorage
- Respect system preference by default

**Acceptance Criteria:**
- [ ] Toggle switches theme immediately
- [ ] Preference persists across sessions
- [ ] All dashboard components support both themes
- [ ] No flash of wrong theme on page load

**Assign to:** @copilot
```

#### Bug Fix Assignment
```markdown
## Issue: Login button unresponsive on mobile Safari

**Steps to Reproduce:**
1. Open app on iOS Safari
2. Enter credentials
3. Tap "Login" button
4. Nothing happens (no loading, no error)

**Expected:** Login should process
**Actual:** Button appears to do nothing

**Technical Notes:**
- Works fine on Chrome mobile
- Console shows no errors
- Might be related to touch event handling

**Assign to:** @copilot
```

#### From VS Code Chat
```
@workspace /agent Create unit tests for all the utility functions
in src/utils/. Each test file should:
- Test all exported functions
- Include edge cases
- Follow our existing test patterns in __tests__
- Aim for >90% coverage
```

### Agent Sessions View
- Unified interface in VS Code to manage local and cloud agent sessions
- Monitor progress, review changes, provide feedback
- Available in VS Code and JetBrains, Eclipse, Xcode (coming)

---

## Microsoft Copilot Studio Agents

### What It Is
Build enterprise-grade AI agents that extend Microsoft 365 Copilot with specialized capabilities, knowledge sources, and system integrations. Agents can automate complex workflows and operate across your organization.

### Key Capabilities (December 2025)

#### Multi-Agent Orchestration
- Agents hand off to other agents seamlessly
- Example workflow: Sales agent pulls CRM data → M365 agent drafts proposal in Word → Scheduling agent books follow-ups in Outlook
- Connected, intelligent, scalable automation

#### Computer Use (Preview)
- Agents operate apps and websites directly
- Virtual mouse and keyboard for UI automation
- Describe tasks in natural language
- Automates processes where no API exists

#### Model Context Protocol (MCP) Integration
- Connect MCP servers with a few clicks
- Extend agents without custom development
- Provide MCP host URL, Copilot Studio handles the rest
- 1,400+ total connectors available

#### Latest Model Support
- **GPT-5 Chat**: Generally available (US, EU)
- **GPT-5.2**: Improved code generation, multilingual
- **GPT-4.1**: Default for new agents (latency + quality gains)

#### Enterprise Features
- **SharePoint channel**: One-click deployment to sites
- **WhatsApp channel**: Customer engagement
- **Sensitivity labels**: Microsoft Purview integration
- **Analytics**: Time/cost savings tracking, theme analysis
- **Global language support**: All Copilot Studio languages

### Sample Copilot Studio Agent Configurations

#### Sales Assistant Agent
```yaml
Name: Sales Deal Assistant

Purpose: Help sales team manage deals and generate proposals

Knowledge Sources:
- Product catalog (SharePoint)
- Pricing matrix (Excel)
- Case studies library
- Competitor comparison docs

Connectors:
- Dynamics 365 CRM (deal data, customer info)
- Microsoft Word (proposal generation)
- Outlook (meeting scheduling)
- Teams (notifications)

Capabilities:
- Pull latest deal status from CRM
- Generate customized proposals using templates
- Schedule follow-up meetings
- Alert team to at-risk deals

Orchestration:
- Hand off to Pricing Agent for complex quotes
- Hand off to Legal Agent for contract questions

Boundaries:
- Cannot approve discounts over 15%
- Cannot access competitor customer lists
- Must route enterprise deals to sales director
```

#### Customer Support Agent
```yaml
Name: Support Tier 1 Agent

Purpose: Handle common customer inquiries, escalate complex issues

Knowledge Sources:
- Product documentation
- FAQ database
- Known issues list
- Troubleshooting guides

Connectors:
- Zendesk (ticket creation, status)
- Product database (subscription status)
- Shipping API (order tracking)

Capabilities:
- Answer product questions with citations
- Check order and subscription status
- Create support tickets
- Guide through basic troubleshooting

Computer Use (Preview):
- Navigate internal admin tools
- Look up customer records in legacy systems
- Process simple refunds

Escalation Rules:
- Billing disputes → Finance team
- Technical issues unresolved after 3 steps → Tier 2
- Angry customer detected → Human agent
```

#### Onboarding Agent
```yaml
Name: New Employee Onboarding Agent

Purpose: Guide new hires through first 90 days

Knowledge Sources:
- Employee handbook
- IT setup guides
- Benefits enrollment docs
- Org charts and team info

Connectors:
- Workday (HR system)
- ServiceNow (IT requests)
- Calendar (training scheduling)
- Teams (channel invitations)

Workflow Automation:
Day 1: Welcome message, IT checklist, building access
Week 1: Benefits enrollment reminder, team intro scheduling
Day 30: Check-in survey, training completion verification
Day 90: Performance review preparation

Capabilities:
- Answer policy questions
- Submit IT access requests
- Schedule required training
- Connect with assigned buddy
- Track onboarding progress
```

---

## Model Context Protocol (MCP) Deep Dive

### What MCP Solves
The context persistence problem—making AI tools remember information across sessions, users, and applications.

### Key Concepts
- **MCP Servers**: Services that provide context to AI tools
- **Shared Context**: Multiple agents access the same information
- **GitHub as Memory**: Use repositories for persistent storage
- **Enterprise Patterns**: Episodic (conversation history) vs semantic (knowledge) memory

### MCP Integration Points (2025)
- **Claude Desktop**: Native MCP support
- **VS Code**: Via extensions
- **Copilot Studio**: One-click MCP server connection
- **GitHub Copilot**: Repository context
- **Custom Agents**: Claude Agent SDK

### Sample MCP Server Use Cases

```javascript
// Weather context server example
const server = new MCPServer({
  name: "weather-context",
  capabilities: ["get_current_weather", "get_forecast"]
});

server.addTool("get_current_weather", async (location) => {
  // Fetch from weather API
  return { temp: 72, conditions: "sunny", location };
});

// Now any MCP-compatible agent can check weather
```

---

## Hands-On Exercises

1. **Claude Code**: Set up Claude Code locally and implement a feature with checkpoints
2. **GitHub Copilot Agent**: Create an issue and assign it to Copilot
3. **Copilot Studio**: Build a simple FAQ agent for your team
4. **MCP Exploration**: Connect an MCP server to Claude Desktop
5. **Multi-Agent Design**: Plan a workflow using agent orchestration

---

## Key Takeaways

By the end of this segment, you'll:
- ✅ Understand when to use which agentic tool
- ✅ Set up Claude Code for autonomous development
- ✅ Leverage GitHub Copilot's coding agent for issue-driven development
- ✅ Design enterprise agents in Copilot Studio
- ✅ Understand MCP and its role in context persistence
- ✅ Know best practices for safe, effective agent delegation

---

## Tools We'll Use

| Tool | Access | Best For |
|------|--------|----------|
| **Claude Code** | Claude Pro/API | Terminal-based autonomous coding |
| **Claude Code (Web)** | Claude Pro | Browser-based coding without local setup |
| **GitHub Copilot Agent** | Enterprise/Pro+/Business | Issue-to-PR automation |
| **Copilot Studio** | M365 + Copilot Studio license | Enterprise workflow agents |
| **Claude Agent SDK** | Open source | Building custom agents |

---

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [GitHub Copilot Coding Agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/)
- [Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Claude Agent SDK](https://github.com/anthropics/claude-code)
- Automation workflow templates (provided during session)
- MCP server examples

---

## Interactive Q&A and Course Wrap-up

Final Q&A focusing on:
- Implementing agentic AI in your organization
- Choosing the right agent platform for your use cases
- Security and governance considerations
- Building a business case for advanced AI adoption
- Next steps in your AI journey

---

*This segment delivers on the O'Reilly course promise: "Master automation and agentic AI—learn how industry leaders build autonomous AI systems"*
