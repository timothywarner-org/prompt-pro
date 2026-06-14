# Practical Prompting: Google Gemini

## Real-World Examples for Google's Gemini (June 2026)

> **"Be precise and direct. State your goal clearly and concisely. Avoid unnecessary or overly persuasive language."** - [Google AI](https://ai.google.dev/gemini-api/docs/prompting-strategies)

---

## Gemini in 60 Seconds

**What it is:** Google's multimodal AI, available via Gemini app, Google Workspace, and API.

**Current models (June 2026):**

- **Gemini 3.5 Pro** - Flagship (~2M context, Deep Think), enhanced instruction understanding
- **Gemini 3.5 Flash** - Fast and efficient (1M context), high-volume tasks
- **Gemini 2.5 Pro** - Previous flagship, excellent reasoning

**Key strengths:**

- Native multimodal (text, images, audio, video)
- Deep Google Workspace integration
- Strong at following complex instructions
- Excellent at coding tasks

**Official Resources:**

- [Gemini Prompt Design Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Gemini for Workspace Guide](https://workspace.google.com/learning/content/gemini-prompt-guide)
- [Google's Prompt Engineering Guide (PDF)](https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf)

---

## The Gemini 3.5 Mindset

**Current generation:** Gemini 3.5 is smarter about understanding intent. Elaborate prompts from Gemini 2.x are often unnecessary now.

From [Google's documentation](https://ai.google.dev/gemini-api/docs/prompting-strategies):

> *"By default, Gemini 3.5 provides direct and efficient answers. If you need a more conversational or detailed response, you must explicitly request it."*

**Three principles for Gemini 3.5:**

1. **Clarity first** - State exactly what you want
2. **Less is often more** - Don't over-engineer prompts
3. **Multimodal is native** - Treat images/audio/video as first-class inputs

---

## Example 1: Workspace Integration (Gmail)

Gemini in Gmail can draft, summarize, and refine emails.

### Basic Prompt

```text
Write a follow-up email.
```

### Better Prompt (In Gmail's "Help me write")

```text
Write a follow-up email to a client.

Context:
- We had a product demo last Tuesday
- They had questions about pricing and implementation timeline
- I want to schedule a follow-up call

Tone: Professional but warm
Length: 3 short paragraphs
Include: Link to our pricing page (I'll add)
```

**Why this works:** Gemini in Workspace knows the app context - you're in Gmail, so it formats as an email. Adding specifics guides the content.

---

## Example 2: Document Analysis (Google Docs)

### The Task

Analyze a lengthy report in Google Docs.

### The Prompt (Using Gemini in Docs)

```text
@doc Summarize this document for someone who has 5 minutes.

Structure as:
- Main thesis (1 sentence)
- Key supporting points (3-4 bullets)
- Data highlights (any notable statistics)
- Recommended actions (if any)
- Questions left unanswered
```

### Follow-Up

```text
Now create an executive summary paragraph I can paste at the top of the document. Keep it under 100 words.
```

**Workspace tip:** `@doc` references the current document. You can also reference other files: `@[filename]`.

---

## Example 3: Multimodal Analysis

Gemini treats images, audio, and video as equal inputs.

### Image Analysis

```text
[Upload image of a whiteboard with diagrams]

This is a photo of our architecture planning session.

Please:
1. Transcribe all text visible on the whiteboard
2. Identify and describe each diagram/shape
3. Recreate this as a structured outline
4. Flag anything that's unclear or illegible
```

### Video Analysis

```text
[Upload video of a presentation]

Watch this 10-minute presentation and provide:
1. A timestamped summary (key point at each timestamp)
2. The main argument being made
3. Evidence/examples used to support it
4. Questions an audience member might ask
```

### Image + Text Combined

```text
[Upload product photo]

Write a product description for this item.

Target audience: Home decorators, 30-50 years old
Tone: Aspirational but not pretentious
Include: Material observations, style category, suggested uses
Length: 150-200 words
```

---

## Example 4: Spreadsheet Analysis (Google Sheets)

### The Task

Analyze sales data in Sheets.

### The Prompt (In Sheets with Gemini)

```text
@sheet Analyze this sales data.

Questions to answer:
1. What's the total revenue by product category?
2. Which month had the highest sales?
3. Are there any outliers or anomalies?
4. What's the trend over time?

Present findings as:
- Summary (3 sentences)
- Key metrics table
- Recommendations (if any patterns suggest action)
```

### Creating Formulas

```text
Create a formula that:
- Calculates the running total of column B
- Highlights cells where the value is 20% above average
- Handles blank cells gracefully

Explain what the formula does.
```

---

## Example 5: Code Generation

### The Task

Generate code for a specific framework.

### The Prompt

```text
Write a Python function using FastAPI that:
1. Accepts a JSON payload with user data
2. Validates required fields (name, email, age)
3. Returns appropriate error messages for validation failures
4. On success, returns the data with an added timestamp

Include:
- Type hints
- Pydantic models for validation
- OpenAPI docstrings
- A simple test example

Follow Google's Python style guide.
```

**Gemini coding strength:** It understands Google's internal coding styles and frameworks deeply.

---

## Example 6: Structured Output Control

Gemini 3.5 excels at producing structured output.

### JSON Output

```text
Analyze this customer feedback and return structured data.

Feedback: "The app crashes every time I try to upload a photo. This has been happening for a week. Otherwise love the product!"

Return as JSON with this exact schema:
{
  "sentiment": "positive|negative|mixed",
  "category": "string",
  "severity": "low|medium|high",
  "summary": "string (max 50 words)",
  "action_items": ["string"],
  "positive_mentions": ["string"],
  "negative_mentions": ["string"]
}
```

### Table Output

```text
Compare these three project management tools: Asana, Monday.com, Notion.

Create a comparison table with columns:
| Feature | Asana | Monday.com | Notion |
Including rows for: Pricing, Best for, Limitations, Integration quality, Learning curve

End with a 1-sentence recommendation for a 20-person marketing team.
```

---

## Example 7: Few-Shot with Gemini

From [Google's documentation](https://ai.google.dev/gemini-api/docs/prompting-strategies):

> *"Using examples to show the model a pattern to follow is more effective than using examples to show the model an anti-pattern to avoid."*

### Effective Few-Shot

```text
Classify customer support tickets by priority.

Examples:

Ticket: "Website is completely down, nobody can access it"
Priority: P1-Critical

Ticket: "The export button doesn't include all columns"
Priority: P3-Low

Ticket: "Login is slow but working"
Priority: P2-Medium

Now classify:

Ticket: "Payment processing failing for all users"
Priority:
```

**Note:** 3-5 examples typically work well. Too many examples can cause overfitting.

---

## Gemini 3.5 Specific Tips

### Temperature Setting

From [Google's guide](https://ai.google.dev/gemini-api/docs/prompting-strategies):

> *"When using Gemini 3.5 models, Google strongly recommends keeping the temperature at its default value of 1.0. Changing the temperature may lead to unexpected behavior, particularly in complex mathematical or reasoning tasks."*

Leave temperature at default unless you have a specific reason.

### Request Verbosity Explicitly

Gemini 3.5 defaults to concise:

```text
❌ "Explain machine learning" → Gets brief answer

✅ "Explain machine learning in detail. Include:
 - Historical context
 - Key concepts with examples
 - Current applications
 - Future directions

   This is for a technical audience, so don't oversimplify."
```

### Consistent Delimiters

Pick one format and stick with it:

```text
Option A: XML tags
<context>...</context>
<task>...</task>

Option B: Markdown headers
## Context
...
## Task
...
```

Don't mix styles in a single prompt.

---

## Workspace-Specific Prompts

### In Google Docs

```text
Help me write
- A proposal for [project name]
- For audience: [executive team]
- Tone: persuasive but factual
- Include sections: Problem, Solution, Timeline, Budget
- Length: 2 pages
```

### In Google Slides

```text
Create a presentation outline on [topic]
- 10 slides
- Include: title slide, agenda, 6 content slides, summary, Q&A
- Suggest an image or chart for each content slide
- Tone: professional but engaging
```

### In Google Sheets

```text
Help me create a formula that:
- Looks up [value] in column A
- Returns the corresponding value from column C
- If not found, returns "N/A"
- Works with partial matches
```

### In Gmail

```text
Help me write a response to this email that:
- Declines the meeting request
- Suggests an alternative time next week
- Keeps a positive relationship
- Under 100 words
```

---

## Common Gemini Pitfalls

### Pitfall 1: Over-Engineering Prompts for Gemini 3.5

If you wrote elaborate prompts for Gemini 2.x:

```text
❌ Long, detailed prompts with excessive context

✅ Clear, direct prompts with necessary context only
```

Gemini 3.5 understands intent better - elaborate scaffolding often isn't needed.

### Pitfall 2: Not Leveraging Multimodal

Gemini is natively multimodal. Instead of describing:

```text
❌ "I have a chart showing revenue growth of 15% year over year..."

✅ [Upload the chart] "Analyze this revenue chart and summarize the trends"
```

### Pitfall 3: Ignoring Workspace Context

In Google Workspace, Gemini knows where you are:

```text
❌ "Write an email" (in Gmail - redundant)

✅ "Write a meeting request for 3pm Tuesday about project Alpha"
   (Gemini knows it's an email, who you're emailing based on thread)
```

### Pitfall 4: Not Specifying Output Format

Gemini 3.5 defaults to concise. Be explicit:

```text
❌ "Summarize this document"

✅ "Summarize this document as:
 - 1 paragraph overview
 - 5 key bullet points
 - A table of key metrics"
```

---

## Prompt Templates for Gemini

### Analysis Template

```text
Analyze [content/data/image].

Focus on:
1. [Specific aspect]
2. [Specific aspect]
3. [Specific aspect]

Output format:
- Summary: [2-3 sentences]
- Findings: [bullet list]
- Recommendations: [numbered list]
- Confidence: [high/medium/low on each finding]
```

### Generation Template

```text
Create [content type] about [topic].

Requirements:
- Audience: [who]
- Tone: [how]
- Length: [how much]
- Include: [required elements]
- Avoid: [what to skip]

Structure as:
[desired format/sections]
```

### Multimodal Template

```text
[Upload file(s): image/video/audio]

Please [action verb] this [content type].

Questions to answer:
1. [Question]
2. [Question]

Format response as:
[desired structure]
```

---

## Quick Reference: Gemini Power Moves

| Situation | Prompt Move |
|-----------|-------------|
| In Workspace | Use app context (Gmail knows you want email) |
| Need detail | "Explain in depth, including..." |
| Visual content | Upload, don't describe |
| Want structure | Specify exact format (JSON, table, list) |
| Multiple files | Reference with @[filename] |
| Need accuracy | "Cite sources" or "Only state what you can verify" |
| Complex task | Break into steps, use "Let's think step by step" |
| Gemini 3.5 | Simplify - it understands better |

---

## Further Reading

| Resource | Description |
|----------|-------------|
| [Gemini API Prompting Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | Official developer guide |
| [Gemini for Workspace Guide](https://workspace.google.com/learning/content/gemini-prompt-guide) | Workspace-specific tips |
| [Google's Prompting Guide PDF](https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf) | Downloadable reference |
| [Google Cloud Gemini Tips](https://cloud.google.com/gemini/docs/discover/write-prompts) | Enterprise/cloud focus |
| [Getting Started with Gemini](https://www.promptingguide.ai/models/gemini) | Third-party guide |

---

*Last updated: June 2026*

*Sources verified: All hyperlinks validated June 2026*
