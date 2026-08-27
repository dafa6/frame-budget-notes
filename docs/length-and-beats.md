# Length and beats

## The arithmetic

Thirty seconds at 30 fps is **900 frames**. That number is worth holding onto because
it makes the budget concrete in a way that "thirty seconds" does not.

A beat — one describable thing happening — needs somewhere between two and five seconds
to read on screen. Below two seconds a viewer registers movement but not content. Above
five, a single beat starts to feel held.

So:

| Clip length | Beats that fit comfortably |
| --- | --- |
| 5 s | 1, maybe 2 |
| 10 s | 2–3 |
| 20 s | 4–6 |
| 30 s | **6–9** |

The failure mode at the long end is not too few beats. It is too many. A prompt with
fourteen described actions in it does not produce fourteen actions in thirty seconds;
it produces a model averaging over your intentions, which looks like a clip where
nothing quite completes.

## Write them in order and let the order do the work

The single highest-return change to a long prompt is putting the beats in temporal
sequence and using ordinary sequencing words.

Not this:

> A chef works in a busy kitchen with steam and copper pans, plating a dish, checking
> tickets, calling to the line, wiping the rim, cinematic lighting, shallow depth of
> field, 4K quality, masterpiece

Everything in there is simultaneous. There is no first and no last, so the model
chooses, and it will usually choose to show all of it at low intensity for the whole
duration.

This instead:

> A chef plates a dish under a heat lamp in a narrow service kitchen. She sets the last
> garnish, then glances up at the ticket rail. She calls something to the line without
> looking away from the plate. Steam crosses the frame. She wipes the rim with a cloth,
> pushes the plate forward, and turns back to the pass.

Six beats, ordered, each one a completed action. The words doing the structural work
are *then*, *without looking away*, and the sequence of finite verbs. No labels, no
numbered list.

## Do not write the labels into the prompt

It is tempting to write:

```
[SHOT 1] chef plates the dish
[SHOT 2] she looks at the ticket rail
```

Do not. Wan 3.0 reads one plain paragraph. Bracketed labels, timecodes and shot numbers
become tokens the model has to interpret as content, and it will sometimes render them
— as on-screen text, or as a hard cut it invented because you told it there were shots.

If you are composing programmatically and you want internal structure, keep the
structure in your data model and flatten it to prose at the last step.

## One take is a choice, not a default you are stuck with

Thirty seconds in one pass is the headline capability, and it genuinely removes an edit
step: the sound is generated with the picture in the same pass, so there is no sync
work either.

It is not automatically the right choice. A single 30-second generation is one sample
of a large space — if the fourth beat comes out wrong, the whole thirty seconds is
wrong, and at 1080P that is a $6.00 sample at Alibaba's published rate. Six five-second
generations cost the same in total, fail independently, and let you re-roll the one that
missed.

The rule I have settled on:

- **Continuity between beats matters** — the camera never cuts, a character must be
  physically the same across the whole thing, the action is one continuous movement →
  **one take.**
- **Beats are separable** — a montage, a product turntable, an explainer with distinct
  sections → **several short generations**, and draft each one at 480P first.

## Sizing before you commit

Two constraints that bite specifically at the long end:

**With reference video attached, input seconds plus output seconds must total 30 or
less.** A fifteen-second reference clip caps your output at fifteen. Requesting `-1`
does not exempt you.

**`-1` cannot be priced in advance.** It hands the length decision to the model, which
is fine for exploration and awkward for anything prepaid. Read
`usage.output_video_duration` from the response rather than your own request when you
reconcile — it is the only ground truth for what you actually got.
