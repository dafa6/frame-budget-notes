# The 20,000-character ceiling

`prompt` on `wan3.0-video` accepts up to **20,000 characters**. Past that the text is
**truncated silently** — no error, no warning field, no flag in the response. The job
runs on whatever survived the cut.

That is a generous ceiling and an unforgiving failure mode, and the two facts pull in
opposite directions. This page is about which end of the range is actually useful.

## The number in context

Twenty thousand characters is roughly 3,000 English words. For comparison, everything
else in this guide put together is shorter than one maximum-length prompt.

| | Characters |
| --- | --- |
| A tight one-shot prompt | 400–900 |
| A six-layer prompt with dialogue and sound | 1,200–2,500 |
| This entire page | ~6,000 |
| The documented ceiling | **20,000** |

You will not reach it by writing carefully. You reach it by generating prompt text
programmatically — templating a shot list, pasting a transcript, concatenating a scene
description with a style block with a reference-material glossary — and that is exactly
the situation where nobody is reading the final string before it is sent.

## Why silent truncation is worse than rejection

A rejected request is a bug you fix in one iteration. A truncated request produces a
video, bills for it, and looks like a prompt-quality problem.

Worse, the cut lands at the end, and the end of a long assembled prompt is usually where
the constraints live. Style blocks, "do not" phrasing, audio direction and the closing
shot are the parts that get written last and therefore lost first. The clip comes back
looking like the opening of your prompt with none of the discipline of the rest, and the
natural reading is "the model ignored my instructions."

It did not ignore them. It never received them.

!!! warning "Two silent failures compound here"

    `prompt_extend` defaults to `true`, so the text the model runs is already not the
    text you wrote. If the string was also truncated before rewriting, `orig_prompt` in
    the response shows you the *truncated* original, not the one your code assembled.
    Reconcile against what you sent, and log the length.

## Measure before you send

One line, and it belongs in the request builder rather than in a review checklist:

```python
LIMIT = 20_000

def check_prompt(text: str) -> str:
    n = len(text)
    if n > LIMIT:
        # The API will not tell you this happened.
        raise ValueError(f"prompt is {n} characters; {n - LIMIT} would be cut silently")
    if n > LIMIT * 0.8:
        log.warning("prompt at %d/%d characters — near the silent-truncation ceiling", n, LIMIT)
    return text
```

Count characters, not tokens and not words. The documented limit is a character count,
and it applies to Chinese and English alike — which means the same prompt translated
into Chinese sits far below the ceiling while its English version may not.

## The useful length is much shorter anyway

Nothing about a 20,000-character allowance suggests you should approach it. In practice
the longest prompts that reliably improve output are the ones where every added sentence
names something visible: a beat, a light source, a camera move, a line of dialogue. Once
sentences start restating intent — "cinematic", "high quality", "masterful composition"
— length has stopped buying anything, and you are only moving the truncation risk closer.

The useful test is whether you can point at the frame each sentence is responsible for.
If you cannot, the sentence is decoration, and decoration is what should be cut when the
count runs long — not the constraints at the end.

For a calibration on what a real working prompt looks like at full length, it helps to
read one back out of a finished clip rather than write one from scratch:
[a reader that recovers the prompt behind a video](https://wan-3.run/video-to-prompt)
will give you a length and a structure to compare yours against, which is a faster
correction than any rule of thumb on this page.

---

*Character limit and truncation behaviour from Alibaba Cloud's Model Studio API
reference for `wan3.0-video`, checked 2026-08-27. The 20,000 figure is the documented
maximum for the `prompt` field; the guidance about useful length is mine and is not in
any specification.*
