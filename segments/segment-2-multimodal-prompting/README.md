# Segment 2: Multimodal Prompting & AI-Assisted Coding

**Duration:** 50 minutes | **Level:** Intermediate | **Last Updated:** December 2025

## What You're Learning

Go beyond text to master visual AI tools and AI-assisted coding. Learn image generation, vision analysis, and how to configure GitHub Copilot for maximum productivity using custom instructions and prompt files.

---

## Part A: Image Generation (2025 Landscape)

| Tool | Best For | Text-in-Image | Access |
|------|----------|---------------|--------|
| **Gemini Imagen 3** | Factual imagery, infographics | Excellent | Gemini Advanced |
| **M365 Designer** | Brand-aligned business visuals | Good | M365 subscription |
| **DALL-E 3** | Conversational refinement | Good | ChatGPT Plus |
| **Midjourney** | Creative/artistic quality | Limited | Midjourney subscription |

---

### Google Gemini + Imagen 3

**Model Options:**
- **Imagen 3**: State-of-the-art quality via Gemini
- **Nano Banana Pro**: Advanced model with superior text rendering and reasoning

**Key Capabilities:**
- High-resolution output (up to 4K)
- Accurate text in images (menus, diagrams, infographics)
- SynthID watermarking for AI-generated content identification

**Quick-Win Prompts:**

```text
Create a professional infographic showing 5 steps of customer onboarding.
Modern, clean design with blue and white colors. Include numbered steps
with icons: 1) Sign Up, 2) Verify Email, 3) Complete Profile, 4) Choose Plan,
5) Start Using. Horizontal layout for presentation slides.
```

```text
Generate a social media graphic for LinkedIn announcing Q4 results.
Include the text "Revenue up 23%" prominently displayed.
Style: corporate but modern, use green to indicate growth.
Aspect ratio: 1200x627 pixels.
```

---

### Microsoft 365 Designer / Copilot Image Creator

Best for brand-aligned visuals integrated with your M365 workflow.

**Quick-Win Prompts:**

```text
Create a PowerPoint slide background about digital transformation.
Style: abstract, professional, subtle gradients in blue tones.
Leave clean space on the right side for text overlay.
No text in the image itself.
```

```text
Design a Teams meeting background that looks like a modern professional
office with natural lighting. Slightly blurred to not distract from speaker.
Neutral colors that work with any brand palette.
```

---

### ChatGPT + DALL-E 3

Best for iterative refinement through conversation.

**Quick-Win Prompts:**

```text
Create a hero image for a SaaS landing page. Show a diverse team of
professionals collaborating around a digital dashboard. Modern office
setting, warm natural lighting, optimistic mood.

After you generate it, I'll give feedback to refine specific elements.
```

```text
Generate a before/after comparison image for a productivity app.
Left side: cluttered desk with papers, stressed person.
Right side: clean desk with laptop showing the app, person smiling.
Split-screen style, same person in both frames.
```

---

## Part B: Vision Prompting (Analyzing Images)

### Document & Chart Analysis

**Scenario: Extract Data from Charts**

```text
[Upload chart image]

Analyze this chart and provide:
1. Exact data values for each category/data point
2. Trend direction (increasing/decreasing/stable)
3. Any anomalies or outliers
4. 2-3 sentence interpretation for an executive summary

Output the data as a markdown table.
```

**Scenario: Process Receipts/Invoices**

```text
[Upload receipt image]

Extract all information:
- Vendor name and address
- Date and time
- Line items with quantities and prices
- Subtotal, tax, total
- Payment method

Format as JSON for expense system import.
```

---

### Code & Architecture Vision

**Scenario: Code Screenshot Analysis**

```text
[Upload code screenshot]

Analyze this code:
1. Identify the programming language and framework
2. Explain what it does (junior developer audience)
3. Point out bugs, security issues, or anti-patterns
4. Suggest specific improvements with code examples
```

**Scenario: Whiteboard to Implementation**

```text
[Upload whiteboard photo]

Convert this whiteboard sketch into:
1. Written description of the system architecture
2. Key components and their responsibilities
3. Data flow between components
4. Suggested tech stack for implementation
5. Questions to clarify before building
```

**Scenario: Error Screenshot Debugging**

```text
[Upload error screenshot]

Help me understand this error:
- What the error message means
- Most likely cause based on visible code
- Step-by-step debugging approach
- Common fixes for this type of error
```

---

## Part C: GitHub Copilot Configuration

GitHub Copilot's effectiveness depends heavily on context. Use these configuration files to customize behavior for your projects.

### Repository Instructions (`.github/copilot-instructions.md`)

This file provides project-wide context to Copilot for all interactions.

**Example: Next.js TypeScript Project**

```markdown
# GitHub Copilot Instructions

## Project Context
Next.js 14 application with TypeScript, Prisma ORM, and PostgreSQL.
We use Tailwind CSS for styling and React Query for server state.

## Code Style
- Functional components with hooks only (no class components)
- Named exports over default exports
- Arrow functions for component definitions
- TypeScript interfaces required for all props
- Absolute imports using `@/` prefix

## Naming Conventions
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- Constants: SCREAMING_SNAKE_CASE
- Database models: PascalCase singular (User, not Users)

## Testing
- Unit tests required for all new utilities
- React Testing Library for components
- Mock external APIs, never call real endpoints

## Security
- Never log sensitive data (passwords, tokens, PII)
- Always validate and sanitize user input
- Use parameterized queries (Prisma handles this)
```

**Example: Python Data Science Project**

```markdown
# GitHub Copilot Instructions

## Project Context
Data analysis pipeline using pandas, numpy, scikit-learn.
Python 3.11+. Poetry for dependency management.

## Code Style
- PEP 8 strict compliance
- Type hints for all function signatures
- Google-style docstrings
- Max line length: 100 characters

## Data Handling
- pathlib for file paths (never string concatenation)
- Chunked loading for datasets > 1GB
- Validate schemas before processing
- Log data quality issues, don't silently drop rows

## Naming
- Functions: snake_case verbs (calculate_metrics, load_data)
- Classes: PascalCase nouns (DataProcessor, ModelTrainer)
- Variables: descriptive snake_case (customer_df, not df1)

## Performance
- Vectorized operations over loops
- Generators for large sequences
- Profile before optimizing
```

---

### Prompt Files (`.github/prompts/*.prompt.md`)

Reusable prompts for specific tasks. Access via `#` in Copilot Chat.

**File: `.github/prompts/code-review.prompt.md`**

```markdown
---
mode: agent
description: Comprehensive code review
---

Review the selected code for:

## Security
- Input validation vulnerabilities
- Authentication/authorization issues
- Data exposure risks

## Performance
- Unnecessary computations
- N+1 query patterns
- Memory inefficiencies

## Maintainability
- Code duplication
- Complex conditionals needing simplification
- Missing error handling

## Testing
- Edge cases not covered
- Missing test scenarios

Provide specific, actionable feedback with code examples.
```

**File: `.github/prompts/refactor.prompt.md`**

```markdown
---
mode: agent
description: Refactor following SOLID principles
---

Refactor the selected code:

1. **Single Responsibility**: Each function/class does one thing
2. **Open/Closed**: Extend without modifying existing code
3. **Dependency Inversion**: Depend on abstractions

Steps:
1. Identify principle violations
2. Propose refactored structure
3. Implement the refactoring
4. Verify existing tests pass
```

**File: `.github/prompts/document.prompt.md`**

```markdown
---
mode: agent
description: Generate documentation from code
---

Generate documentation for the selected code:

For each function/endpoint:
- **Description**: What it does (1-2 sentences)
- **Parameters**: Name, type, required/optional, description
- **Returns**: Type and description
- **Errors**: Possible error conditions
- **Example**: Usage example

Format: Markdown with code blocks.
```

---

### Using Prompt Files

1. **Create folder**: `.github/prompts/`
2. **Add files**: `*.prompt.md` with YAML frontmatter
3. **Access in Copilot Chat**: Type `#` to see available prompts
4. **Select code context**: Highlight code, then invoke prompt

**Example Workflow:**

```text
1. Open file with code to review
2. Select the function or class
3. Open Copilot Chat
4. Type: #code-review
5. Copilot performs review using your template
```

---

## Part D: Quick Reference Formulas

### Image Generation Formula

```text
[Style] + [Subject] + [Setting] + [Mood/Lighting] + [Technical Specs]

Example:
"Professional corporate photography, diverse team collaborating,
modern conference room with city view, warm natural lighting,
16:9 aspect ratio, high resolution"
```

### Vision Analysis Formula

```text
[What to analyze] + [Specific outputs] + [Format] + [Audience]

Example:
"Analyze this architecture diagram. List all components and data flows.
Output as numbered list. Technical audience evaluating the design."
```

---

## Hands-On Exercises

1. **Image Generation Comparison**: Create the same visual using Gemini, M365 Designer, and DALL-E 3
2. **Vision Analysis**: Extract data from a chart screenshot and validate accuracy
3. **Copilot Setup**: Create `.github/copilot-instructions.md` for your project
4. **Prompt Library**: Build 3 reusable `.prompt.md` files for common tasks
5. **Code Vision**: Have AI explain a code screenshot to a non-technical stakeholder

---

## Key Takeaways

By the end of this segment, you'll:

- Generate professional visuals without design skills
- Extract data and insights from images instantly
- Configure GitHub Copilot with project-specific instructions
- Build reusable prompt files for consistent code assistance
- Know which visual AI tool to use for each task

---

## Tools We'll Use

| Tool | Best For | Access |
|------|----------|--------|
| **Gemini + Imagen 3** | Text-in-image, factual imagery | Gemini Advanced |
| **M365 Designer** | Brand-aligned business visuals | M365 subscription |
| **DALL-E 3** | Conversational refinement | ChatGPT Plus |
| **GPT-4 Vision** | Image understanding | ChatGPT Plus |
| **GitHub Copilot** | Code assistance with custom context | Copilot subscription |

---

## Resources

- [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [GitHub Copilot Prompt Files](https://docs.github.com/en/copilot/customizing-copilot/using-prompt-files)
- [Google Imagen Documentation](https://ai.google.dev/gemini-api/docs/imagen)
- [Microsoft Designer](https://designer.microsoft.com/)
- [OpenAI DALL-E Guide](https://platform.openai.com/docs/guides/images)

---

*Next: [Segment 3 - AI Workspaces](../segment-3-ai-notebooks/)*
