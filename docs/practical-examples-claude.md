# Practical Prompting: Claude

## Real-World Examples for Anthropic's Claude (June 2026)

> **"Current Claude models respond well to clear, explicit instructions. Being specific about your desired output can help enhance results."** - [Anthropic](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)

---

## Claude in 60 Seconds

**What it is:** Anthropic's conversational AI, available via claude.ai (consumer) and API (developers).

**Current models (June 2026):**

- **Claude Fable 5** - Most capable, frontier reasoning
- **Claude Opus 4.8** - Current flagship default, long-horizon reasoning
- **Claude Sonnet 4.6** - Balanced capability and speed
- **Claude Haiku 4.5** - Fast and efficient

**Key strengths:**

- Long context windows (up to 1M tokens on Opus and Sonnet; 200K on Haiku)
- Excellent document analysis
- Strong reasoning and nuance
- Safety-conscious design
- Projects feature for persistent context

**Official Resources:**

- [Claude Prompt Engineering Overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) *(redirects to platform.claude.com)*
- [Claude 4 Best Practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices)
- [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)

---

## The Claude Mindset

Claude has distinct characteristics compared to other LLMs:

1. **User messages carry more weight** - Claude places more emphasis on user messages than system prompts
2. **Precise instruction following** - Current Claude models follow instructions very literally
3. **Ask for "above and beyond" explicitly** - Previous Claude versions added helpful extras; current Claude models require you to request this
4. **Parallel tool execution** - Claude Sonnet 4.6 is aggressive about parallelizing operations

From [Anthropic's blog](https://claude.com/blog/best-practices-for-prompt-engineering):
> *"Breaking large tasks into smaller, discrete chunks remains valuable because it helps the model focus on doing its best work within a specific set of requirements."*

---

## Example 1: Long Document Analysis

Claude excels at analyzing long documents (up to 1M tokens on Opus and Sonnet; 200K on Haiku).

### Basic Prompt

```text
Summarize this document.

[paste long document]
```

### Better Prompt

```text
I'm going to share a long document. After reading it completely, please:

1. **Executive Summary** (3-4 sentences): What is this document about and what's the main conclusion?

2. **Key Points** (5-7 bullets): The most important facts, findings, or arguments

3. **Methodology/Approach** (if applicable): How did they reach their conclusions?

4. **Limitations/Caveats**: What does the document NOT address or what assumptions does it make?

5. **Questions Raised**: What follow-up questions should a reader consider?

<document>
[paste document here]
</document>
```

**Claude-specific tip:** Use XML tags like `<document>` to clearly separate content from instructions. Claude responds well to this structure.

---

## Example 2: Code Generation with Testing

### The Prompt

```text
Write a Python function that validates email addresses.

Requirements:
- Use regex for validation
- Handle edge cases (empty string, None, whitespace)
- Return tuple of (is_valid: bool, error_message: str | None)
- Include docstring with examples

After writing the function, also provide:
1. Five unit tests covering normal cases
2. Three unit tests covering edge cases
3. One test that documents a known limitation

Use pytest style for tests.
```

**Why this works for Claude:**

- Explicit output format (tuple type)
- Specific request for tests (current Claude models won't add these unless asked)
- Clear structure for what comes after the main code

---

## Example 3: Structured Reasoning

Claude excels at showing its reasoning process.

### The Task

Evaluate a business decision.

### The Prompt

```text
Help me evaluate whether to build vs. buy a CRM system.

Context:
- 50-person B2B company
- Current spreadsheet-based tracking
- Budget: $50K first year
- Must integrate with our existing Slack and email

Please structure your analysis as:

<analysis>
## Build Option
- Pros: [list]
- Cons: [list]
- Estimated cost breakdown
- Timeline estimate

## Buy Option
- Top 3 vendors to consider and why
- Pros: [list]
- Cons: [list]
- Estimated cost breakdown

## Recommendation
- Your recommendation with confidence level (high/medium/low)
- Key factors driving this recommendation
- What would change your recommendation
</analysis>

Think through this systematically before giving your final recommendation.
```

**The XML tags:** Claude responds very well to XML-style structure. It helps maintain consistent output format.

---

## Example 4: Projects Feature (Persistent Context)

Claude Projects let you upload documents that persist across conversations.

### Setting Up a Project

**Project: Technical Writing Assistant**

**Project Instructions (Custom System Prompt):**

```text
You are a technical writing assistant for our API documentation.

Key guidelines:
- Our docs use second person ("you can..." not "users can...")
- Code examples should be in Python 3.11+ and JavaScript/TypeScript
- Always include error handling in examples
- Follow our terminology: "workspace" (not "organization"), "member" (not "user")

Uploaded reference documents contain:
- style-guide.md: Our documentation style guide
- api-reference.md: Current API structure
- glossary.md: Term definitions

When I share draft documentation, compare it against these standards.
```

### Using the Project

```text
Review this API endpoint documentation. Flag any:
1. Style guide violations
2. Missing error handling examples
3. Terminology inconsistencies

<draft>
[paste documentation draft]
</draft>
```

**Why Projects are powerful:**

- Documents persist (no re-uploading)
- Custom instructions apply to all conversations
- Great for consistent, domain-specific work

---

## Example 5: Nuanced Writing Tasks

Claude handles nuance and tone well.

### The Task

Write a difficult email.

### The Prompt

```text
Help me write a sensitive email.

Situation: A team member's performance has declined over 3 months.
This is a first formal conversation, not a final warning.
Goal: Be supportive while being clear about expectations.

Tone requirements:
- Empathetic but not pitying
- Direct but not harsh
- Professional but not cold
- Focus on future improvement, not past failures

Include:
- Acknowledgment of their previous strong performance
- Specific examples of concerns (leave placeholders)
- Offer of support/resources
- Clear next steps and timeline
- Path to getting back on track

Write 2 versions:
1. For someone you suspect is dealing with personal issues
2. For someone who may have become disengaged

Label which is which and explain the key differences.
```

**Claude strength:** Handling nuance in communication where tone matters significantly.

---

## Example 6: Multi-Turn Analysis

### Turn 1: Initial Analysis

```text
Analyze this market research report. Before diving in, tell me:
1. What type of document is this?
2. What's its apparent purpose?
3. What sections does it contain?
4. Any initial observations about data quality or methodology?

<report>
[paste report]
</report>
```

### Turn 2: Directed Deep Dive

```text
Good analysis. Now focus on Section 3 (Market Trends).

For each trend identified:
- Rate the strength of evidence (strong/moderate/weak)
- Note any logical leaps or assumptions
- Suggest what additional data would strengthen the claim
```

### Turn 3: Synthesis

```text
Based on our analysis, draft a 1-page executive brief that:
- Summarizes the trustworthy findings
- Flags areas needing more research
- Recommends 3 actions based on the data
```

**Multi-turn strength:** Claude maintains context well across conversations, allowing iterative deep-dives.

---

## Example 7: Artifact Creation

Claude can create interactive artifacts (code, documents, diagrams).

### The Prompt

```text
Create an interactive React component that visualizes a decision tree.

Requirements:
- Input: JSON structure defining nodes and connections
- Display: Visual tree with expandable/collapsible nodes
- Interaction: Click a node to see details
- Style: Clean, professional, accessible colors

Include sample JSON data for a "hiring decision" tree.
```

**Artifact types Claude can create:**

- React components
- HTML/CSS/JS pages
- SVG diagrams
- Markdown documents
- Mermaid diagrams

---

## Claude-Specific Techniques

### Using XML Tags for Structure

Claude responds well to XML-style delimiters:

```text
<context>
Background information about the task
</context>

<requirements>
- Requirement 1
- Requirement 2
</requirements>

<examples>
Example of desired output style
</examples>

<task>
The actual task to perform
</task>
```

### Asking for Self-Critique

```text
After completing the task, add a section called "Self-Assessment":
- What assumptions did you make?
- What's the weakest part of this response?
- What would you improve with more information?
```

### Handling Uncertainty

Claude tends to be appropriately uncertain. Leverage this:

```text
For each claim in your response, indicate your confidence:
- HIGH: Well-established, widely agreed upon
- MEDIUM: Generally accepted but with some debate
- LOW: My best inference, but could be wrong

If LOW on something important, suggest how to verify.
```

---

## Common Claude Pitfalls

### Pitfall 1: Expecting Unsolicited Extras

Current Claude models follow instructions precisely. If you want comprehensive treatment:

```text
❌ "Explain machine learning"
   (Gets a basic explanation)

✅ "Explain machine learning comprehensively, including:
 - Core concepts
 - Types (supervised, unsupervised, reinforcement)
 - Common algorithms for each type
 - Real-world applications
 - Current limitations and challenges"
   (Gets thorough coverage)
```

### Pitfall 2: Overly Complex Single Prompts

Claude does better with focused tasks:

```text
❌ "Analyze this data, create visualizations, write a report,
   and suggest action items all in one response"

✅ Break into sequential prompts:
   1. "Analyze this data. What patterns do you see?"
   2. "Create a visualization for the top finding"
   3. "Draft a report section on [specific finding]"
   4. "Based on the analysis, suggest 3 action items"
```

### Pitfall 3: Not Using the Long Context

Claude can handle up to 1M tokens (Opus and Sonnet; 200K on Haiku). Use it:

```text
Instead of:
"Here's a summary of our codebase..."

Try:
"I'm including our entire codebase below. Read it fully,
then answer questions about the architecture."
```

### Pitfall 4: Missing the Projects Feature

For recurring tasks, set up a Project instead of re-uploading context each time.

---

## Prompt Templates for Claude

### Analysis Template

```text
<context>
[Background/situation description]
</context>

<material>
[Content to analyze]
</material>

<task>
Analyze the material above. Specifically:
1. [Analysis dimension 1]
2. [Analysis dimension 2]
3. [Analysis dimension 3]
</task>

<output_format>
Structure your response as:
- Summary: [2-3 sentences]
- Detailed Analysis: [organized by dimension]
- Conclusions: [key takeaways]
- Limitations: [what you couldn't determine]
</output_format>
```

### Writing Template

```text
<context>
Purpose: [Why this is being written]
Audience: [Who will read it]
Constraints: [Word count, tone, format requirements]
</context>

<reference_material>
[Style guides, examples, or source material]
</reference_material>

<task>
Write [document type] that [achieves goal].
</task>

<quality_checks>
Before finalizing, verify:
- [ ] Appropriate for stated audience
- [ ] Meets all constraints
- [ ] Consistent tone throughout
- [ ] Clear call to action (if applicable)
</quality_checks>
```

### Problem-Solving Template

```text
<problem>
[Clear description of the problem]
</problem>

<constraints>
- [Constraint 1]
- [Constraint 2]
- [What's non-negotiable]
</constraints>

<attempted_solutions>
What has been tried:
- [Attempt 1 and why it didn't work]
- [Attempt 2 and why it didn't work]
</attempted_solutions>

<request>
Please:
1. Identify root cause
2. Propose 2-3 solutions
3. Recommend one with rationale
4. Identify risks and mitigation strategies
</request>
```

---

## Quick Reference: Claude Power Moves

| Situation | Prompt Move |
|-----------|-------------|
| Need thorough answer | "Be comprehensive. Include [specific elements]" |
| Want structured output | Use XML tags to define sections |
| Complex document | Upload to Project for persistent context |
| Need reasoning shown | "Think through this step by step, showing your work" |
| Want alternatives | "Provide 3 approaches with trade-offs for each" |
| Tone matters | Explicitly specify tone with examples |
| Parallel operations | Claude Sonnet 4.6 parallelizes automatically - design for it |
| Long content | Use full 1M context window (Opus and Sonnet; 200K on Haiku) |

---

## Further Reading

| Resource | Description |
|----------|-------------|
| [Claude Prompt Engineering](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) | Official documentation |
| [Claude 4 Best Practices](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices) | Model-specific guidance |
| [Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Advanced context management |
| [Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | Hands-on practice |
| [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) | Code examples |

---

*Last updated: June 2026*

*Sources verified: All hyperlinks validated June 2026*
