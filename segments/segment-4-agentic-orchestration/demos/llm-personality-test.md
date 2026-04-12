# Demo: LLM Personality Test

**Law 23 -- LLM Personality Matching**

Different LLMs have distinct "personalities" -- tendencies in creativity, structure, specificity, and tone. This exercise makes those differences visible by sending the identical prompt to three models and scoring the outputs.

## Setup

1. Open three browser tabs: ChatGPT, Claude, and Gemini.
2. Read `../data/contoso-healthcare-market-brief.md` so you understand the scenario context.
3. Have `../data/contoso-llm-comparison-rubric.csv` open in a spreadsheet for scoring.

## The Prompt

Copy and paste the following prompt verbatim into each model. Do not modify it between models -- consistency is the point.

```text
You are a senior strategy consultant. Your client is Contoso Robotics, a mid-size
robotics manufacturer based in Austin, TX (500 employees, $120M revenue). Their
current product line includes WarehouseBot Pro, WarehouseBot Lite, and LogiMover 500,
all focused on warehouse and logistics automation.

CEO Maria Chen wants to evaluate entering the healthcare logistics market --
specifically autonomous material transport inside hospitals and large clinics.

Design a go-to-market strategy for Contoso Robotics to enter the healthcare logistics
market. Your strategy should include:

1. Market opportunity sizing with a 3-year revenue projection
2. Competitive positioning against Aethon (ST Engineering), Fetch Robotics, and
   Locus Robotics
3. Regulatory pathway (FDA, HIPAA, hospital safety standards)
4. Product adaptation requirements for WarehouseBot Pro
5. Partnership and channel strategy
6. Risks and mitigations
7. A 90-day launch plan with milestones

Be specific with numbers, timelines, and named actions. Avoid generic advice.
```

## What to Observe

As each model generates its response, pay attention to:

- **Opening framing:** Does the model restate the problem, jump straight to the answer, or add caveats?
- **Numerical specificity:** Does it invent plausible numbers, hedge with ranges, or avoid numbers entirely?
- **Structure:** How does it organize the seven requested sections? Does it add sections you did not ask for?
- **Tone:** Consultative and confident? Academic and cautious? Conversational?
- **Hallucination signals:** Does it cite real companies, regulations, or market data? Are they accurate?
- **Actionability:** Could Maria Chen hand this to her VP of Strategy and start executing?

## Scoring Rubric

Use the CSV rubric at `../data/contoso-llm-comparison-rubric.csv`. For each criterion, score each model from 1 (poor) to 10 (excellent).

| Criterion | Weight | What to Look For |
|-----------|--------|------------------|
| Accuracy | 25 | Are cited facts, regulations, and competitor details correct? |
| Creativity | 15 | Does the strategy surface non-obvious angles or partnerships? |
| Structure | 20 | Is the output well-organized and easy to follow? |
| Actionability | 20 | Are recommendations specific enough to execute? |
| Hallucination Risk | 10 | Does the model fabricate facts or cite nonexistent sources? (Higher score = lower risk) |
| Tone Match | 10 | Does the tone match a senior strategy consultant? |

## Calculating the Weighted Score

For each model:

```
Weighted Score = SUM(criterion_score * weight) / 100
```

A perfect score is 10.0. In practice, scores between 6.0 and 8.5 are typical.

## Discussion Questions

1. Which model produced the most actionable 90-day plan? Why?
2. Did any model hallucinate competitor details or regulatory requirements? How would you verify?
3. If you could only use one model for this type of strategic analysis, which would you choose and why?
4. How would your choice change if the task were code generation instead of strategy consulting?
5. Law 23 says "match the model to the task." Based on your scores, what task types would you assign to each model?

## Variation (Time Permitting)

Re-run the exercise with a different prompt type -- for example, a technical architecture decision or a creative marketing campaign. Compare whether the model rankings shift when the task category changes. This reinforces the core lesson: there is no single "best" model.
