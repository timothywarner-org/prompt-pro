# Demo: Meta-Prompting Loop

**Law 13 -- Meta-Prompting / Law 14 -- Strike While the Iron Is Hot:** Use the model to critique and improve your own prompts, then iterate in the same session.

**Tool:** Google Gemini (1.5 Pro or later) | **Time:** 10 minutes

---

## Setup

Contoso Robotics is drafting a partner outreach email to hospital systems, inviting them to pilot the new HealthBot Alpha healthcare logistics robot. You start with a mediocre prompt, ask the model to critique it, apply the improvements, and compare results.

---

## Step 1 -- Run the Mediocre Prompt

Paste this into Gemini and save the output.

```text
Write an email to hospitals about our new robot that moves stuff around. We want them
to try it. Make it professional.
```

Label this output **Draft A**.

---

## Step 2 -- Ask the Model to Critique the Prompt

In the same session, paste the following.

```text
I just gave you this prompt:

"Write an email to hospitals about our new robot that moves stuff around. We want them
to try it. Make it professional."

Critique this prompt. What is missing? What is vague? How could it be rewritten to
produce a much better email? Give me a specific improved version of the prompt.
```

Save the critique and the improved prompt the model suggests.

---

## Step 3 -- Run the Improved Prompt

Still in the same session, paste the improved prompt that Gemini suggested. If Gemini's suggestion is missing any of the details below, add them before running:

- **Sender:** Maria Chen, CEO of Contoso Robotics
- **Recipient persona:** VP of Operations at a 400-bed hospital
- **Product:** HealthBot Alpha -- autonomous robot for hospital supply room and pharmacy distribution
- **Ask:** Join a 90-day pilot program, free of charge, starting Q3 2026
- **Proof point:** WarehouseBot Pro reduced fulfillment errors by 62% at a Fortune 500 client
- **Tone:** Confident but not salesy; peer-to-peer executive voice
- **Length:** Under 250 words

Save this output as **Draft B**.

---

## Step 4 -- Compare

| Dimension | Draft A (Mediocre Prompt) | Draft B (Meta-Prompted) |
|-----------|--------------------------|------------------------|
| Mentions the product by name? | | |
| Addresses a specific recipient persona? | | |
| Includes a concrete ask (pilot program)? | | |
| Provides a proof point or credibility signal? | | |
| Appropriate tone for executive audience? | | |
| Under 250 words? | | |
| Would you actually send this email? | | |

---

## Bonus: Second Critique Round

If time allows, ask Gemini to critique Draft B and suggest a third version. Observe diminishing returns -- the jump from A to B is dramatic; from B to C is incremental.

```text
Now critique the email you just wrote. What could be tighter, more compelling, or more
specific? Rewrite it one more time.
```

---

## Discussion Points

1. Why is it useful to let the model critique your prompt rather than doing it yourself? (It catches blind spots you normalized.)
2. Why does Law 14 ("strike while the iron is hot") matter here? (The model retains the full critique context in session -- starting fresh would lose that.)
3. How many rounds of meta-prompting are worth the effort before you hit diminishing returns?
4. Could you use a different model for the critique step? (e.g., ask Claude to critique a prompt you plan to use with ChatGPT.) Why might cross-model critique be valuable?
