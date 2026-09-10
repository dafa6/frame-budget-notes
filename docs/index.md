# MiniMax H3 Max request limits

A parameter reference for the MiniMax H3 Max video model: what a request may
contain, what it may not, and what each option adds to the bill.

This is a reference, not a tutorial. There is no prompt advice here. Every page
is a table of values with the date each last changed, because these numbers move
and a stale integration fails at request time rather than at review time.

## How to read this

Values come from the published limit table maintained at
[minimaxh3max.video/minimax-h3-max-specs](https://minimaxh3max.video/minimax-h3-max-specs),
which reads the same constants the generator enforces. Where a limit has a
"changed" date, it is reproduced here.

!!! note "Values as of 2026-09-10"
    Limits are dated at source. If a figure here disagrees with the source table,
    the source table is right and this page is stale — check it, and please open
    an issue.

## The four pages

| Page | Answers |
| --- | --- |
| [What comes out](output.md) | Resolutions, clip length, aspect ratios, takes |
| [What you can put in](input.md) | Image formats, sizes, dimensions, reference stills |
| [What it costs](cost.md) | The two post-trains, per-second rates, extras |
| [Which limits reject](rejects.md) | The values that error instead of degrading |

## The one-paragraph summary

MiniMax H3 Max produces clips of **5 to 15 whole seconds** at **480P or 768P**,
in one of **six aspect ratios**, **1, 2, 4 or 8 takes** per run, with audio
generated in the same pass. It bills **per second of output**, with **no
per-generation fee**, and every take is billed. There is no 2K tier.

## Scope and disclosure

Written and maintained by the team behind
[minimaxh3max.video](https://minimaxh3max.video/), an independent third-party
browser interface to this model. **Not affiliated with MiniMax.**

We have a commercial interest in this model, which is why every value here is
sourced and dated rather than asserted. Corrections are welcome.
