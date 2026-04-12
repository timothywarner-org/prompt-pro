# Demo: Role-Play Director

**Law 9 -- Role-Play Directing:** Assign a specific persona with stakes and accountability.

**Tool:** Any major LLM (ChatGPT, Claude, Gemini) | **Time:** 10 minutes

---

## Setup

Contoso Robotics has received a supply chain risk report from its logistics team. The report flags three issues:

1. A key lithium-ion battery supplier in Shenzhen is facing regulatory scrutiny that could halt exports for 60-90 days.
2. Lead times for LiDAR sensors have increased from 8 weeks to 14 weeks industry-wide.
3. A secondary injection-molding vendor failed its last quality audit and is on probation.

You will ask the model to review this report and recommend actions -- three times, with increasing role specificity.

---

## The Supply Chain Risk Report (Use With All Three Versions)

Paste this context block before each prompt.

```text
CONTOSO ROBOTICS -- SUPPLY CHAIN RISK REPORT
Date: April 2026 | Prepared by: Logistics Team

RISK 1: Battery Supply Disruption
- Supplier: ShenPower Ltd. (Shenzhen, China)
- Issue: Chinese Ministry of Industry regulatory review; potential 60-90 day export halt
- Impact: Affects WarehouseBot Pro, WarehouseBot Lite, and HealthBot Alpha production
- Current inventory: 6 weeks of safety stock

RISK 2: LiDAR Sensor Lead Time Increase
- Supplier: VeloSense Inc. (San Jose, CA)
- Issue: Industry-wide shortage; lead times moved from 8 weeks to 14 weeks
- Impact: Delays WarehouseBot v3 launch by estimated 4-6 weeks
- Current inventory: 10 weeks of safety stock

RISK 3: Injection Molding Quality Failure
- Supplier: PrecisionForm LLC (Guadalajara, Mexico)
- Issue: Failed Q1 2026 quality audit; placed on 90-day probation
- Impact: Chassis components for LogiMover 500 at risk of defects
- Current inventory: 4 weeks of safety stock; no alternate vendor qualified
```

---

## Version A -- No Role

```text
[Paste the supply chain risk report above]

Review this report and recommend actions.
```

Save the output. Note the level of detail, the specificity of recommendations, and whether priorities are assigned.

---

## Version B -- Generic Role

```text
[Paste the supply chain risk report above]

Act as a supply chain analyst. Review this report and recommend actions for each risk.
```

Save the output. Compare to Version A.

---

## Version C -- Detailed Role With Stakes

```text
[Paste the supply chain risk report above]

You are Contoso Robotics' VP of Operations. You report directly to CEO Maria Chen
and are accountable for a $40M annual supply chain budget. The board meets in 3 weeks
and will ask Maria about supply chain resilience -- she will rely on your
recommendations.

Your priorities:
- Protect production continuity for revenue-generating products (WarehouseBot Pro
  and Lite account for 70% of revenue).
- Do not jeopardize the HealthBot Alpha timeline -- the healthcare market entry is
  the company's top strategic initiative for 2026.
- Stay within budget; any spend over $500K requires CFO pre-approval.

Review the supply chain risk report above. For each risk:
1. Assess severity (Critical / High / Medium / Low) with justification.
2. Recommend specific, actionable mitigations -- name the action, the owner, the
   timeline, and the estimated cost.
3. Identify any risk interdependencies.
4. Flag anything that must be escalated to the CEO before the board meeting.

Format your response as a briefing memo that Maria Chen could read in under 5 minutes.
```

Save the output.

---

## Comparison Checklist

| Dimension | Version A (No Role) | Version B (Generic Role) | Version C (Detailed Role) |
|-----------|--------------------|-----------------------|--------------------------|
| Assigns severity ratings? | | | |
| Names specific actions (not just "consider diversifying")? | | | |
| Identifies an owner for each action? | | | |
| Includes timelines and cost estimates? | | | |
| Considers interdependencies across the three risks? | | | |
| Flags items for CEO escalation? | | | |
| Appropriate tone for an executive briefing? | | | |
| Accounts for budget constraints? | | | |

---

## Discussion Points

1. What changed between each version? Where did the biggest quality jump happen -- A to B, or B to C?
2. Why does giving the model stakes ("the board meets in 3 weeks") change the output?
3. When would a generic role (Version B) be sufficient, and when do you need the full Version C treatment?
4. What risks come with over-specifying a role? (The model may hallucinate domain-specific details to match the persona.)
