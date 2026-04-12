# Demo: Chain-of-Thought Budget Allocation

**Law 12 -- Chain-of-Thought:** Ask the model to reason step by step so it catches its own errors.

**Tool:** Claude (Sonnet or later) | **Time:** 12 minutes

---

## Setup

Contoso Robotics has $8 million to allocate across five R&D projects for fiscal year 2026. The CFO has set hard constraints. You will give Claude the same data twice -- once asking for just the answer, once asking for step-by-step reasoning -- and see whether the reasoning version catches a constraint violation.

---

## Budget Data

Paste this table (or upload `data/contoso-rd-budget-2026.csv`) along with each prompt.

| Project | Department | Requested Budget | Priority | Status |
|---------|------------|-----------------|----------|--------|
| HealthBot Alpha | Healthcare R&D | $3,200,000 | Critical | New |
| WarehouseBot v3 | Core Engineering | $2,100,000 | High | Active |
| AI Vision Module | AI/ML Lab | $1,500,000 | High | Active |
| Battery R&D | Hardware Engineering | $800,000 | Medium | Active |
| Safety Certification | Compliance | $400,000 | Critical | Pending |

**Total requested:** $8,000,000

---

## Constraints

Include these constraints in both prompts.

1. Total budget must not exceed $8,000,000.
2. No single project may receive more than 40% of total budget ($3,200,000 max).
3. All "Critical" priority projects must be funded at 100% of their request.
4. "Active" projects may be reduced but not below 60% of their request.
5. The Healthcare R&D department must not receive more than 35% of total budget ($2,800,000 max) because it is a new, unproven division.

---

## Version A -- Direct Answer

```text
Here is Contoso Robotics' R&D budget data for FY2026 and five allocation constraints.
Allocate the $8M budget across these projects.

[Paste the budget table above]

Constraints:
1. Total budget must not exceed $8,000,000.
2. No single project may receive more than 40% of total budget ($3,200,000 max).
3. All "Critical" priority projects must be funded at 100% of their request.
4. "Active" projects may be reduced but not below 60% of their request.
5. The Healthcare R&D department must not receive more than 35% of total budget ($2,800,000 max).

Provide the final allocation as a table.
```

Save the output. Check whether the allocation satisfies all five constraints.

---

## Version B -- Chain-of-Thought

```text
Here is Contoso Robotics' R&D budget data for FY2026 and five allocation constraints.
Allocate the $8M budget across these projects.

[Paste the budget table above]

Constraints:
1. Total budget must not exceed $8,000,000.
2. No single project may receive more than 40% of total budget ($3,200,000 max).
3. All "Critical" priority projects must be funded at 100% of their request.
4. "Active" projects may be reduced but not below 60% of their request.
5. The Healthcare R&D department must not receive more than 35% of total budget ($2,800,000 max).

Think step by step. First list each constraint. Then check each project against every
constraint before assigning a dollar amount. After proposing an allocation, verify that
all five constraints are satisfied. If any constraint is violated, adjust and re-verify.
Show all of your reasoning.
```

Save the output.

---

## The Hidden Conflict

Constraints 3 and 5 are in tension:

- Constraint 3 says HealthBot Alpha (Critical) must be funded at 100% = $3,200,000.
- Constraint 5 says the Healthcare R&D department (which contains only HealthBot Alpha) must not exceed 35% of $8M = $2,800,000.

It is impossible to satisfy both simultaneously. Version A typically produces a clean-looking table that silently violates one of these two constraints. Version B, because it checks each constraint explicitly, will flag the conflict and either ask for guidance or propose a resolution (e.g., "fund HealthBot Alpha at $2,800,000 and note the shortfall for CFO review").

---

## Comparison Checklist

| Dimension | Version A | Version B |
|-----------|-----------|-----------|
| Produced a budget table? | | |
| Identified the Constraint 3 vs. 5 conflict? | | |
| Explained its reasoning? | | |
| Verified all constraints after allocation? | | |
| Proposed a resolution or asked for clarification? | | |

---

## Discussion Points

1. Why does step-by-step reasoning help the model catch conflicts that a direct answer misses?
2. In a real business setting, which version would you trust more -- and why?
3. What other domains benefit from chain-of-thought? (Legal analysis, financial modeling, compliance reviews.)
4. Is there a downside to always asking for chain-of-thought? (Longer output, higher token cost, sometimes overthinking simple tasks.)
