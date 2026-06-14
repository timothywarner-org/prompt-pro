# Practical Prompting: Microsoft 365 Copilot

## Real-World Examples for M365 Copilot (December 2025)

> **"Copilot doesn't work like a search engine. You get the best results when you use clear instructions, provide sources, and include specific context and format."** — [Microsoft](https://www.armanino.com/articles/microsoft-365-copilot-success-guide/)

---

## M365 Copilot in 60 Seconds

**What it is:** Microsoft's AI assistant integrated across Microsoft 365 apps (Word, Excel, PowerPoint, Outlook, Teams).

**Key difference from other LLMs:** Copilot works with YOUR data—emails, documents, calendars, Teams chats—within your Microsoft 365 tenant.

**Key strengths:**

- Deep integration with Microsoft 365 apps
- Access to your organizational data
- Enterprise security and compliance
- Context-aware within each application

**Official Resources:**

- [Microsoft Learn: Craft Effective Prompts](https://learn.microsoft.com/en-us/training/paths/craft-effective-prompts-copilot-microsoft-365/)
- [Microsoft Copilot Prompts Gallery](https://m365.cloud.microsoft/copilot-prompts)
- [Azure Copilot Prompting Guide](https://learn.microsoft.com/en-us/azure/copilot/write-effective-prompts)

---

## The Copilot Mindset

**The critical insight:** Copilot needs to know WHERE to look in your data.

From [Microsoft's guidance](https://sharepointdesignworks.com/the-hidden-power-of-prompts-getting-more-from-microsoft-365-copilot/):

> *"If you do not tell Copilot exactly where to look, it will pull from all the Microsoft 365 data that you have access to, leading to unhelpful outputs."*

### The Four Components of a Copilot Prompt

| Component | What It Does | Example |
| --------- | ------------ | ------- |
| **Goal** | What you want to achieve | "Create a summary" |
| **Context** | Background and purpose | "for a sales meeting" |
| **Source** | Where to find the data | "from /Q3 Sales Report.docx" |
| **Expectations** | Format and constraints | "as 5 bullet points" |

---

## Example 1: Word — Document Drafting

### Basic Prompt (Gets Generic Results)

```text
Write a project proposal.
```

### Better Prompt (Gets Useful Results)

```text
Draft a project proposal for migrating our CRM to Dynamics 365.

Context:
- Audience: IT leadership and Finance
- Purpose: Request budget approval
- Timeline: Implementation in Q2 2026

Source: Use details from /IT Strategy 2025.docx and the vendor quote in my recent emails from Microsoft.

Format:
- Executive Summary (1 paragraph)
- Business Case (why we need this)
- Scope and Timeline (table format)
- Budget Request (from the quote)
- Risks and Mitigation
- Next Steps

Tone: Professional, concise, focused on ROI
Length: 2-3 pages
```

**Why this works:**

- Specific goal and audience
- Points to actual source documents
- Clear structure expectations

---

## Example 2: Excel — Data Analysis

### The Task

Analyze sales data and create insights.

### The Prompt (In Excel with Copilot)

```text
Analyze this sales data and tell me:

1. Which product category has the highest revenue?
2. What's the month-over-month growth trend?
3. Are there any outliers or anomalies in the data?
4. Which region is underperforming compared to others?

Then:
- Add a PivotTable showing revenue by category and region
- Create a line chart showing the monthly trend
- Highlight cells where sales dropped more than 10% month-over-month

Summarize your findings in 3 bullet points I can share with leadership.
```

### Formula Help

```text
Create a formula that:
- Calculates commission at 5% of sales in column C
- But only if the salesperson in column A is "Senior"
- For "Junior" salespeople, use 3%
- Handle blank cells by showing 0

Explain the formula so I can modify it later.
```

---

## Example 3: Outlook — Email Management

### Summarizing Email Threads

```text
Summarize this email thread.

Focus on:
- The main decision or request
- Action items and who owns them
- Any deadlines mentioned
- Unresolved questions

Format as bullet points I can quickly scan.
```

### Drafting Responses

```text
Draft a reply to this email that:
- Confirms I received the request
- Sets expectations: I'll respond fully by Friday
- Asks a clarifying question about the budget
- Keeps a professional but friendly tone
- Under 100 words
```

### Meeting Preparation

```text
Look at my calendar for tomorrow and the related email threads.

Create a prep brief for each meeting:
- Meeting purpose
- Key participants and their roles
- Recent context from emails
- Questions I should be prepared to answer
```

---

## Example 4: PowerPoint — Presentation Creation

### From Scratch

```text
Create a presentation about our Q4 marketing results.

Source: Use data from /Q4 Marketing Report.xlsx

Structure:
- Title slide
- Executive summary (key metrics)
- Campaign performance (one slide per major campaign)
- Channel breakdown (table comparing social, email, paid)
- Lessons learned
- Q1 recommendations
- Next steps

Style: Professional, minimal text, data-focused
Slides: Maximum 12

For each data slide, suggest a chart type that best represents the information.
```

### From Document

```text
Create a presentation from /Project Alpha Proposal.docx

Condense the 10-page document into 8 slides:
- 1 title
- 1 problem statement
- 3 solution overview
- 1 timeline
- 1 budget
- 1 call to action

Keep key statistics and quotes. Suggest images for each slide.
```

---

## Example 5: Teams — Meeting Intelligence

### Pre-Meeting

```text
I have a meeting with the Contoso team in 30 minutes.

From my emails and our Teams chat history with them:
- What were the last 3 topics we discussed?
- Are there any open action items from previous meetings?
- What questions might they ask based on recent communications?

Give me 3 talking points to prepare.
```

### Post-Meeting Summary

```text
Summarize the meeting we just had.

Structure:
- Key decisions made
- Action items (who, what, when)
- Open questions that need follow-up
- Next meeting topics

Format this so I can paste directly into the Teams channel.
```

### Chat Catch-Up

```text
I've been away from this Teams channel for a week.

Give me:
- The 5 most important discussions
- Any decisions that were made
- Anything that needs my attention or response
- Topics I can safely skip
```

---

## Example 6: Cross-App Workflows

### Finding Information Across M365

```text
Find all documents and emails from the last month about the "Website Redesign" project.

Summarize:
- Current project status
- Key stakeholders involved
- Recent decisions or changes
- Upcoming deadlines

Create a single summary I can share with my manager who needs a quick update.
```

### Research Task

```text
Our competitor Contoso just launched a new product.

Search my emails and Teams for any mentions of Contoso.
Check our shared documents for competitive analysis files.

Compile:
- What our team already knows
- When we last discussed them
- Any gaps in our competitive intelligence
```

---

## Example 7: Specifying Sources (Critical)

### Good: Specific File References

```text
Using the data in /Sales Q4 2024.xlsx and the template in /Report Template.docx,
create a quarterly sales report.
```

### Good: Specific Email Context

```text
Based on the email thread with subject "Budget Approval - Project Alpha"
from last week, draft a follow-up email.
```

### Good: Limiting Scope

```text
Looking only at Teams messages from the #marketing channel in the past 2 weeks,
summarize the campaign performance discussions.
```

### Bad: No Source Specified

```text
❌ "Summarize our marketing performance"
   (Copilot searches everything—slow and potentially irrelevant)

❌ "What did we decide about the budget?"
   (Which budget? Which meeting? Which team?)
```

---

## Copilot-Specific Techniques

### Iterate, Don't Restart

From [Microsoft's guidance](https://regoconsulting.com/mastering-microsoft-copilot-best-practices-for-prompt-engineering-in-microsoft-365/):

> *"If the first result isn't perfect, build on the existing prompt rather than deleting and starting over."*

```text
Initial: "Create a project timeline"
↓
Refinement: "Make the timeline show dependencies between tasks"
↓
Refinement: "Add milestone markers for the executive review dates"
↓
Refinement: "Change the format to a Gantt chart style"
```

### Include Your Role

```text
I'm a project manager preparing for a steering committee meeting.

[Rest of prompt]
```

This helps Copilot calibrate the level of detail and focus.

### Set Communication Style

```text
Write this in a style that is:
- Professional but conversational
- Direct without being curt
- Uses industry terms (we're a financial services firm)
- Avoids buzzwords and jargon
```

---

## Common Copilot Pitfalls

### Pitfall 1: Treating It Like a Search Engine

```text
❌ "What's in my emails?"

✅ "Find emails from last week about the Henderson contract
   and summarize the key points and any action items."
```

### Pitfall 2: Not Specifying Sources

```text
❌ "Create a report on Q4 sales"

✅ "Create a report on Q4 sales using:
   - Data from /Sales Data Q4.xlsx
   - Template from /Quarterly Report Template.docx
   - Context from the December sales meeting in Teams"
```

### Pitfall 3: Vague Expectations

```text
❌ "Make this better"

✅ "Revise this to:
   - Be more concise (target 50% fewer words)
   - Use active voice
   - Start with the recommendation, then the reasoning"
```

### Pitfall 4: Skipping Education

Microsoft recommends learning prompt engineering before heavy use:

> *"Skipping education on prompting is a mistake. M365 Copilot doesn't work like a search engine."*

Explore the [Copilot Prompts Gallery](https://m365.cloud.microsoft/copilot-prompts) for proven templates.

---

## Prompt Templates for Copilot

### Document Template

```text
Create a [document type] about [topic].

Source: [specific files/emails]

Audience: [who will read this]
Purpose: [what decision or action it supports]

Include:
- [Required section 1]
- [Required section 2]
- [Required section 3]

Format:
- [Length requirement]
- [Tone requirement]
- [Structure requirement]
```

### Analysis Template

```text
Analyze [data/content] from [specific source].

Questions to answer:
1. [Specific question]
2. [Specific question]
3. [Specific question]

Present findings as:
- [Desired format]

Then provide: [recommendations/next steps/summary]
```

### Communication Template

```text
Write [communication type] to [recipient].

Context: [Background they need to know]
Goal: [What you want them to do/understand]
Tone: [Professional/casual/urgent/etc.]

Include:
- [Key point 1]
- [Key point 2]

Constraints:
- Length: [Specification]
- Avoid: [What to leave out]
```

---

## App-Specific Quick Commands

### Word

| Task | Prompt Start |
| ---- | ------------ |
| New document | "Draft a [type] about..." |
| Rewrite | "Make this more [concise/formal/persuasive]" |
| Summarize | "Summarize this document in [format]" |
| Expand | "Add more detail about [section]" |

### Excel

| Task | Prompt Start |
| ---- | ------------ |
| Analyze | "What trends do you see in this data?" |
| Formula | "Create a formula that..." |
| Format | "Format this as a [table type]" |
| Visualize | "Create a chart showing..." |

### PowerPoint

| Task | Prompt Start |
| ---- | ------------ |
| Create | "Create a presentation about..." |
| From doc | "Turn this document into slides" |
| Add slide | "Add a slide that shows..." |
| Design | "Suggest a better layout for..." |

### Outlook

| Task | Prompt Start |
| ---- | ------------ |
| Summarize | "Summarize this thread" |
| Draft | "Draft a reply that..." |
| Coach | "How can I make this email more..." |
| Find | "Find emails about..." |

### Teams

| Task | Prompt Start |
| ---- | ------------ |
| Catch up | "What did I miss in..." |
| Summarize | "Summarize today's meeting" |
| Action items | "What are the action items from..." |
| Prep | "Help me prepare for my meeting with..." |

---

## Quick Reference: Copilot Power Moves

| Situation | Prompt Move |
| --------- | ----------- |
| Need specific data | Reference exact files with `/filename` |
| Across multiple apps | Name the apps and data sources |
| Want consistent format | Provide a template or example |
| First draft disappointing | Iterate with refinements, don't restart |
| Complex request | Break into steps, confirm each before next |
| Need enterprise context | Reference meetings, emails, specific people |
| Time-sensitive | Specify date ranges for searches |

---

## Further Reading

| Resource | Description |
| -------- | ----------- |
| [Craft Effective Prompts (MS Learn)](https://learn.microsoft.com/en-us/training/paths/craft-effective-prompts-copilot-microsoft-365/) | Official training path |
| [Copilot Prompts Gallery](https://m365.cloud.microsoft/copilot-prompts) | Ready-to-use templates |
| [Azure Copilot Prompting](https://learn.microsoft.com/en-us/azure/copilot/write-effective-prompts) | Technical/developer focus |
| [Mastering M365 Copilot](https://regoconsulting.com/mastering-microsoft-copilot-best-practices-for-prompt-engineering-in-microsoft-365/) | Best practices guide |
| [Microsoft Inside Track Tips](https://www.microsoft.com/insidetrack/blog/ten-tips-to-unlock-microsoft-365-copilot-for-your-engineers/) | Tips from Microsoft IT |

---

*Last updated: December 2025*

*Sources verified: All hyperlinks validated December 2025*
