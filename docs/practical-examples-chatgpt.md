# Practical Prompting: ChatGPT

## Real-World Examples for OpenAI's ChatGPT (June 2026)

> **"AI engineering is inherently an empirical discipline - build informative evals and iterate often."** - [OpenAI](https://cookbook.openai.com/examples/gpt4-1_prompting_guide)

---

## ChatGPT in 60 Seconds

**What it is:** OpenAI's conversational AI, available via chat.openai.com (consumer) and API (developers).

**Current models (June 2026):**

- **GPT-5.5** - Latest flagship with parallel tool execution
- **GPT-5.x** - Prior flagship releases
- **GPT-4o** - Legacy multimodal (text, vision, audio)

**Key strengths:**

- Excellent instruction following
- Strong coding capabilities
- Multimodal (can see images, hear audio)
- Built-in tools (web search, code execution, image generation)

**Official Resources:**

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [ChatGPT Best Practices](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt)
- [GPT-5.5 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5-1_prompting_guide)

---

## The ChatGPT Mindset

From [OpenAI Academy](https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting):

> *"Prompt engineering is the process of designing and refining your input in a way that helps ChatGPT give the best possible answer."*

**Three principles:**

1. **Be specific, but keep it simple** - Detail matters, but focus on what's essential
2. **Break big tasks into smaller steps** - Easier for ChatGPT to give focused answers
3. **Iterate, don't restart** - Build on responses rather than starting over

---

## Example 1: Code Review

### Basic Prompt (Gets Okay Results)

```text
Review this code for bugs.

def calculate_total(items):
    total = 0
    for item in items:
        total += item.price * item.qty
    return total
```

### Better Prompt (Gets Great Results)

```text
You are a senior Python developer doing a code review.

Review this function for:
1. Bugs or edge cases
2. Error handling gaps
3. Performance concerns
4. Pythonic improvements

Code:
```python
def calculate_total(items):
    total = 0
    for item in items:
        total += item.price * item.qty
    return total
```

Format your response as:

- **Issues Found:** [bullet list]
- **Suggested Fix:** [code block]
- **Explanation:** [1-2 sentences per fix]

```text

**Why it's better:**
- Role sets expertise level
- Numbered checklist focuses the review
- Format specification ensures organized output

---

## Example 2: Email Drafting

### Basic Prompt
```

Write an email declining a meeting.

```text

### Better Prompt
```

Write a professional email with these parameters:

**Purpose:** Decline a meeting invitation
**Recipient:** External vendor (formal relationship)
**Tone:** Polite but firm
**Key points to include:**

- Schedule conflict (don't specify details)
- Offer to reschedule next week
- Suggest they send materials in advance

**Constraints:**

- 3 short paragraphs maximum
- No apologetic language ("I'm so sorry...")
- End with a clear call to action

```text

**Output Quality:** The second prompt produces a focused, professional email that matches your communication style.

---

## Example 3: Data Analysis with Code Interpreter

ChatGPT's Code Interpreter can run Python code on uploaded files.

### The Task
Analyze a CSV of sales data.

### Effective Prompt
```

I've uploaded sales_data.csv. Please:

1. **Explore:** Show me the first 5 rows and basic statistics
2. **Clean:** Identify and handle any missing values
3. **Analyze:**

- Total revenue by product category
- Monthly trend over the past year
- Top 5 customers by purchase volume

4. **Visualize:** Create charts for #3

After each step, explain what you found before moving to the next.

```text

**Why this works:**
- Structured steps let you verify each stage
- Explicit ask for explanation catches issues early
- Clear deliverables (stats, charts) set expectations

---

## Example 4: Learning a New Concept

### The Feynman Technique via ChatGPT

```

Explain [concept] to me using the Feynman technique:

1. Start with a simple analogy a high schooler would understand
2. Then build up complexity in 3 levels:

- Level 1: Core idea (2-3 sentences)
- Level 2: How it works (1 paragraph)
- Level 3: Technical details (for practitioners)

3. End with a "test your understanding" question

Concept: Kubernetes container orchestration

```text

**Variations:**
- "Explain like I'm switching careers from [field A] to [field B]"
- "Use an analogy from [domain I know well]"
- "What would [famous explainer] say about this?"

---

## Example 5: Document Summarization

### Basic Prompt
```

Summarize this article.

```text

### Better Prompt
```

Summarize this article for a busy executive:

**Format:**

- **TL;DR:** [1 sentence, the absolute key point]
- **Key Findings:** [3-5 bullets, most important facts]
- **So What:** [Why this matters, implications]
- **Action Items:** [What someone should do with this info]

**Constraints:**

- Total length: Under 200 words
- No jargon unless defined
- Flag any claims that seem unsubstantiated

[paste article]

```text

---

## Example 6: Brainstorming with Constraints

### The Problem
Open-ended "give me ideas" prompts produce generic results.

### Better Approach
```

Generate 10 marketing campaign ideas for [product].

**Constraints to force creativity:**

- Budget: Under $5,000
- Timeline: 2 weeks
- Can't use: Paid social ads, influencers
- Must include: User-generated content component

**For each idea, provide:**

1. Campaign name (catchy)
2. One-sentence description
3. Why it might work
4. Biggest risk

Start with your most unconventional idea.

```text

**Why constraints help:** They force the model out of generic territory and into creative problem-solving.

---

## Example 7: Multi-Step Research Task

### The Task
Research a topic thoroughly.

### Prompt Structure
```

Help me research [topic]. Let's do this systematically:

**Phase 1: Scope**
What are the 5 key questions someone researching this should answer?
[Wait for response, confirm questions]

**Phase 2: Deep Dive**
For each question:

- Current consensus/answer
- Key debates or uncertainties
- Most cited sources

**Phase 3: Synthesis**
Create a 1-page briefing document I could share with my team.

Let's start with Phase 1.

```text

**Why multi-phase works:**
- Prevents overwhelming single responses
- Allows course correction
- Builds context progressively

---

## ChatGPT-Specific Features to Leverage

### Memory
ChatGPT can remember facts across conversations.

```

Remember: I'm a Python developer working on a Django project.
My team uses pytest for testing and follows PEP 8.
We deploy to AWS using Docker containers.

```text

Now future coding questions automatically consider your stack.

### Custom Instructions
Set persistent preferences in Settings:

**"What would you like ChatGPT to know about you?"**
```

I'm a senior product manager at a B2B SaaS company.
I prefer concise answers with bullet points.
When I ask for feedback, be direct - don't sugarcoat.
I value data and examples over theory.

```text

**"How would you like ChatGPT to respond?"**
```

Start with the bottom line, then provide details.
Use tables for comparisons.
Flag assumptions you're making.
If my question is ambiguous, ask a clarifying question.

```text

### GPTs (Custom ChatGPT Configurations)
For repeated tasks, create a GPT with:
- Pre-loaded instructions
- Specific knowledge files
- Configured tools

Example: A "Code Reviewer" GPT pre-configured with your style guide.

---

## Common ChatGPT Pitfalls

### Pitfall 1: The Knowledge Cutoff
ChatGPT's training has a cutoff date. For current information:

```

Search the web for [recent topic] and summarize what you find.

```text

Or explicitly enable browsing in your prompt.

### Pitfall 2: Hallucinated Citations
ChatGPT can invent sources. If you need real citations:

```

Only cite sources you can verify exist. If you're uncertain about
a source, say "I believe there may be a source on this, but I
cannot verify the exact reference."

```text

### Pitfall 3: Verbose Defaults
GPT models can be wordy. For concise output:

```

Be concise. Use bullet points. No preamble or conclusions.
Just the answer.

```text

### Pitfall 4: Lost Context in Long Chats
Long conversations can cause the model to "forget" earlier context.

**Fix:** Periodically summarize:
```

Let me recap our decisions so far:

1. [Decision A]
2. [Decision B]

Correct any errors, then we'll continue.

```text

---

## Prompt Templates for ChatGPT

### Technical Writing Template
```

Write [document type] about [topic].

**Audience:** [Who will read this]
**Technical level:** [Beginner/Intermediate/Expert]
**Tone:** [Formal/Casual/Academic]
**Length:** [Word count or section count]

**Must include:**

- [Required element 1]
- [Required element 2]

**Avoid:**

- [Thing to exclude]

```text

### Problem-Solving Template
```

Help me solve this problem: [describe problem]

**Context:**

- [Relevant background]
- [What I've tried]
- [Constraints]

**Please:**

1. Confirm you understand the problem
2. Identify the core issue
3. Propose 2-3 approaches
4. Recommend one with reasoning

```text

### Review/Feedback Template
```

Review this [document/code/plan] and provide feedback.

**Focus areas:**

- [Specific aspect 1]
- [Specific aspect 2]

**Feedback format:**

- What's working well (brief)
- What needs improvement (detailed)
- Priority ranking of fixes

Be direct and specific. I want to improve, not be reassured.

```text

---

## Quick Reference: ChatGPT Power Moves

| Situation | Prompt Move |
|-----------|-------------|
| Generic answer | "Be specific. Give an example." |
| Too long | "Summarize in 3 bullets." |
| Needs structure | "Format as a table comparing X and Y." |
| Uncertain accuracy | "How confident are you? What are you uncertain about?" |
| Want alternatives | "Give me 3 different approaches with trade-offs." |
| Lost in complexity | "Let's step back. What's the simplest version of this?" |
| Need current info | "Search the web for recent information on this." |

---

## Further Reading

| Resource | Description |
|----------|-------------|
| [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering) | Official guide |
| [ChatGPT Best Practices](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt) | User-focused tips |
| [GPT-5 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide) | Model-specific techniques |
| [OpenAI Cookbook](https://cookbook.openai.com/) | Example code and patterns |
| [OpenAI Community Forum](https://community.openai.com/) | User discussions and solutions |

---

*Last updated: June 2026*

*Sources verified: All hyperlinks validated June 2026*
