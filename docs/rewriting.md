# The rewrite you did not ask for

`prompt_extend` defaults to **`true`**.

With it on, your text is expanded before it reaches the generator. A one-line prompt
becomes a paragraph; a paragraph becomes something longer and more specific. On short
input the improvement is real and large, which is presumably why it is the default.

On input you have already tuned, it is a problem — not because the rewrite is bad, but
because it breaks the feedback loop you are relying on.

## Why it breaks iteration

The loop you think you are running:

```
write prompt → generate → look → adjust prompt → generate → look
```

The loop you are actually running with `prompt_extend` on:

```
write prompt → REWRITE → generate → look → adjust prompt → REWRITE → generate → look
```

You change a word. The rewriter, seeing different input, produces a different expansion
— possibly different in places you did not touch. The clip changes. You attribute the
change to your edit.

By attempt five you have a mental model of how this model responds to your phrasing,
built entirely from observations of a different string. **You are tuning one text and
evaluating another.**

## The response tells you what ran

The task response carries `orig_prompt`, so you can always diff what you sent against
what the system had:

```python
resp = poll(task_id)
sent = my_prompt
ran  = resp["output"]["orig_prompt"]
if sent.strip() != ran.strip():
    log.info("prompt was rewritten: %d -> %d chars", len(sent), len(ran))
```

Log it on every job. When a clip comes back nothing like the request, the first question
is whether the request is what ran, and this answers it in one line instead of an
afternoon.

## When to leave it on

Genuinely useful cases, and they are not rare:

- **Short input.** One line in, and you want the model to fill in the scene. This is
  what the feature is for.
- **User-supplied text in a product.** Real users write six words. Expansion is the
  difference between a usable result and a disappointing one, and they are not going to
  iterate.
- **Exploration.** You want variety across attempts and are not yet trying to control a
  specific outcome.

## When to switch it off

- **The prompt is longer than two or three sentences.** You have already said the
  things the expander would add.
- **You are on attempt three or later.** Whatever you are converging toward, converge
  toward it with a stable pipeline.
- **You need reproducibility.** A fixed seed with a rewritten prompt is not a fixed
  experiment.
- **The prompt encodes constraints you care about** — brand wording, a legal
  disclaimer, a specific piece of set dressing. An expansion can dilute them without
  removing them, which is harder to notice than a deletion.

## A workflow that respects both

```
Attempts 1–2   prompt_extend: true    explore, let it fill gaps
               480P, short duration    cheap samples
Attempt 3      read orig_prompt        see what it added that you liked
Attempts 4+    prompt_extend: false    keep the good additions, in your own text
               fixed seed              now you are tuning one variable
Final          prompt_extend: false    1080P, the prompt you actually wrote
               store the seed
```

The middle step is the one worth adopting even if you ignore the rest. Read the
expansion once, keep the two or three phrases that improved the shot, paste them into
your prompt, then turn the expander off. You get the benefit of the rewrite and a
stable string to iterate on.

## One documented cost, one undocumented one

The reference notes that expansion **adds latency** without saying how much. On a job
that already takes one to five minutes this is unlikely to be your bottleneck, but it is
real and it applies to every attempt.

The undocumented cost is the one above: attribution error. It does not show up in a
benchmark and it is the reason most "this model ignores my prompt" reports are, on
inspection, a rewriting story.
