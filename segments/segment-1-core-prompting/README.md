# Segment 1: Core Prompting & Context Engineering

**Duration:** 50 minutes | **Level:** Intermediate | **Last Updated:** December 2025

## What You're Learning

Master prompt engineering fundamentals and the evolution to **context engineering**—the discipline of configuring everything that fills an AI's context window to achieve reliable, consistent results across sessions and users.

---

## The Shift: Prompt Engineering → Context Engineering

| Prompt Engineering | Context Engineering |
| ------------------ | ------------------- |
| Focus on *what to say* | Focus on *what the model knows* |
| One-off interactions | System-wide reliability |
| Phrasing and examples | Everything in the context window |
| Get a specific response | Ensure consistent behavior |

**Key Insight:** Most AI failures aren't model failures—they're context failures. The model did exactly what you asked; you just didn't provide the right context.

---

## The Context Engineering Stack

Every AI interaction involves multiple layers of context:

1. **System Instructions** – Persistent behavior guidelines
2. **Custom Instructions / Memory** – User preferences and history
3. **Retrieved Information (RAG)** – External knowledge brought in dynamically
4. **Available Tools** – Actions, APIs, connectors the model can use
5. **Conversation History** – Short-term memory of the current session
6. **Attached Files / Knowledge Base** – Documents for grounding responses

---

## Prompting Frameworks

### CRAFT Framework

**C**ontext → **R**ole → **A**ction → **F**ormat → **T**one

```text
Context: I'm preparing a quarterly business review for my VP.
Role: You are a senior business analyst.
Action: Analyze this sales data and identify the top 3 trends.
Format: Executive summary with bullet points, max 200 words.
Tone: Professional and data-driven.
```

### CLEAR Framework

**C**ontext → **L**ength → **E**xamples → **A**nswer format → **R**efine

```text
Context: Our customer support team is overwhelmed with password reset requests.
Length: 2-3 paragraphs
Examples: "Similar solutions at Acme Corp reduced tickets by 40%"
Answer format: Problem → Solution → Implementation steps
Refine: Focus on quick wins under $5K budget
```

---

## Practice Scenarios: WITHOUT Attached Context

These prompts rely purely on the model's training data and your instructions.

### Scenario 1: Executive Email Draft (M365 Copilot)

```text
You are a senior project manager at a Fortune 500 company.

Draft a professional email to stakeholders announcing a 2-week project delay
due to vendor supply chain issues.

Requirements:
- Tone: Apologetic but confident
- Length: 3 short paragraphs
- Include: Revised timeline, mitigation steps already taken, offer to discuss
- Sign off as "Project Lead"
```

### Scenario 2: Meeting Agenda Creation (ChatGPT)

```text
Create a 60-minute quarterly business review meeting agenda.

Attendees: Sales Director, Marketing Lead, Finance Manager, CEO
Topics to cover: Q3 results, Q4 forecasts, budget requests, action items

Format each section with:
- Time allocation
- Owner/presenter
- Key discussion questions
- Expected outcomes
```

### Scenario 3: Code Review Checklist (Gemini)

```text
Act as a staff software engineer with 15 years of experience.

Create a comprehensive code review checklist for a Python REST API project.

Organize into categories:
- Security (critical items first)
- Performance
- Code quality and readability
- Testing requirements
- Documentation

Mark each item as: [Critical] [Important] [Nice-to-have]
```

### Scenario 4: Customer Response Template (M365 Copilot)

```text
You are a Customer Success Manager at a B2B SaaS company.

Write a response template for customers asking about our recent pricing changes.

The template should:
- Acknowledge their concern (1 sentence)
- Explain the value they receive (2-3 sentences)
- Offer to schedule a call to discuss their specific situation
- Keep the total under 150 words
- Include [PLACEHOLDERS] for personalization
```

### Scenario 5: Interview Question Bank (ChatGPT)

```text
Generate 10 behavioral interview questions for a Senior Data Analyst position.

Candidate profile: 3-5 years experience, transitioning from junior role
Focus areas: SQL proficiency, stakeholder communication, problem-solving under pressure

For each question, provide:
1. The question
2. What skill/trait it assesses
3. "What to listen for" guidance for the interviewer
4. A red flag answer to watch out for
```

---

## Practice Scenarios: WITH Attached Context

These demonstrate context engineering—grounding the AI in your specific materials.

### Scenario 6: Multi-Document Synthesis (M365 Copilot Notebook)

**Setup:** Add 5 quarterly reports to a Copilot Notebook

```text
Analyze all documents in this notebook and create:

1. Executive summary (max 500 words) synthesizing key findings
2. Trends that appear across multiple quarters
3. Contradictions or inconsistencies between reports
4. Risks mentioned in any document (ranked by severity)
5. Questions the data raises but doesn't answer

Cite which document each finding comes from using [Q1 Report], [Q2 Report] format.
```

### Scenario 7: Proposal Analysis with Scoring (Gemini)

**Setup:** Upload a vendor proposal PDF

```text
Review the attached vendor proposal and evaluate against our requirements.

Score each criterion 1-5 and provide a RAG status:
- Cost (initial and TCO over 3 years)
- Implementation timeline (we need live by Q2)
- Feature coverage vs. our requirements list
- Vendor stability (references, financials)
- Integration complexity with our existing stack

Output as a comparison table with:
| Criterion | Score | RAG | Notes |

End with: Top 3 concerns and recommended negotiation points.
```

### Scenario 8: Technical Documentation from Code (ChatGPT Projects)

**Setup:** Upload source code files to a ChatGPT Project

```text
Using the code files in this project, create developer documentation.

Include:
1. Architecture overview (how components connect)
2. Setup instructions (prerequisites, environment variables, install steps)
3. API reference for all public functions
4. Common workflows with code examples
5. Troubleshooting guide for likely issues

Target audience: New developer joining the team
Tone: Practical, no fluff, include actual commands to run
```

### Scenario 9: Meeting Follow-Up from Transcript (M365 Copilot)

**Setup:** Reference a Teams meeting recording

```text
From the meeting I just had, create:

1. Executive summary (3 sentences max)
2. Decisions made (bullet list with owner for each)
3. Action items with:
   - Description
   - Owner
   - Due date (infer from discussion)
   - Dependencies
4. Open questions requiring follow-up
5. Parking lot items mentioned but deferred

Format for someone who missed the meeting and has 2 minutes to scan.
```

### Scenario 10: Competitive Analysis Brief (Gemini)

**Setup:** Upload competitor data spreadsheet and product docs

```text
Using the attached competitive data, create an intelligence brief for our
Product Strategy team.

Analysis required:
1. Market positioning map (describe where each competitor sits on price vs. features)
2. Our top 3 competitive advantages with evidence
3. Gaps we need to address (prioritized)
4. Pricing comparison summary
5. Recommended strategic response for next quarter

Format as a slide-ready document with clear headers and bullets.
Keep total under 800 words—this goes to executives.
```

---

## Platform-Specific Context Engineering

### Microsoft 365 Copilot

- **Slash commands**: `/file`, `/meeting`, `/email` to specify context sources
- **Notebooks**: Up to 100 files for deep analysis
- **Auto-grounding**: References your M365 data automatically
- **Tip**: "Using the Q3 Budget spreadsheet..." explicitly guides context

### Google Gemini

- **1M+ token context**: Upload entire codebases or document sets
- **Gems**: Create specialized assistants with persistent context
- **Google Search grounding**: Real-time fact verification
- **Tip**: Gemini excels at cross-referencing multiple large documents

### ChatGPT

- **Projects**: Group files, conversations, and custom instructions
- **Memory**: Learns preferences over time (opt-in)
- **File connectors**: Google Drive, GitHub, OneDrive for live data
- **Tip**: Project-level instructions persist across all conversations in that project

---

## Common Prompting Pitfalls

| Pitfall | Example | Fix |
| ------- | ------- | --- |
| **Vague request** | "Make this better" | "Improve clarity by simplifying sentences over 25 words" |
| **Missing context** | "Write a proposal" | "Write a proposal for [client] addressing [problem] with [solution]" |
| **Format ambiguity** | "Analyze this data" | "Analyze this data and output a markdown table with trends column" |
| **Assumed knowledge** | "Use our standard template" | Attach the template or describe it |
| **Over-prompting** | 500-word instruction | Break into steps; iterate on results |

---

## Hands-On Exercises

1. **CRAFT a Professional Prompt**: Pick a real task from your job and write a prompt using the CRAFT framework
2. **Context Engineering Challenge**: Take a simple prompt and enhance it by specifying what context sources the AI should use
3. **Platform Comparison**: Run the same prompt on M365 Copilot, ChatGPT, and Gemini—compare results
4. **Transform a Bad Prompt**: Take "help me with this email" and turn it into a production-quality prompt
5. **Build Your Prompt Library**: Create 5 reusable templates for tasks you do weekly

---

## Key Takeaways

By the end of this segment, you'll:

- ✅ Write prompts that get useful results on the first try
- ✅ Understand context engineering and why it matters
- ✅ Know when to attach context vs. prompt-only approaches
- ✅ Avoid the top 5 prompting mistakes
- ✅ Have reusable frameworks for any prompting task
- ✅ Configure custom instructions effectively

---

## Resources

- [Prompting Frameworks Guide](../../resources/frameworks.md)
- [Anthropic Context Engineering Guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google Gemini Prompting Guide](https://ai.google.dev/gemini-api/docs/prompting-strategies)

---

*Next: [Segment 2 - Multimodal Prompting](../segment-2-multimodal-prompting/)*
