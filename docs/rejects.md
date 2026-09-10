# Which limits reject

Most limits on this model **refuse** rather than degrade. An out-of-range value
does not return a worse clip; it returns an error. That matters because the
values most likely to be out of range come from defaults and computed numbers
rather than from a user choosing something.

## The reject list

| Field | Legal | Fails when | Why it bites |
| --- | --- | --- | --- |
| `duration` | 5–15, integer | 4 or below; any fraction | Defaults, "quick preview" buttons, and durations computed to fit audio |
| `resolution` | `480P`, `768P` | anything else | Configs carried over from a model that had a 1080P tier |
| `takes` | 1, 2, 4, 8 | 3, 5, 6, 7 | Treated as a free integer rather than an enum |
| `aspectRatio` | six named values | arbitrary W:H | Assumed to accept a computed ratio |
| image format | jpg/jpeg/png/webp/heic/heif | e.g. `gif`, `bmp`, `tiff` | User uploads |
| image size | ≤ 30 MB each | over | Camera originals |
| request total | ≤ 64 MB | over | **Passes per-file checks and still fails** |
| image side | 256–5760 px | outside | Thumbnails and very large scans |
| image aspect | 0.4–2.5 | outside | Panoramas, tall crops |

## The duration one, specifically

The floor is the most common failure and the least documented elsewhere. Two
rules, and the order matters:

```js
// correct
duration = clamp(round(requested), 5, 15)

// wrong — rounds 4.6 down to 4, which is refused outright
duration = clamp(Math.floor(requested), 5, 15)  // (clamp saves this one)
duration = Math.floor(clamp(requested, 5, 15))  // (this one is fine too)
duration = Math.floor(requested)                // (this one is not)
```

Clamp and round both, and do it before the request is built rather than in the
error handler.

## Validating ahead of time

A zero-dependency validator implementing every row above is published alongside
these docs. It returns the failing field, a reason, and a cost estimate for
requests that pass.

## Source

Reproduced from
[minimaxh3max.video/minimax-h3-max-specs](https://minimaxh3max.video/minimax-h3-max-specs),
where each limit carries the date it last changed.
