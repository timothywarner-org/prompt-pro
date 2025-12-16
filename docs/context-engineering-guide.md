# Context Engineering: Beyond Prompts
## A Feynman-Style Guide to Feeding AI Brains (December 2025)

> **"Context engineering is prompt engineering's wiser older sibling."** — The AI community, 2025

---

## The Big Idea (30 Seconds)

**Context engineering is about *what information* you give an AI, not just *how you ask*.**

Prompt engineering asks: "How do I phrase my question?"
Context engineering asks: "What does the AI need to know to give me a great answer?"

> *"Building with language models is becoming less about finding the right words and more about answering: what configuration of context is most likely to generate our desired behavior?"* — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## The RAM Analogy (Why This Matters)

As [Andrej Karpathy](https://blog.langchain.com/context-engineering-for-agents/) puts it:

> *"LLMs are like a new kind of operating system. The LLM is like the CPU and its context window is like the RAM, serving as the model's working memory."*

Just like your computer can only work with what's loaded in RAM, an LLM can only work with what's in its context window. Context engineering is like being the operating system that decides what gets loaded.

**The core problem:** Context windows are finite (8K to 200K tokens typically). You can't dump everything in. You must be strategic.

---

## The Four Strategies

According to [LlamaIndex](https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider), context engineering boils down to four core strategies:

### 1. Write
Create new context that didn't exist before.

**Examples:**
- System prompts that define behavior
- Summary documents of long conversations
- Procedural instructions ("memories" the AI can reference)

### 2. Select
Choose which existing information to include.

**Examples:**
- RAG (Retrieval-Augmented Generation) — pulling relevant docs
- Selecting which conversation history to keep
- Picking relevant few-shot examples

### 3. Compress
Reduce information while preserving meaning.

**Examples:**
- Summarizing long documents
- Trimming older messages from chat history
- Extracting key facts from verbose sources

### 4. Isolate
Separate contexts across different processes.

**Examples:**
- Multi-agent systems where each agent has its own context
- Sandboxed sub-tasks with focused context
- Separate "workspaces" for different topics

---

## RAG: The Gateway Drug to Context Engineering

**RAG (Retrieval-Augmented Generation)** was the first widely adopted context engineering technique. It solves a fundamental problem: LLMs only know what they were trained on.

**How RAG works:**
1. **User asks a question**
2. **System searches** a knowledge base for relevant documents
3. **Relevant chunks** are added to the prompt
4. **LLM answers** using both its training AND the retrieved context

```
[Retrieved Context]
From Company Handbook (page 47): Vacation policy allows 20 days PTO annually...

[User Question]
How many vacation days do I get?

[LLM can now answer accurately for YOUR company]
```

**Why it matters:** RAG lets you introduce information the LLM was never trained on—your company docs, recent events, specialized knowledge.

> *"Context engineering arguably started with RAG systems... RAG was one of the first techniques that let you introduce LLMs to information that wasn't part of their original training data."* — [LlamaIndex](https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider)

---

## Memory: Giving AI a Long-Term Brain

Short-term memory = the current conversation
Long-term memory = information that persists across conversations

### Three Types of Memory ([LangChain](https://blog.langchain.com/context-engineering-for-agents/))

| Memory Type | What It Stores | Example |
|-------------|----------------|---------|
| **Episodic** | Past experiences | "Last time you asked about X, we solved it by Y" |
| **Procedural** | How to do things | "When user asks for code, always include tests" |
| **Semantic** | Facts and knowledge | "User prefers Python over JavaScript" |

### Practical Implementation

Most SaaS LLMs now offer built-in memory features:
- **ChatGPT:** Memory feature stores facts across chats
- **Claude:** Projects with uploaded files persist context
- **Gemini:** Workspace integration remembers document context

**The key insight:** If agents can save memories, they need ways to *select* relevant memories. Not everything should be recalled every time.

---

## The Danger Zone: Context Pollution

More context isn't always better. [Drew Breunig](https://www.datacamp.com/blog/context-engineering) identified three ways context can hurt:

### Context Poisoning
A hallucination or error makes it into the context and perpetuates.

**Example:** AI incorrectly states "the deadline is March 15" in conversation. This gets saved to memory. Future questions about deadlines get wrong answers.

**Fix:** Validate important information before it becomes persistent context.

### Context Distraction
Irrelevant information overwhelms relevant information.

**Example:** You dump a 100-page document into context, but only 2 pages are relevant. The AI struggles to find the signal in the noise.

**Fix:** Be selective. Pre-filter documents. Use chunking strategies that surface relevance.

### Context Confusion
Contradictory information in context leads to inconsistent responses.

**Example:** Two documents in context give different procedures for the same task. AI doesn't know which to follow.

**Fix:** Curate context for consistency. Resolve contradictions before insertion.

> *"Good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."* — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## Structuring Context: The Architecture

[Anthropic recommends](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) organizing context into distinct sections:

```xml
<system_instructions>
[Core behavior, persona, constraints]
</system_instructions>

<background_information>
[Domain knowledge, company policies, reference material]
</background_information>

<retrieved_context>
[RAG results, relevant documents]
</retrieved_context>

<conversation_history>
[Recent messages, summarized if necessary]
</conversation_history>

<current_task>
[The specific request to handle now]
</current_task>
```

**Why structure matters:**
- Clear sections prevent blending/confusion
- Makes it easier to update specific parts
- Models can better "attend" to relevant sections
- Debugging is easier when context is organized

---

## Compression Techniques

When context exceeds limits, you must compress. Here are the main approaches:

### Summarization
Use an LLM to distill key information.

```
Before: [50,000 token document]
After: [500 token summary of key points]
```

**Trade-off:** Lossy. Details are lost. Good for gist, bad for specifics.

### Trimming
Remove older or less relevant content.

```
Strategy: Keep last N messages, summarize older ones
Strategy: Keep messages mentioning key entities, drop small talk
```

### Selective Retrieval
Don't include everything—include what's relevant.

```
Query: "What's the refund policy?"
Retrieve: Only sections about refunds
Skip: Shipping, FAQs about unrelated topics
```

### Advanced: MemAgent
[Recent research](https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider) shows systems like MemAgent that dynamically compress context, using reinforcement learning to decide what to keep in a fixed "memory slot."

---

## Multi-Agent Context Isolation

One of the most powerful context engineering patterns: **split context across specialized agents**.

**The insight from [Anthropic's research](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents):**
> *"Many agents with isolated contexts outperformed a single agent."*

### How It Works

Instead of one agent with everything in context:

```
┌─────────────────────────────────────────────────┐
│ Orchestrator Agent                              │
│ (Routes tasks, synthesizes results)             │
└───────────┬─────────────────┬───────────────────┘
            │                 │
    ┌───────▼───────┐ ┌───────▼───────┐
    │ Research Agent │ │ Writing Agent │
    │ (Web search,   │ │ (Drafting,    │
    │  docs context) │ │  style guides)│
    └───────────────┘ └───────────────┘
```

Each agent has:
- Focused context relevant to its task
- Specific tools it can use
- Clear boundaries

**Why this works:** No single context window gets overwhelmed. Each agent is an expert in its domain.

---

## Practical Patterns for SaaS Users

### Pattern 1: The Briefing Document

Before a complex task, create a briefing:

```
I'm going to work on [project]. Here's what you need to know:

**Background:**
- [Key fact 1]
- [Key fact 2]

**Constraints:**
- [Limitation 1]
- [Limitation 2]

**Style/Preferences:**
- [Preference 1]
- [Preference 2]

Acknowledge you understand before we proceed.
```

### Pattern 2: Explicit Context Refresh

For long conversations, periodically refresh context:

```
Let me summarize where we are:
- We decided on [X]
- We ruled out [Y] because [reason]
- Next step is [Z]

Is this accurate? Any corrections before we continue?
```

### Pattern 3: Scoped Context for Sub-Tasks

When switching tasks within a conversation:

```
New task. For this, focus only on:
- [Relevant context A]
- [Relevant context B]

Ignore our earlier discussion about [unrelated topic].

Task: [specific request]
```

### Pattern 4: The Context Audit

When responses seem off:

```
What context are you using to answer? List:
1. Key facts you're relying on
2. Assumptions you're making
3. Information you wish you had
```

This surfaces context pollution or confusion.

---

## The 2025 State of the Art

According to the [July 2025 Context Engineering Survey](https://arxiv.org/abs/2507.13334):

> *"Best performance comes from modular architectures combining multiple techniques (retrieval, memory, tool use)."*

**Key findings:**
1. **Hybrid approaches win** — Combine RAG + memory + compression
2. **Structure beats volume** — Organized context outperforms more context
3. **Task-specific context** — Different tasks need different context configurations
4. **Continuous refinement** — Context engineering requires ongoing evaluation

---

## Quick Reference: Context Engineering Checklist

Before sending a prompt, ask:

- [ ] **What does the AI need to know?** (Don't assume it knows your context)
- [ ] **What's irrelevant?** (Remove noise)
- [ ] **Are there contradictions?** (Resolve them)
- [ ] **Is this organized?** (Use clear sections)
- [ ] **Am I over-stuffing?** (Less can be more)
- [ ] **Should this be multiple agents/prompts?** (Divide complex tasks)

---

## Further Reading

| Resource | Focus |
|----------|-------|
| [Anthropic: Context Engineering for Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Agent systems, best practices |
| [LangChain: Context Engineering](https://blog.langchain.com/context-engineering-for-agents/) | Framework perspective |
| [LlamaIndex: Context Engineering Guide](https://www.llamaindex.ai/blog/context-engineering-what-it-is-and-techniques-to-consider) | Techniques taxonomy |
| [DataCamp: Context Engineering Guide](https://www.datacamp.com/blog/context-engineering) | Practical examples |
| [Prompt Engineering Guide: Context Engineering](https://www.promptingguide.ai/guides/context-engineering-guide) | Academic/comprehensive |
| [JetBrains: Efficient Context Management](https://blog.jetbrains.com/research/2025/12/efficient-context-management/) | Research perspective |

---

## Key Takeaways

1. **Context > Phrasing** — What you include matters more than how you ask
2. **Less is often more** — Curated context beats comprehensive dumps
3. **Structure is free clarity** — Use sections, tags, clear organization
4. **Watch for pollution** — Bad context perpetuates bad answers
5. **Think like an OS** — You're the memory manager for the AI's RAM

---

*Last updated: December 2025*

*Sources verified: All hyperlinks validated December 2025*
