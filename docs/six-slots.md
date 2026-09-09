# The six slots, and which one you left empty

The rest of these notes are about individual prompt problems. This page is the
frame they hang on: **a video prompt has six slots, they have a natural order,
and the order is by how badly the model behaves when the slot is empty.**

The reason a prompt for a video model is not a prompt for an image model is that
you are describing an *interval*, not a frame. An interval needs a start, an end,
and a rule for getting between them. Almost every prompt that produces
inconsistent takes describes the frame very well and leaves the interval to the
model, which then decides differently on every run.

## The order

| # | Slot | What goes in it | Cost of leaving it empty |
| --- | --- | --- | --- |
| 1 | Subject | Concrete nouns. Who, what, wearing what | Low if you supplied an image; the model can already see it |
| 2 | Action | Start state **and end state** | **Highest** — a different clip every run |
| 3 | Camera | Stated separately from the subject | High — merged clauses resolve inconsistently |
| 4 | Light | Direction, hardness, colour temperature | Medium — you get a generic but plausible look |
| 5 | Sound | Ambience, effects, speech and its tone | Medium — an invented soundscape, often wrong |
| 6 | Constraints | What must not happen | Low each, but they add up across takes |

If you only have the energy to fill three, fill the first three.

## Slot 2 is the one people skip

"A woman turns around" does not say how far through the turn the clip ends. The
model has to decide, and it decides differently each time. Two runs producing
"turned fully" and "turned halfway" reads as model instability and is not — it is
an unspecified endpoint.

Write both boundaries:

> Starts facing the camera. Turns over the left shoulder. Ends looking into the
> lens, still.

Now generation is an interpolation problem with both ends pinned, and the spread
across takes visibly narrows.

## Slot 3: two motions, two sentences

The most common structural mistake is merging subject motion and camera motion:

> ❌ She walks toward us as we pull back.

Two motions, one clause. Split them, and say when the camera does nothing —
"static" is not a reliable default:

> ✅ She walks toward the lens at a steady pace.
> ✅ The camera is locked off and does not move.

## Slot 5 exists because the audio is not a second pass

On a model that generates speech, effects and music **in the same pass as the
picture**, the soundscape is not post-production you can defer. If you leave it
unspecified it gets invented along with everything else, and an invented
soundscape is a common reason a technically fine clip feels wrong.

The corollary is a pricing one, covered in more detail on the
[per-second rate page at wan-3.run](https://wan-3.run/pricing): if there is only
one pass, turning the audio off cannot make it cheaper, because there is no
second invoice to remove.

## Why this is a budget page, not a craft page

The cost of a *delivered* clip is the per-second rate times the number of
attempts it took to get one you would ship. Adjectives do not move the attempt
count. Endpoints and camera separation do.

So the check before you send anything is not "is this prompt vivid enough." It is
**"which of the six slots is empty, and can the model tell?"**

## Where these notes come from

These pages are written while building [wan-3.run](https://wan-3.run/), an
independent third-party browser interface for Alibaba's Wan 3.0 video model.
That is not Alibaba, not Alibaba Cloud, and not Tongyi Wanxiang. The six slots
are not specific to any model, but the emphasis on slot 5 comes from working with
one where the audio really is in the same pass.
