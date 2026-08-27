# Saying what you do not want

There is no negative prompt parameter.

The full `parameters` object for `wan3.0-video` is `resolution`, `ratio`, `duration`,
`audio`, `seed`, `prompt_extend` and `watermark` — plus `enable_thinking` when a
document or link is attached. There is no `negative_prompt`, no `exclude`, no
`avoid`. If you have arrived from a diffusion-image workflow where a negative prompt is
half the craft, that half of the craft does not transfer.

## What people do instead, and why it backfires

The instinct is to append the negative list to the positive prompt:

> A woman walks through a market at dusk. no blur, no distortion, no extra limbs, no
> text, no watermark, no low quality

The model does not have a channel that reads this as exclusion. It reads it as more
prompt. You have just written the words *blur*, *distortion*, *limbs*, *text* and
*watermark* into a description of your shot, and some of them will surface.

This is the "no elephant" problem, and it is not a quirk you can prompt your way around
by phrasing the negation more firmly. **Naming a thing puts it in the description.**

## Write the positive that excludes it

Every exclusion is a positive statement about something else. The translation is
mechanical once you see it.

| Instead of | Write |
| --- | --- |
| no blur | *sharp throughout, deep focus* |
| no extra limbs | *both hands visible and resting on the counter* |
| no text | *the sign is blank* |
| no crowd | *the street is empty except for her* |
| no camera shake | *the camera is locked off on a tripod* |
| no modern objects | *everything in frame is pre-1940* |
| no colour | *black and white, silver-toned* |

Each right-hand version describes a frame. Each left-hand version describes an absence,
which is not a thing a renderer can render.

The one that changes results most often is the hands. "No extra fingers" is a wish;
"her hands are in her coat pockets" is a composition, and it also removes the hardest
thing in the frame from the frame.

## Two cases where the answer is not a prompt

**Watermarks.** `watermark` is a request parameter and it defaults to `false`. Asking
for no watermark in prose is asking the wrong layer.

**Aspect and resolution.** "Cinematic widescreen" in the prompt does not change the
frame. `ratio` does — and note that the enum has no 21:9, so a cinemascope deliverable
is a crop in post, not a request parameter.

## When you genuinely cannot describe the positive

Occasionally there is no clean positive phrasing — you want a *category* of thing gone
and there are twenty of them. Two workable moves:

**Constrain the world instead of listing the objects.** "A bare concrete room, empty
except for a single wooden chair" excludes far more than any list would, and it does it
by specification rather than by prohibition.

**Change the framing.** If a problematic element keeps appearing at the edge of frame,
the reliable fix is usually a tighter shot, described positively: "a close shot on her
face and shoulders" removes the background as a subject rather than arguing with it.

## A note on the fashionable suffix

Long strings of quality tokens — *masterpiece, best quality, 8k, ultra detailed,
award-winning, trending on artstation* — are a habit carried over from a different
generation of image models. On a model that renders 900 sequential frames from a
paragraph, those tokens compete for attention with the sentence that says what happens.

The characters are not the problem; you have 20,000 of them. The attention is. Spend it
on the beat that has to land.
