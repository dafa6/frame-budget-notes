# What you can put in

## Image formats

```
jpg   jpeg   png   webp   heic   heif
```

`heic` and `heif` are accepted, which is unusual — most comparable endpoints do
not publish them. Practically it means an iPhone original can be sent without
conversion, which removes a transcode step and, less helpfully, means the files
arriving are full-size camera originals. See the size budget below.

## Size limits

| Limit | Value | Scope |
| --- | --- | --- |
| Per image | 30 MB | each file individually |
| Whole request | 64 MB | **shared** — all attachments plus the prompt |

!!! danger "64 MB is a pool, not a ceiling above 30 MB"
    Two images of 30 MB each are individually legal and total 60 MB, leaving
    under 4 MB for everything else. A first frame and a last frame straight off
    a phone is the exact shape of request that passes the per-file rule and
    fails the whole-request rule. Validate against the sum, not the item.

## Dimensions

| Property | Value |
| --- | --- |
| Per side | 256–5760 px |
| Aspect range | 0.4–2.5 (2:5 to 5:2) |

The aspect range applies to **supplied images** and is a numeric range, not the
named list used for output. A 21:9 source still is 2.33 and fits; anything wider
or taller than the range is refused regardless of the output ratio requested.

## Reference stills

| Property | Value |
| --- | --- |
| Included | 5, at any resolution |
| Each additional | $0.08 |

"Any resolution" means the allowance is a **count**, not a size budget — a
thumbnail and a 5760 px still consume the same slot. Reference stills are not
exempt from the 64 MB request pool.

## Source

Reproduced from
[minimaxh3max.video/minimax-h3-max-specs](https://minimaxh3max.video/minimax-h3-max-specs),
where each value carries the date it last changed.
