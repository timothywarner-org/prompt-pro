# Warner's Laws of Generative AI

**Guiding principles for effective AI collaboration and context engineering.**

---

## Core Principles

### Law #1: You are the pilot; the AI is your co-pilot

**Principle**: You're responsible for its actions.

Always maintain ownership of decisions and outputs. The AI augments your capabilities but doesn't replace your judgment or accountability.

### Law #2: Always know who you're signed in as

**Principle**: Identity awareness in enterprise context.

Understand which account, organization, and data boundaries you're operating within. Enterprise AI systems have different permissions, data access, and compliance requirements.

### Law #3: The more you disclose in trust, the more the AI can help

**Principle**: Context builds capability.

Provide sufficient context for the AI to understand your goals, constraints, and domain. The quality of AI assistance is directly proportional to the context you provide.

### Law #4: Anything you leave out will be inferred

**Principle**: Explicit is better than implicit.

Don't assume the AI knows your intent. Missing information leads to assumptions that may not align with your needs. Be explicit about requirements, constraints, and expectations.

---

## Interaction Patterns

### Law #5: Role play like you're a director

**Principle**: Persona prompting and delegation.

Frame requests with specific roles and responsibilities. "Act as a senior DevOps engineer reviewing this infrastructure code" produces better results than generic requests.

### Law #6: Don't swallow the elephant

**Principle**: Break complex tasks into manageable chunks.

Decompose large problems into smaller, sequential steps. AI works best with focused, well-scoped requests rather than overwhelming complexity.

### Law #7: Surgically sculpt your context

**Principle**: Include only what's relevant.

More context isn't always better. Curate your inputs to include relevant information while excluding noise. Quality over quantity.

### Law #8: Always have a trusted LLM to cross-reference

**Principle**: Verification patterns.

Use multiple AI systems to validate critical information. Different models have different strengths, weaknesses, and training cutoff dates.

---

## Workflow Optimization

### Law #9: Strike while the iron's hot

**Principle**: Capture ideas when they emerge.

Document insights, prompts, and patterns immediately. Context and momentum are perishable—record them while fresh.

### Law #10: Every AI chat has its own lifecycle

**Principle**: Develop 'prompt smell'—know when to start fresh.

Recognize when conversation context becomes polluted, contradictory, or unfocused. Start a new thread rather than fighting accumulated confusion.

### Law #11: If you need to remind the AI, add it to custom instructions

**Principle**: Memory management.

Persistent preferences and constraints belong in custom instructions, not repeated in every conversation. Automate what you can.

### Law #12: Periodically refactor your custom instructions

**Principle**: Maintenance patterns.

Review and update your instructions as your needs evolve. Remove outdated guidance, add new patterns, and consolidate redundancies.

### Law #13: Think meta

**Principle**: Prompt about prompting.

Ask the AI how to improve your prompts. Request feedback on your question structure, clarity, and context. Iterate on your approach.

---

## Accessibility & Skills

### Law #14: Use your voice if using words is difficult

**Principle**: Multimodal input.

Leverage voice input, screen sharing, images, and other modalities. The best interface is the one that removes friction from your workflow.

### Law #15: Pick up a good book on technical writing

**Principle**: Clarity fundamentals.

Strong communication skills translate to better prompts. Clear, structured writing produces clear, structured AI responses. Invest in the fundamentals.

---

## Security & Reliability

### Law #16: Protect your LLM against abuse

**Principle**: Security considerations.

Be aware of prompt injection, data leakage, and adversarial inputs. Sanitize user inputs, validate outputs, and understand the security model of your AI tools.

### Law #17: Each LLM has its own personality

**Principle**: Platform-specific approaches.

Different models excel at different tasks. Claude handles nuance well, GPT-4 has broad knowledge, DeepSeek is cost-effective for coding. Match the tool to the task.

### Law #18: Expect breaking changes

**Principle**: Stay agile and adaptable.

AI capabilities, APIs, and behaviors evolve rapidly. Build with flexibility in mind. Monitor deprecations, test updates, and maintain fallback strategies.

---

## Summary

These laws form a framework for **effective AI collaboration**:

- **Ownership**: You're responsible (Laws 1-2)
- **Context**: Quality input drives quality output (Laws 3-4, 7)
- **Technique**: Use proven patterns (Laws 5-6, 13)
- **Verification**: Cross-check and validate (Law 8)
- **Workflow**: Capture, refresh, and refactor (Laws 9-12)
- **Skills**: Build fundamentals (Laws 14-15)
- **Resilience**: Secure and adapt (Laws 16-18)

**Apply these principles to master context engineering and build production-ready AI systems.**

---

_These laws are derived from practical experience teaching thousands of developers to work effectively with AI systems._

**Author**: Tim Warner
**Version**: 1.0
**Last Updated**: October 31, 2025
