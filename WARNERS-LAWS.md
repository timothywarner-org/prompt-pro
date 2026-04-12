# Warner's Laws of Generative AI

**Guiding principles for effective AI collaboration and context engineering.**

---

## Identity & Ownership

### Law #1: You are the pilot; the AI is your co-pilot

**Principle**: You're responsible for its actions.

Always maintain ownership of decisions and outputs. The AI augments your capabilities but doesn't replace your judgment or accountability.

### Law #2: Always know who you're signed in as

**Principle**: Identity awareness in enterprise context.

Understand which account, organization, and data boundaries you're operating within. Enterprise AI systems have different permissions, data access, and compliance requirements.

---

## Mindset & Cognition

### Law #3: Beware the anchor trap — draft before you prompt

**Principle**: Preserve independent judgment.

Write your own answer sketch before you prompt. Once the AI sets the frame, your edits orbit its version, not yours. The first AI output becomes a psychological anchor you can't unsee — drafting first keeps your thinking genuinely independent.

### Law #4: Trust your gut — never hesitate to second-guess the AI

**Principle**: Human intuition is a feature, not a bug.

If something the AI produces feels off, it probably is. Your domain expertise and lived experience are signals the model doesn't have. Push back, ask for reasoning, request alternatives. A confident-sounding answer is not a correct answer.

### Law #5: Every AI chat has its own lifecycle

**Principle**: Develop "prompt smell" — know when to start fresh.

Recognize when conversation context becomes polluted, contradictory, or unfocused. Start a new thread rather than fighting accumulated confusion.

---

## Context & Input

### Law #6: The more you disclose in trust, the more the AI can help

**Principle**: Context builds capability.

Provide sufficient context for the AI to understand your goals, constraints, and domain. The quality of AI assistance is directly proportional to the context you provide.

### Law #7: Anything you leave out will be inferred

**Principle**: Explicit is better than implicit.

Don't assume the AI knows your intent. Missing information leads to assumptions that may not align with your needs. Be explicit about requirements, constraints, and expectations.

### Law #8: Surgically sculpt your context

**Principle**: Include only what's relevant.

More context isn't always better. Curate your inputs to include relevant information while excluding noise. Quality over quantity.

---

## Technique

### Law #9: Role play like you're a director

**Principle**: Persona prompting and delegation.

Frame requests with specific roles and responsibilities. "Act as a senior DevOps engineer reviewing this infrastructure code" produces better results than generic requests.

### Law #10: Don't swallow the elephant

**Principle**: Break complex tasks into manageable chunks.

Decompose large problems into smaller, sequential steps. AI works best with focused, well-scoped requests rather than overwhelming complexity.

### Law #11: Show, don't tell — lead with examples

**Principle**: Few-shot prompting outperforms instructions alone.

Providing two to five concrete examples of the output you want consistently beats describing the format in words. Paste in a sample email, report row, or table structure and the AI will mirror its shape far more accurately than if you describe it.

### Law #12: Make the AI show its work

**Principle**: Chain-of-thought reasoning reduces errors.

For any multi-step or analytical task, explicitly instruct the model to reason step by step before giving a final answer. Asking it to think aloud dramatically reduces confident-sounding errors on anything comparative, numerical, or logical.

### Law #13: Think meta — prompt about prompting

**Principle**: Use the AI to improve your own prompts.

Ask the AI how to improve your prompts. Request feedback on your question structure, clarity, and context. Iterate on your approach.

---

## Iteration & Workflow

### Law #14: Strike while the iron's hot

**Principle**: Capture ideas when they emerge.

Document insights, prompts, and patterns immediately. Context and momentum are perishable — record them while fresh.

### Law #15: If you need to remind the AI, add it to custom instructions

**Principle**: Memory management.

Persistent preferences and constraints belong in custom instructions, not repeated in every conversation. Automate what you can.

### Law #16: Periodically refactor your custom instructions

**Principle**: Maintenance patterns.

Review and update your instructions as your needs evolve. Remove outdated guidance, add new patterns, and consolidate redundancies.

### Law #17: Treat prompts as assets — version-control them

**Principle**: Prompt drift is a regression risk.

The difference between a good prompt and a great prompt is usually a dozen small edits. Name your prompts, date them, note what changed. High-value prompts are organizational IP — version-control them and test them against model updates the same way you'd test software after a dependency upgrade.

---

## Multimodal & Accessibility

### Law #18: Use your voice if using words is difficult

**Principle**: Multimodal input.

Leverage voice input, screen sharing, images, and other modalities. The best interface is the one that removes friction from your workflow.

### Law #19: Pick up a good book on technical writing

**Principle**: Clarity fundamentals.

Strong communication skills translate to better prompts. Clear, structured writing produces clear, structured AI responses. Invest in the fundamentals.

### Law #20: Always have a trusted LLM to cross-reference

**Principle**: Verification patterns.

Use multiple AI systems to validate critical information. Different models have different strengths, weaknesses, and training cutoff dates.

---

## Security & Privacy

### Law #21: Protect your LLM against abuse

**Principle**: Security considerations.

Be aware of prompt injection, data leakage, and adversarial inputs. Sanitize user inputs, validate outputs, and understand the security model of your AI tools.

### Law #22: Protect privacy ruthlessly

**Principle**: Data hygiene is non-negotiable.

Never paste personal, confidential, or customer data into public or free-tier AI tools. Know your chat storage policies, data retention windows, licensing terms, and usage telemetry. Treat every prompt as potentially logged and retrievable.

---

## Agentic Workflows

### Law #23: Each LLM has its own personality

**Principle**: Platform-specific approaches.

Different models excel at different tasks. Claude handles nuance well, GPT-4 has broad knowledge, DeepSeek is cost-effective for coding. Match the tool to the task.

### Law #24: Orchestrate subagents as force multipliers

**Principle**: Delegate, parallelize, and conquer.

If your environment supports subagents, use them. Spin up specialized agents for security review, code analysis, testing, and documentation in parallel rather than working through tasks sequentially. Use git worktrees for multi-level parallelism so agents operate on isolated copies without blocking each other. The best prompt engineers don't just talk to one AI — they conduct an orchestra.

### Law #25: Checkpoint before consequence

**Principle**: Reversibility is a design requirement.

Insert a human-in-the-loop gate or a reversible state snapshot before any agent action that cannot be undone in under 30 seconds. This maps to git commits before risky refactors, database transaction points, and infrastructure-as-code snapshots. Autonomous does not mean unsupervised.

---

## Resilience

### Law #26: Expect breaking changes

**Principle**: Stay agile and adaptable.

AI capabilities, APIs, and behaviors evolve rapidly. Build with flexibility in mind. Monitor deprecations, test updates, and maintain fallback strategies.

---

## Summary

These laws form a framework for **effective AI collaboration**:

- **Identity & Ownership**: You're responsible (Laws 1-2)
- **Mindset & Cognition**: Think before you prompt (Laws 3-5)
- **Context & Input**: Quality in, quality out (Laws 6-8)
- **Technique**: Proven prompting patterns (Laws 9-13)
- **Iteration & Workflow**: Capture, refine, and maintain (Laws 14-17)
- **Multimodal & Accessibility**: Expand your input modes (Laws 18-20)
- **Security & Privacy**: Protect yourself and your data (Laws 21-22)
- **Agentic Workflows**: Orchestrate, parallelize, and checkpoint (Laws 23-25)
- **Resilience**: Stay current (Law 26)

**Apply these principles to master context engineering and build production-ready AI systems.**

---

_These laws are derived from practical experience teaching thousands of professionals to work effectively with AI systems._

**Author**: Tim Warner
**Version**: 2.0
**Last Updated**: April 2026
