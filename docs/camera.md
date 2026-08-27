# Camera language

Camera direction is the part of a video prompt with the worst signal-to-noise, because
the vocabulary people reach for comes from two incompatible places: film crews, who
name moves, and photographers, who name equipment.

The move transfers. The equipment mostly does not.

## Name the move, not the numbers

> the camera pushes in slowly on her face

works. So does *tracks alongside*, *tilts up*, *cranes over*, *orbits*, *pulls back*,
*holds still*.

> a 35mm anamorphic lens at f/1.4 on a 24-inch slider travelling at 2 inches per second

does not work better, and often works worse. Focal lengths and apertures are inputs to
an optical system the model does not have. They function as *style tokens* — "35mm"
nudges toward a look people associate with 35mm — but they do not control geometry, and
a long specification of hardware crowds out the sentence describing what happens.

The same applies to amplitude and speed. "Pushes in" is a direction. "Pushes in 40cm
over 3 seconds" is a request the model cannot verify it satisfied, and the extra
numbers do not constrain it — they just occupy the prompt.

## One move per shot

Thirty seconds is long enough that stacking moves is tempting: push in, then orbit, then
crane up, then pull back. In a real single take that is a Steadicam operator having a
very good day. In a generated one it usually produces drift — the camera never settles
anywhere and the subject never gets a stable frame.

Pick one move and let the *subject* create the rest of the motion. A locked-off camera
on someone walking toward it produces more apparent movement than an orbiting camera on
someone standing still, and it holds together far better.

## What is worth specifying

In rough order of how reliably it lands:

1. **Shot size.** *Close on her hands*, *wide, she is small in the frame*. This is the
   single most effective camera instruction because it is a statement about composition
   rather than about equipment.
2. **Camera height and angle.** *Low, looking up past the railing*. Cheap to say,
   strongly visible.
3. **One move**, named plainly.
4. **Whether it is handheld or locked off.** Two words, changes the whole feel.
5. **What is in focus**, if it matters. *Her face sharp, the street behind her soft.*

Everything after that is decoration.

## Audio is generated in the same pass

Wan 3.0 produces picture and sound together, which means the soundscape is part of the
same paragraph and responds to the same kind of direction. It is worth a sentence.

> Room tone, the hum of a chest freezer, and her footsteps on wet tile. No music.

Note that *"no music"* is doing something different from the exclusions on the previous
page — here the absence *is* the specification, and a soundtrack is a discrete thing
the model either adds or does not. Still, the positive version is stronger:
*"the only sound is room tone and her footsteps."*

One thing not to try to buy: turning `audio` off does not make the clip cheaper. Picture
and sound are one pass and the published rate is the same either way. If you need a
silent deliverable, generate with sound and strip it downstream — you have already paid
for the track and you may want it later.

## Reproducing a move you liked

If a shot comes out right, the camera behaviour is in the sample as much as in the
prompt. `seed` accepts 0–2,147,483,647 and is random when unset, and the value comes
back in the response.

Store it with the clip. "That one again, but she turns the other way" is a request
somebody will make, and without the seed it is not a request anyone can fulfil.
