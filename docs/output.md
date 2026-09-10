# What comes out

## Resolution

| Value | Notes |
| --- | --- |
| `480P` | The cheaper rung. Same model, smaller output. |
| `768P` | The ceiling. |

There is **no 2K or 1080P tier**. The absence is deliberate rather than an
omission from this table — no higher post-train is published.

!!! warning "Commonly mis-stated"
    Comparison tables frequently show `1080P` for this model. That value is
    filled in by analogy with neighbouring models, not read from a parameter.
    If a source quotes anything other than 480P or 768P, it did not check.

## Clip length

| Property | Value |
| --- | --- |
| Range | 5–15 seconds |
| Granularity | Whole seconds only |
| Distinct options | 11 |

The floor is **5**, not 4 and not 1. A 4-second request is refused upstream
rather than clamped to 5. See [Which limits reject](rejects.md).

## Aspect ratio

Six values, a closed set:

```
21:9   16:9   4:3   1:1   3:4   9:16
```

`21:9` being present is worth noting — a native ultrawide option is uncommon in
this class, and the alternative (generate 16:9, crop) discards vertical
resolution you already paid for.

!!! note "Not the same as the input aspect range"
    These are **output** ratios. Images you supply are governed by a separate
    numeric range; see [What you can put in](input.md).

## Takes per run

| Value | Effect |
| --- | --- |
| `1` | One output |
| `2` | Two outputs |
| `4` | Four outputs |
| `8` | Eight outputs |

**Every take is billed.** This is a quantity parameter, not a quality tier, and
nothing here charges for one and delivers several. The cost multiplies with
duration and resolution — see [What it costs](cost.md).

## Audio

Dialogue, effects and music are produced in the **same pass** as the picture and
arrive muxed into the delivered file. There is no separate audio request and no
stem output.

## Source

All values above are reproduced from
[minimaxh3max.video/minimax-h3-max-specs](https://minimaxh3max.video/minimax-h3-max-specs),
where each carries the date it last changed.
