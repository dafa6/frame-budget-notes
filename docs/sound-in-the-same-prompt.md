# Writing the sound in the same prompt as the picture

Every other page here treats the prompt as a description of a picture. That is a habit
carried over from image models and from video models where audio is a separate product.
It does not fit a model that generates speech, effects and music **in the same pass as
the frames**, and the mismatch shows up as prompts that describe a scene beautifully and
come back with a soundtrack nobody asked for.

The soundtrack is not a post-process. It is a layer of the prompt, and it behaves
differently from the visual layers.

## What "same pass" changes

Three practical consequences, all of them following from one architectural fact.

**There is no audio setting to economise with.** Switching sound off does not reduce the
cost of a generation, because there is no second pass being skipped. If you were
planning to draft silently and add sound on the final run, that plan saves nothing.

**There are no stems.** What comes back is a mix. You cannot lower the music under the
dialogue, replace a footstep, or extract the voice. If any of that is required, generate
with your own audio plan in mind and treat the model's mix as reference.

**Audio inherits the continuity of the picture.** Across a thirty-second single-pass
take, the acoustic space is consistent from first second to last — the same room tone,
the same musical idea developing. That is genuinely hard to fake by layering afterwards,
and it is the main reason to use the same-pass output at all.

It also means an extension generated as a second call **will not match acoustically**.
Two clips butted together in an edit have two independent scores. Plan a continuous bed
underneath if the join has to be invisible.

## Where sound goes in the prompt

Keep the layer order used throughout these notes — subject, action, setting, camera,
**sound**, exclusions — and put the sound layer as a distinct block rather than
scattering audio adjectives through the visual description.

The reason is the same reason exclusions go last: whatever is adjacent gets associated.
"A rain-soaked street, the hiss of traffic, neon reflections" reads well to a human and
gives the model three things to reconcile in one clause. Separated, each is a decision:

```
SETTING. A rain-soaked street at night, neon signage reflected in standing water.
CAMERA. A slow dolly forward at chest height, no cuts.
SOUND. Steady rain on tarmac. Distant traffic hiss, no horns. No music.
```

## Dialogue: braces make it spoken

The single most useful piece of syntax. A line placed in braces is treated as **speech
to be performed**. The same line written in prose is treated as a description of
speaking, and the model will narrate around it — you get a person who appears to be
talking, with no words.

```
The barista looks up and says {We're closing in five minutes.}
```

versus

```
The barista tells the customer that they are closing in five minutes.
```

The first is a line. The second is a stage direction. Both are valid prompts and they
produce very different clips.

Two working notes on dialogue:

- **Keep lines short relative to the clip.** Speech occupies real time. A twenty-word
  line in a six-second beat compresses to something hurried; the same line across a
  thirty-second take has room.
- **One speaker per beat is safer than two.** Overlapping or alternating dialogue in a
  single continuous pass is possible to ask for and unreliable to receive.

## Reference audio: what it constrains

If you are using the reference family, up to five audio tracks can be attached, and like
every other reference they are **addressed by number in the prompt text**. An attachment
you never cite does nothing.

```
SOUND. The voice in Audio 1 delivers the line. Music follows the tempo of Audio 2.
```

What that pins is timbre, delivery and tempo *within the take*. What it does not pin is
identity across takes — there is no persistent voice profile, so two generations citing
the same file land close together, not identical.

Cost note that matters when planning: **reference images are free, reference video is
billed for its own duration** at your output rate and counts against the thirty-second
ceiling. Treat each attachment class as a separate line in the budget.

## Negative space in the sound layer

"No music" is a legitimate and frequently necessary instruction. Models default to
scoring things. If you want room tone and nothing else, say so, and say it in the
exclusions block rather than the sound block so it is not competing with the positive
description.

```
EXCLUDE. No score, no swells, no voiceover.
```

## A checklist for the sound layer

- Is there a distinct SOUND block, or is audio scattered through the visuals?
- Is every spoken line in braces?
- Is the line short enough for the seconds it has?
- Is each attached audio reference cited by number?
- Have you said what you do *not* want to hear?
- Are you relying on stems you will not receive?

## Sources

The behaviours described here follow from published properties of the model: audio
generated in the same pass as the picture, no price difference when it is disabled,
reference sets of up to ten images, five clips and five audio tracks cited by number,
and reference video billed at the output rate for its own duration. The full table, with
a source link and a verification date on each row, is at
[the Wan 3.0 specification page](https://wan-3.run/wan-3-0-specs), and
[wan-3.run](https://wan-3.run/) runs the model in a browser with the first clip free if
you want to hear the difference the braces make.

wan-3.run is an independent third-party interface built on Wan 3.0. It is not affiliated
with, endorsed by, or sponsored by Alibaba Group or Alibaba Cloud.
