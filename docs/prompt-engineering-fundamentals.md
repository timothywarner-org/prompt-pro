# Prompt Engineering Fundamentals
## A Feynman-Style Guide to Talking with AI (December 2025)

> **"If you can't explain it simply, you don't understand it well enough."** - Richard Feynman

This guide explains prompt engineering the way Feynman would: simply, with analogies, and focused on *why* things work, not just *how*.

---

## The Big Idea (30 Seconds)

**Prompt engineering is the art of giving clear instructions to AI.**

Think of an LLM like a brilliant intern who has read the entire internet but has never worked at your company. They're smart, eager, and capable—but they need *your* guidance to be useful. The prompt is your job description, context, and task all rolled into one.

> *"The best prompt isn't the longest or most complex. It's the one that achieves your goals reliably with the minimum necessary structure."* — [Anthropic](https://claude.com/blog/best-practices-for-prompt-engineering)

---

## Why Prompts Work (The Physics)

LLMs are prediction machines. Given text, they predict *what comes next* based on patterns from training. Your prompt sets up the pattern.

**Analogy:** Imagine autocomplete on steroids. If you type "Dear Sir or Madam," the AI predicts formal language follows. If you type "yo what's up," it predicts casual language. Your prompt creates the groove the AI slides into.

This is why **context matters more than clever wording**. Most prompt failures come from ambiguity, not model limitations ([Lakera](https://www.lakera.ai/blog/prompt-engineering-guide)).

---

## The Four Pillars of a Good Prompt

Every effective prompt has these components. Miss one, and you'll get disappointing results.

### 1. Role/Context (Who Should Answer?)

Tell the AI *who* it should be for this task.

```
You are a senior Python developer who specializes in clean, readable code.
```

**Why it works:** This activates relevant knowledge and sets the tone. Saying "you are a historian" produces academic language; "you are a friendly tutor" produces accessible explanations.

**Research note:** [Recent studies](https://www.prompthub.us/blog/role-prompting-does-adding-personas-to-your-prompts-really-make-a-difference) show role prompting works best for open-ended tasks like writing, less so for factual accuracy tasks. Don't expect a persona to prevent hallucinations.

### 2. Task (What Should They Do?)

Be specific about the action. Vague tasks get vague results.

| Vague | Specific |
|-------|----------|
| "Help me with this code" | "Review this code for bugs and suggest fixes" |
| "Write something about dogs" | "Write a 200-word blog intro about adopting senior dogs" |
| "Analyze this data" | "Calculate the average, median, and identify outliers" |

### 3. Format (What Should the Output Look Like?)

Tell the AI exactly how to structure its response.

```
Respond in this format:
- Summary: [2 sentences]
- Key Points: [bullet list, max 5]
- Recommendation: [1 sentence]
```

**Pro tip from [Google](https://ai.google.dev/gemini-api/docs/prompting-strategies):** Use consistent delimiters—XML tags (`<context>...</context>`) or Markdown headers. Pick one style and stick with it.

### 4. Constraints (What Are the Boundaries?)

Set limits to focus the response.

```
- Maximum 100 words
- Use simple language a 10-year-old would understand
- Don't include technical jargon
- Only reference events before 2020
```

---

## The Core Techniques (Ranked by Usefulness)

### Zero-Shot: Just Ask

The simplest approach. Give instructions without examples.

```
Translate the following English text to French: "Hello, how are you?"
```

**When to use:** Simple, well-defined tasks where the AI likely understands what you want. Works great for modern models on common tasks ([Codecademy](https://www.codecademy.com/article/prompt-engineering-101-understanding-zero-shot-one-shot-and-few-shot)).

### One-Shot: Show One Example

Provide one example of what you want.

```
Convert the company name to its stock ticker.

Example:
Company: Apple Inc.
Ticker: AAPL

Company: Microsoft Corporation
Ticker:
```

**When to use:** When the format is unusual or the AI might misinterpret your request.

### Few-Shot: Show Multiple Examples

Provide 3-5 examples to establish a pattern.

```
Classify the sentiment of these reviews:

Review: "Absolutely loved it!" → Positive
Review: "Worst purchase ever." → Negative
Review: "It's okay, nothing special." → Neutral

Review: "Would definitely buy again!" →
```

**When to use:** Complex or domain-specific tasks. The model learns the pattern from your examples. [Research suggests](https://www.promptingguide.ai/techniques/fewshot) 3-5 examples is the sweet spot—more can cause overfitting.

### Chain-of-Thought (CoT): Make It Think

Add "Let's think step by step" or provide examples with reasoning steps.

**Zero-shot CoT:**
```
How many r's are in "strawberry"? Let's think step by step.
```

**Few-shot CoT:**
```
Q: If I have 3 apples and give away 1, then buy 4 more, how many do I have?
A: Let's solve this step by step:
   - Start with 3 apples
   - Give away 1: 3 - 1 = 2 apples
   - Buy 4 more: 2 + 4 = 6 apples
   - Final answer: 6 apples

Q: If I have 10 dollars, spend 3, and earn 7 more, how much do I have?
A:
```

**Why it works:** Forces the model to show its work, reducing errors on multi-step problems. The seminal [Wei et al. paper](https://arxiv.org/abs/2201.11903) showed dramatic improvements on math and reasoning tasks.

**Limitation:** CoT works best with larger models (100B+ parameters). Smaller models may produce incoherent reasoning ([IBM](https://www.ibm.com/think/topics/chain-of-thoughts)).

---

## System vs. User Prompts

Most LLM interfaces have two types of prompts:

| System Prompt | User Prompt |
|--------------|-------------|
| Sets overall behavior | Gives specific tasks |
| Defines role, tone, constraints | Dynamic, changes per query |
| Like a job description | Like a work request |
| Set once, reused | Changes each interaction |

**Example System Prompt:**
```
You are a helpful coding assistant. You write clean, well-commented Python code.
You always explain your code after writing it. You never use deprecated functions.
```

**Example User Prompt:**
```
Write a function that checks if a number is prime.
```

**Best practice from [PromptLayer](https://blog.promptlayer.com/system-prompt-vs-user-prompt-a-comprehensive-guide-for-ai-prompts/):** Put static instructions in the system prompt, dynamic content in the user prompt. When unsure, prefer the user prompt—it's more portable across models.

**Model-specific note:** Claude places more emphasis on user messages than system prompts ([Nebuly](https://www.nebuly.com/blog/llm-system-prompt-vs-user-prompt)).

---

## Common Mistakes (And Fixes)

### Mistake 1: Being Too Vague
```
❌ "Help me write an email"
✅ "Write a professional 3-paragraph email declining a meeting invitation.
    Tone: polite but firm. Suggest rescheduling for next week."
```

### Mistake 2: Overloading with Instructions
```
❌ [500 words of instructions for a simple task]
✅ Break into multiple prompts, or use a clear structure with headers
```

### Mistake 3: Not Iterating
The first prompt rarely gives perfect results. Refine based on output.

> *"Prompt engineering is inherently iterative. Start with an initial prompt, review the response, and refine."* — [OpenAI](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt)

### Mistake 4: Fighting the Model's Defaults
If you want verbose output from a model trained to be concise, say so explicitly. Modern models like [Gemini 3](https://promptbuilder.cc/blog/gemini-3-prompting-playbook-november-2025) provide direct answers by default—request detail if you need it.

---

## The Iteration Loop

1. **Write** your first prompt (keep it simple)
2. **Test** with a representative example
3. **Analyze** what's wrong with the output
4. **Refine** one element at a time
5. **Repeat** until satisfied

**Pro tip:** Keep a prompt library. Save prompts that work well for reuse ([Garrett Landers](https://garrettlanders.com/prompt-engineering-guide-2025/)).

---

## Quick Reference: Prompt Template

```
[ROLE]
You are a [specific expertise] who [key characteristic].

[CONTEXT]
Background: [relevant information]
Audience: [who will read this]

[TASK]
[Specific action verb] [what you want] [any details].

[FORMAT]
Respond using:
- [structure element 1]
- [structure element 2]

[CONSTRAINTS]
- [Limit 1]
- [Limit 2]
```

---

## Further Reading

| Resource | Best For |
|----------|----------|
| [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) | Official techniques, API users |
| [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | Claude-specific, safety-focused |
| [Prompt Engineering Guide](https://www.promptingguide.ai/) | Comprehensive reference, all models |
| [OpenAI Academy - Prompting](https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting) | Beginners, ChatGPT users |
| [Lakera's 2025 Guide](https://www.lakera.ai/blog/prompt-engineering-guide) | Security considerations |

---

## Key Takeaways

1. **Clarity beats cleverness** — Simple, specific prompts outperform elaborate ones
2. **Show, don't just tell** — Examples (few-shot) are powerful teachers
3. **Structure matters** — Use consistent formatting and clear sections
4. **Iterate always** — Your first prompt is your first draft, not your final product
5. **Know your model** — Different LLMs respond differently to the same prompt

---

*Last updated: December 2025*

*Sources verified: All hyperlinks validated December 2025*
