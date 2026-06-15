# Cross-Reference Exercise

**Law covered:** 20 (Cross-Referencing LLMs)
**Time:** 15 minutes
**Platforms:** ChatGPT, Claude, Gemini

## Objective

Ask the same factual question about robotics industry regulations to three different LLMs. Compare answers, identify disagreements, and verify claims against a provided source document. This exercise demonstrates why cross-referencing matters and how to do it systematically.

## The Scenario

Contoso Robotics is expanding into the European market. The compliance team needs to understand which regulations apply to industrial robots sold in the EU. Rather than trusting a single AI's answer, they will cross-reference three models and verify against official sources.

## The Prompt

Send this exact prompt to ChatGPT, Claude, and Gemini in three separate sessions:

```text
Contoso Robotics manufactures industrial warehouse automation robots
and is preparing to sell in the European Union for the first time.

List the top 5 EU regulations or directives that apply to industrial
robots sold in the EU market. For each one, provide:
1. The full official name and reference number
2. A one-sentence summary of what it requires
3. The enforcement date or most recent amendment date
4. The primary compliance requirement for a robotics manufacturer

Do not include regulations that apply only to consumer products or
AI software. Focus on physical industrial robots and machinery.
```

## Source Document for Verification

Use the following verified reference material to check the LLMs' claims. This information is current as of April 2026.

---

### EU Regulations Applicable to Industrial Robots

**1. Machinery Regulation (EU) 2023/1230**

- Replaces the Machinery Directive 2006/42/EC
- Effective date: January 20, 2027 (with transition period; some provisions apply from January 2024)
- Requires conformity assessment, CE marking, and a declaration of conformity for all machinery placed on the EU market
- Key change from prior directive: explicit provisions for robots with self-evolving behavior and digital documentation requirements
- Manufacturers must conduct risk assessment per Annex III and prepare technical documentation per Annex IV

**2. Radio Equipment Directive (RED) 2014/53/EU**

- Applies to robots with wireless communication capabilities (Wi-Fi, Bluetooth, cellular)
- Requires CE marking for radio equipment
- Delegated Regulation (EU) 2022/30 adds cybersecurity requirements for internet-connected radio equipment, applicable from August 1, 2025
- Manufacturers must demonstrate electromagnetic compatibility and efficient use of radio spectrum

**3. General Product Safety Regulation (EU) 2023/988**

- Replaces the General Product Safety Directive 2001/95/EC
- Effective date: December 13, 2024
- Establishes general safety requirements for products placed on the EU market
- Applies alongside sector-specific legislation like the Machinery Regulation
- Requires economic operators to maintain traceability and report dangerous products via the Safety Gate portal

**4. Low Voltage Directive (LVD) 2014/35/EU**

- Applies to electrical equipment with voltage between 50 and 1000 V AC or 75 and 1500 V DC
- Requires CE marking and conformity assessment
- Manufacturers must ensure robots meet essential health and safety requirements related to electrical risks
- Technical documentation and EU declaration of conformity required

**5. Electromagnetic Compatibility Directive (EMC) 2014/30/EU**

- Requires that equipment does not generate electromagnetic disturbance exceeding levels that prevent other equipment from operating
- Also requires adequate immunity to electromagnetic disturbance
- CE marking required
- Applies to all electronic and electrical equipment, including industrial robots

**Additional Context:**

- The EU AI Act (Regulation (EU) 2024/1689) applies to AI systems, not to the physical robot hardware. If a Contoso robot uses AI for autonomous navigation, the AI component falls under the AI Act, but the physical machine is governed by the Machinery Regulation.
- REACH (EC 1907/2006) and RoHS (2011/65/EU) apply to chemical substances and hazardous materials in electronic equipment, respectively. These are relevant to component sourcing but are not robot-specific regulations.

---

## Evaluation Instructions

### Step 1 -- Record Each Model's Response

Create a table with the five regulations each model listed:

| Rank | ChatGPT | Claude | Gemini |
|------|---------|--------|--------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

### Step 2 -- Check for Agreement

Answer these questions:

1. **Overlap:** How many of the five regulations appear in all three responses?
2. **Unique entries:** Did any model list a regulation that the other two did not?
3. **Correct reference numbers:** Did each model cite the correct EU regulation or directive number? Check against the source document above.
4. **Date accuracy:** Did each model provide correct enforcement or amendment dates?
5. **Hallucinations:** Did any model invent a regulation that does not exist, or cite a repealed directive as current?

### Step 3 -- Identify Disagreements

Common disagreements to look for:

- One model may list the old Machinery Directive (2006/42/EC) instead of the new Machinery Regulation (2023/1230)
- Models may confuse the effective date of the Machinery Regulation (January 2027) with its publication date (2023)
- Some models may include the EU AI Act as a top-5 entry; per the source document, it applies to the AI component, not the physical robot
- Models may include REACH or RoHS, which are relevant but not robot-specific

### Step 4 -- Score Each Model

Rate each model's response:

| Criteria | ChatGPT | Claude | Gemini |
|----------|---------|--------|--------|
| Correct regulations listed (out of 5 from source) | /5 | /5 | /5 |
| Accurate reference numbers | /5 | /5 | /5 |
| Accurate dates | /5 | /5 | /5 |
| No hallucinated entries | Yes/No | Yes/No | Yes/No |
| Useful compliance guidance | 1-5 | 1-5 | 1-5 |

## Discussion Questions

1. Did any single model get everything right? If not, what does that tell us about relying on one source?
2. Where models disagreed, which one was correct? How did you determine that?
3. If you did not have the source document, how would you have verified the LLMs' claims?
4. What is the practical workflow for cross-referencing in a business context? How many models is enough?
5. Should Contoso's compliance team use LLMs as a starting point or a final authority for regulatory questions?

## Key Takeaways

- No single LLM should be treated as an authoritative source for factual, high-stakes questions.
- Cross-referencing across models reveals hallucinations that would be invisible with a single model.
- The most reliable workflow is: LLM for initial research, then verify against primary sources (EUR-Lex, official gazettes, regulatory body websites).
- Disagreement between models is a signal to investigate further, not a signal to pick the most confident answer.
