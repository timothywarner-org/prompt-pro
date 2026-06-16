# Custom Instructions Lifecycle

**Laws covered:** 15 (Custom Instructions), 16 (Refactoring Instructions)
**Time:** 15 minutes
**Platform:** ChatGPT Projects

## Objective

Create a ChatGPT Project for a "Contoso Robotics Marketing Manager" persona, first with bloated custom instructions (v1), then with refactored instructions (v2). Compare output quality to see how instruction clarity directly affects response quality.

## Setup

1. Open ChatGPT and navigate to **Projects** in the left sidebar.
2. Click **New Project** and name it `Contoso Marketing Manager - v1`.
3. Open the file `data/contoso-custom-instructions-v1.txt` from this repository.

## Part 1: The Bloated Instructions (v1)

### Step 1 -- Paste the v1 Instructions

Copy the full contents of `data/contoso-custom-instructions-v1.txt` into the Project's custom instructions field.

Read through the instructions before pasting. Notice:

- Repeated guidance about "professional tone" appearing in three separate places
- Contradictory direction (one paragraph says "keep responses brief," another says "always provide comprehensive detail")
- Vague phrases like "make it good" and "be helpful"
- No structure -- just a wall of text
- Redundant context about the company repeated across paragraphs

### Step 2 -- Test with a Standard Prompt

Send this prompt to the project:

```text
Write a one-page product announcement for our new WarehouseBot Pro
warehouse automation robot. Target audience is logistics managers at
mid-size distribution centers.
```

Save the response. Note:

- How long did ChatGPT take to process the instructions?
- Is the tone consistent throughout the response?
- Did it follow all the (contradictory) guidelines?
- How relevant is the output to Contoso's actual business?

### Step 3 -- Test with a Follow-Up

Send this follow-up in the same conversation:

```text
Now create 3 social media posts promoting the same product for LinkedIn.
```

Note whether the response maintains consistency with the first output or drifts.

## Part 2: The Refactored Instructions (v2)

### Step 4 -- Create a Second Project

1. Create a new project: `Contoso Marketing Manager - v2`.
2. Open `data/contoso-custom-instructions-v2.txt` from this repository.
3. Paste the v2 instructions into the custom instructions field.

Read through v2 and compare to v1:

- Structured with clear sections
- No contradictions
- Specific, measurable guidance
- About one-third the length

### Step 5 -- Repeat the Same Prompts

Send the identical product announcement prompt:

```text
Write a one-page product announcement for our new WarehouseBot Pro
warehouse automation robot. Target audience is logistics managers at
mid-size distribution centers.
```

Then the same follow-up:

```text
Now create 3 social media posts promoting the same product for LinkedIn.
```

## Part 3: Compare and Discuss

### Side-by-Side Evaluation

Open both project conversations and compare outputs on these dimensions:

| Dimension | v1 Output | v2 Output |
|-----------|-----------|-----------|
| Tone consistency | | |
| Relevance to Contoso's business | | |
| Specificity of claims and details | | |
| Formatting and structure | | |
| Actionability for the target audience | | |
| Adherence to instructions | | |

### Discussion Questions

1. Which version produced more consistent output across the two prompts? Why?
2. Did the v1 contradictions cause visible problems in the output, or did the model silently pick one direction?
3. What is the cost of vague instructions -- not in tokens, but in revision cycles?
4. How would you approach refactoring custom instructions you inherited from a colleague?

## Key Takeaways

- Longer instructions are not better instructions. Clarity and structure outperform volume.
- Contradictions in custom instructions force the model to guess, producing inconsistent results.
- Refactoring custom instructions is a high-leverage activity: you do it once and every future conversation benefits.
- Structured formats (sections, bullet points, constraints) give the model unambiguous guidance.

## Instructor Notes

- If time is short, skip Part 1 Step 3 (the follow-up) and go straight to v2.
- The most impactful moment is the side-by-side comparison. Give learners 2-3 minutes to review both outputs before opening discussion.
- Some learners may find that v1 still produces decent output. This is a good teaching moment: the issue is not that v1 always fails, but that it fails unpredictably and inconsistently.
