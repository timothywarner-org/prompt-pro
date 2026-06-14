# Demo: Few-Shot Showdown

**Law 11 -- Few-Shot Examples:** Show the model what "good" looks like before asking it to produce.

**Tool:** ChatGPT (GPT-5.x or any current model) | **Time:** 10 minutes

---

## Setup

Contoso Robotics is preparing a product brief for its first healthcare logistics robot. The marketing team has a strict house style for product briefs: short paragraphs, a specs table, and a punchy tagline. You will run two versions of the same request and compare the outputs.

---

## Version A -- Zero-Shot

Paste this prompt into ChatGPT with no additional context.

```text
Write a product brief for Contoso Robotics' new healthcare logistics robot called MedMover 100.
```

Save the output. Note the format, length, tone, and whether it includes a specs table.

---

## Version B -- Few-Shot (3 Examples)

Paste the following prompt, which includes three example product briefs in Contoso's house style, then the same request.

```text
You are a senior product marketer at Contoso Robotics. Below are three product briefs
written in our house style. Study the format, tone, and structure carefully, then write
a new brief for our upcoming healthcare logistics robot, MedMover 100.

---

EXAMPLE 1: WarehouseBot Pro

Tagline: "Move more. Think less about moving."

WarehouseBot Pro is Contoso Robotics' flagship autonomous mobile robot for high-volume
warehouse environments. It navigates dynamic floor plans using LiDAR + computer vision
and integrates with all major WMS platforms out of the box.

| Spec | Value |
|------|-------|
| Payload capacity | 500 kg |
| Top speed | 2.0 m/s |
| Battery life | 12 hours continuous |
| Navigation | LiDAR + stereo vision |
| WMS integration | SAP, Oracle, Manhattan |
| Safety rating | ISO 3691-4 compliant |

Target market: 3PL providers and e-commerce fulfillment centers with 50,000+ sq ft
floor space.

Competitive advantage: 40% faster pick-path optimization than nearest competitor,
plus hot-swap battery design that eliminates downtime.

Pricing tier: Enterprise ($85,000-$110,000 per unit).

---

EXAMPLE 2: WarehouseBot Lite

Tagline: "Enterprise brains, startup budget."

WarehouseBot Lite brings Contoso's proven navigation stack to small and mid-size
warehouses at half the price of WarehouseBot Pro. It shares the same software
platform, so teams can mix fleets without retraining operators.

| Spec | Value |
|------|-------|
| Payload capacity | 200 kg |
| Top speed | 1.5 m/s |
| Battery life | 8 hours continuous |
| Navigation | LiDAR |
| WMS integration | SAP, Oracle |
| Safety rating | ISO 3691-4 compliant |

Target market: Regional distributors and growing e-commerce brands with
10,000-50,000 sq ft warehouses.

Competitive advantage: Same software ecosystem as WarehouseBot Pro -- upgrade
path with zero retraining cost.

Pricing tier: Mid-market ($42,000-$55,000 per unit).

---

EXAMPLE 3: LogiMover 500

Tagline: "Pallets handled. People freed."

LogiMover 500 is a heavy-duty autonomous pallet mover built for cross-dock and
staging environments. It handles full Euro-pallets and coordinates multi-robot
choreography through Contoso's Fleet Director software.

| Spec | Value |
|------|-------|
| Payload capacity | 1,200 kg |
| Top speed | 1.2 m/s |
| Battery life | 10 hours continuous |
| Navigation | LiDAR + UWB beacons |
| Fleet coordination | Contoso Fleet Director |
| Safety rating | ISO 3691-4 compliant |

Target market: Cross-dock facilities, cold-chain distribution centers, and
automotive parts staging areas.

Competitive advantage: Multi-robot choreography eliminates traffic jams in
narrow-aisle environments -- up to 30% higher throughput vs. single-robot systems.

Pricing tier: Enterprise ($120,000-$145,000 per unit).

---

Now write the product brief for MedMover 100, our first healthcare logistics robot.
It is designed for hospital supply rooms and pharmacy distribution. Use the same
format as the three examples above.
```

Save the output.

---

## Comparison Checklist

After running both versions, compare on these dimensions:

| Dimension | Version A (Zero-Shot) | Version B (Few-Shot) |
|-----------|-----------------------|----------------------|
| Includes a tagline? | | |
| Has a specs table with consistent columns? | | |
| Mentions target market explicitly? | | |
| States a competitive advantage? | | |
| Includes a pricing tier? | | |
| Matches Contoso's tone (short, punchy)? | | |
| Could be dropped into an existing brief deck without reformatting? | | |

---

## Discussion Points

1. Which output required less editing to be "production-ready"?
2. How many of the house-style conventions did Version A miss?
3. What happens if you provide only one example instead of three? Try it and compare.
4. At what point do additional examples stop improving output? (Diminishing returns)
