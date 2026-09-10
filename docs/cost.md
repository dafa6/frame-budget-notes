# What it costs

## Per-second rates

Two post-trains, two resolutions. List price, read 2026-09-03.

| Post-train | 480P | 768P |
| --- | --- | --- |
| H3 Max Turbo | $0.025 / s | $0.04 / s |
| H3 Max | $0.05 / s | $0.08 / s |

Turbo is **exactly half** at both resolutions.

!!! warning "These exclude the launch promotion"
    The figures above are list price with the launch promotion deliberately
    excluded. A rate card built on a discount expires with the discount, and
    quietly. Model margin on list; treat the promotion as upside.

## What multiplies

Cost is `rate × seconds × takes`. All three compound:

| Configuration | H3 Max Turbo | H3 Max |
| --- | --- | --- |
| 5 s, 480P, 1 take | $0.125 | $0.25 |
| 15 s, 768P, 1 take | $0.60 | $1.20 |
| 15 s, 768P, 4 takes | $2.40 | $4.80 |
| 15 s, 768P, 8 takes | $4.80 | **$9.60** |

The cheapest useful probe is roughly **1/77th** the cost of the most expensive
single run.

## Extras

| Item | Cost |
| --- | --- |
| Reference still beyond the included 5 | $0.08 each |
| Per-generation fee | **0 credits** |

The zero per-generation fee is what makes many-small-runs iteration cheap: there
is no flat charge to amortise, so splitting one large exploration into twenty
probes costs nothing extra in overhead.

## Source

Reproduced from
[minimaxh3max.video/minimax-h3-max-specs](https://minimaxh3max.video/minimax-h3-max-specs),
where each rate carries the date it last changed.
