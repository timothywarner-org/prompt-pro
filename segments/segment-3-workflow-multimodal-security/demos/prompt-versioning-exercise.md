# Prompt Versioning Exercise

**Law covered:** 17 (Prompt Versioning)
**Time:** 15 minutes
**Tools:** Any LLM (ChatGPT, Claude, or Gemini) plus a Git client

## Objective

Build a prompt library with three versions of a "weekly status report" prompt. Run all three against the same LLM and observe how each iteration improves output quality. Then store the library in a Git repository to practice treating prompts as versioned artifacts.

## The Scenario

Contoso Robotics department leads submit weekly status reports to CEO Maria Chen. The current process is inconsistent -- each department uses a different format, level of detail, and tone. You have been asked to create a standard prompt that any department lead can use to generate their weekly report.

## The Prompt Library

### Version 1 -- Bare Minimum

**Date:** 2026-01-15
**Changelog:** Initial draft. Minimal guidance, no structure specified.

```
Write a weekly status report for my department.
```

**Known issues:** No role, no format, no context about the company or audience. The model will guess at everything.

---

### Version 2 -- Role and Format Constraints

**Date:** 2026-02-03
**Changelog:** Added role assignment, explicit format requirements, and audience context. Addresses feedback that v1 outputs varied wildly in length and structure.

```
You are a department lead at Contoso Robotics, a mid-size robotics
manufacturer in Austin, TX (500 employees, $120M revenue).

Write a weekly status report for CEO Maria Chen covering the week of
[DATE RANGE]. Use this structure:

1. Department name and lead name
2. Top 3 accomplishments this week
3. KPIs with current values and week-over-week trend (up/down/flat)
4. Active blockers (if none, state "No active blockers")
5. Top 3 priorities for next week

Constraints:
- Maximum 400 words
- Use bullet points, not paragraphs
- Quantify results wherever possible (percentages, dollar amounts, counts)
- Flag any item that requires CEO decision with [ACTION NEEDED]
```

**Known issues:** Better structure, but the model still has no example of what "good" looks like. Tone and specificity still vary.

---

### Version 3 -- Few-Shot Example Added

**Date:** 2026-03-10
**Changelog:** Added a concrete example report to anchor tone, specificity, and formatting. Addresses feedback that v2 outputs were structurally correct but lacked the right level of detail.

```
You are a department lead at Contoso Robotics, a mid-size robotics
manufacturer in Austin, TX (500 employees, $120M revenue).

Write a weekly status report for CEO Maria Chen covering the week of
[DATE RANGE]. Use this structure:

1. Department name and lead name
2. Top 3 accomplishments this week
3. KPIs with current values and week-over-week trend (up/down/flat)
4. Active blockers (if none, state "No active blockers")
5. Top 3 priorities for next week

Constraints:
- Maximum 400 words
- Use bullet points, not paragraphs
- Quantify results wherever possible (percentages, dollar amounts, counts)
- Flag any item that requires CEO decision with [ACTION NEEDED]

Here is an example of a well-written report in this format:

---
**Engineering -- Sarah Park**
**Week of March 3-7, 2026**

**Accomplishments**
- Completed RoboAssist Pro 3000 firmware v2.4 certification (2 days ahead of schedule)
- Reduced assembly line defect rate from 2.1% to 1.4% through sensor calibration update
- Onboarded 3 new embedded systems engineers (team now at 42/45 headcount target)

**KPIs**
- Sprint velocity: 87 points (up from 79 last week)
- Open P1 bugs: 4 (down from 7)
- Test coverage: 91% (flat)

**Blockers**
- [ACTION NEEDED] Supplier delay on LiDAR modules may push Q2 production start by 2 weeks. Need CEO approval to engage backup supplier at 12% cost premium.

**Next Week Priorities**
- Begin integration testing for RoboAssist Pro 3000 with warehouse management systems
- Interview 2 final candidates for embedded systems lead role
- Present Q2 roadmap draft to product team
---

Now write a similar report for the [DEPARTMENT] department.
```

## Exercise Instructions

### Step 1 -- Run All Three Versions

Open your preferred LLM and run each version in a separate conversation. For all three, use the same department context:

- Department: Sales
- Date range: Week of April 6-10, 2026

For v1, just send it as-is. For v2 and v3, replace `[DATE RANGE]` with "April 6-10, 2026" and `[DEPARTMENT]` (in v3) with "Sales."

### Step 2 -- Compare Outputs

Evaluate each output:

| Criteria | v1 | v2 | v3 |
|----------|----|----|-----|
| Correct structure (5 sections) | | | |
| Quantified metrics | | | |
| Appropriate length (under 400 words) | | | |
| Actionable next-week priorities | | | |
| Consistent tone with the example | | | |
| Would Maria Chen find this useful? | | | |

### Step 3 -- Store in Git

Create a local Git repository to house your prompt library:

```bash
mkdir contoso-prompt-library
cd contoso-prompt-library
git init

# Create the prompt file with v1 content
cat > weekly-status-report.md << 'EOF'
# Weekly Status Report Prompt
## Version 1 -- 2026-01-15
Write a weekly status report for my department.
EOF

git add weekly-status-report.md
git commit -m "feat: add weekly status report prompt v1"

# Now update the file with v2 content and commit
# Then update with v3 content and commit
# Use git log and git diff to see the evolution
```

After committing all three versions:

```bash
# View the full history
git log --oneline

# See what changed between v1 and v2
git diff HEAD~2 HEAD~1 -- weekly-status-report.md

# See what changed between v2 and v3
git diff HEAD~1 HEAD -- weekly-status-report.md
```

### Step 4 -- Discussion

1. At what point did the output become "good enough" for Contoso's needs? Was v2 sufficient, or was the few-shot example in v3 necessary?
2. What other metadata would you track alongside each version? (Author, target model, temperature setting, expected output length?)
3. How would you handle branching -- for example, if Sales and Engineering need slightly different report prompts?
4. What is the maintenance cost of a prompt library? Who owns it at a company like Contoso?

## Key Takeaways

- Prompts are artifacts that improve through iteration, just like code.
- Versioning with dates and changelogs creates accountability and enables rollback.
- Few-shot examples are often the highest-leverage improvement you can make to a prompt.
- Git is a natural fit for prompt libraries: you get history, diffs, branching, and collaboration for free.
