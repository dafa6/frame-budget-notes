# Before you send it

Nine checks on the prompt text itself. Not on the request — this is the paragraph, not
the parameters.

Run them in order; the early ones catch the expensive mistakes.

## 1. Are the beats in temporal order?

Read it aloud. If you cannot say which thing happens first, neither can the model.
Sequencing words — *then*, *as*, *before*, *once* — are the cheapest structural
improvement available.

## 2. Is the beat count within range for the duration?

Roughly one beat per three to five seconds. Six to nine for a thirty-second clip. If
you have counted twelve, either cut some or split the shot into two generations.

## 3. Are there any labels, timecodes or brackets?

`[SHOT 2]`, `00:12`, `---`, numbered lists. Flatten all of it to prose. The model reads
one paragraph, and structural markup either becomes on-screen text or becomes a cut you
did not ask for.

## 4. Is every "no X" rewritten as a positive?

Search the text for *no*, *without*, *avoid*, *not*. Each hit is either a real
description or a negative prompt that will backfire. There is no negative prompt
parameter; naming the thing puts it in the shot.

## 5. Does the camera get exactly one move?

One named move, or none. Shot size and camera height are worth more than lens
specifications, and a locked-off camera on a moving subject beats a moving camera on a
static one.

## 6. Is the sound described?

Picture and sound are generated together, so silence in the prompt means the model
decides. One sentence — the room, the two or three sounds that matter, whether there is
music — is usually enough.

## 7. Are ordinal references correct?

If the prompt says "Image 2" or "Video 1", check them against the numbering rule:
**numbering restarts per media type**, so the third item in your `media` array might be
Image 2. A reference to an asset that does not exist is not an error — it is silently
ignored, and you find out by looking at the clip.

## 8. Is it under 20,000 characters?

Almost certainly yes if you wrote it by hand. Almost certainly worth checking if you
generated it from a document, because going over is **truncated silently**. A prompt
that ends mid-sentence produces a clip that ends mid-idea and nothing tells you.

```python
assert len(prompt) <= 20_000, f"prompt is {len(prompt)} chars; it will be truncated"
```

## 9. Would a second-unit director know what to shoot?

The last check, and the one that catches what the other eight miss. Hand the paragraph
to someone who has not seen the brief. If they can tell you what happens, in order,
and what it looks and sounds like, the prompt is done. If they ask a question, that
question is your next sentence.

---

## Cheap first, expensive last

Two settings that make being wrong cost less while you work through the list:

**Draft at 480P.** It is a resolution tier, not a lesser model — the same
`wan3.0-video` at a smaller output size, 30 fps like the others. At Alibaba's published
rate it is a quarter of 1080P, and composition, motion, pacing and length are all
decidable at that size. Only texture, small on-screen text and faces in wide shots need
the real resolution.

Worth knowing that 480P is new in 3.0. Wan 2.7 started at 720P, so the cheapest possible
draft used to cost twice what it does now — which is a more useful upgrade for most
budgets than the thirty-second ceiling everyone writes about.

**Set `resolution` explicitly.** Omitting it gives you 1080P, silently. A drafting loop
that forgets the field is a drafting loop paying full price.

---

*All limits and defaults from Alibaba Cloud's Model Studio API reference for
`wan3.0-video`, checked 2026-08-27. Prices are Alibaba's published international list.*

*If you would rather not run a nine-item checklist by hand,
[the prompt builder on wan-3.run](https://wan-3.run/prompt-generator) applies most of
it as you type — free, no account, no cap on how many you write. Disclosure: that is my
site.*
