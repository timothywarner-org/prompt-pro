# Context vs. No Context

**Law 6: Context Disclosure** -- The more relevant context you provide, the better the output.
**Law 7: Inference from Omission** -- AI fills gaps in your prompt with assumptions.

---

## The Experiment

Run both versions of the prompt below in the same AI tool. Compare the outputs to see how context transforms results and how omissions lead to generic (or wrong) assumptions.

---

## Version A: Bare Prompt (No Context)

```
Write a market analysis for our new product line.
```

### What to Expect from Version A

The AI has almost nothing to work with. It will likely:

- Assume a generic industry (SaaS, consumer goods, or retail)
- Invent a company size, revenue range, and market position
- Produce a template-style analysis with placeholder language
- Suggest competitors it associates with "new product line" in general
- Default to a US-centric consumer market
- Use vague phrases like "growing market" and "competitive landscape" without specifics

**Law 7 in action:** Every gap in your prompt becomes an assumption the AI makes silently. You will not know which assumptions it made unless you look carefully.

---

## Version B: Context-Rich Prompt

```
You are a senior market analyst advising Contoso Robotics on a strategic expansion.

Company context:
- Company: Contoso Robotics, founded 2018, Austin, TX
- CEO: Maria Chen
- Employees: 500
- Annual revenue: $120M
- Current products: WarehouseBot Pro (flagship, $85K per unit),
  WarehouseBot Lite (mid-market, $42K per unit),
  LogiMover 500 (logistics automation, $28K per unit)
- Current markets: North America (60% of revenue), EMEA (25%), APAC (10%), LATAM (5%)
- Core competency: Autonomous navigation and payload handling in warehouse environments

New product line:
- Contoso is developing robots for healthcare logistics -- moving supplies,
  medications, and equipment within hospitals and large medical facilities.
- Target customers: US hospital systems with 200+ beds
- Regulatory environment: FDA Class I/II medical device classification expected
- Competitors in this space: Aethon (TUG robots), Fetch Robotics (now Zebra),
  Swisslog Healthcare
- Timeline: Prototype by Q3 2026, pilot deployments Q1 2027

Write a market analysis covering:
1. Total addressable market (TAM) for healthcare logistics robotics in the US
2. Competitive positioning -- how Contoso's warehouse expertise translates
3. Top 3 risks specific to healthcare market entry
4. Recommended go-to-market strategy for the first 12 months
5. Financial projections framework (what metrics to track)

Keep the analysis under 800 words. Use a professional tone suitable for a board presentation.
```

### What to Expect from Version B

With full context, the AI can:

- Size the healthcare logistics robotics market using real industry knowledge
- Map Contoso's specific strengths (autonomous navigation, payload handling) to healthcare needs
- Name actual competitors and position Contoso relative to them
- Identify risks specific to medical device regulation, hospital procurement cycles, and clinical workflow integration
- Suggest a go-to-market approach calibrated to a $120M company with 500 employees
- Produce output that could realistically appear in a board deck

---

## Side-by-Side Comparison

After running both prompts, fill in this comparison:

| Dimension | Version A (No Context) | Version B (Full Context) |
|-----------|----------------------|------------------------|
| Industry assumed | | Healthcare logistics robotics |
| Company size assumed | | $120M / 500 employees (as specified) |
| Competitors mentioned | | Aethon, Fetch/Zebra, Swisslog |
| Specificity of recommendations | | Tailored to Contoso capabilities |
| Actionability of output | | Board-presentation ready |
| Assumptions AI made silently | | Minimal -- context filled the gaps |

---

## Discussion Questions

1. **Count the assumptions:** In Version A, how many facts did the AI invent or assume? List them.

2. **Dangerous defaults:** Were any of Version A's assumptions plausible enough that you might not have noticed they were wrong?

3. **Diminishing returns:** Is there a point where adding more context stops improving the output? Where would you draw the line?

4. **Context as guardrails:** How does providing competitors, revenue, and timeline prevent the AI from generating irrelevant advice?

5. **Prompt smell test (Law 5):** Looking back at Version A, what about it should have triggered your "prompt smell" instinct that something was missing?

---

## Key Takeaway

Context is not optional -- it is the difference between a generic template and actionable analysis. Law 6 says to disclose context deliberately. Law 7 warns that when you leave gaps, the AI fills them with assumptions you never approved. The safest prompt is one where you have controlled every major variable.
