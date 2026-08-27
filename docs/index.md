# Writing prompts for a model that renders thirty seconds in one pass

Most prompt advice for video models was written for four-to-six second clips. At that
length a prompt is a description: one subject, one action, one look. The model does not
have room to disagree with you.

Wan 3.0 will render **up to thirty seconds in a single generation**, and that changes
what a prompt is. Thirty seconds is not a longer description. It is a shot with
internal structure — something happens, then something else happens — and a prompt
written as a description will produce thirty seconds of one thing.

These notes are about that difference. They assume you already know how to get a clip
out of the API; if you do not, the parameter reference is the place to start and it
will take ten minutes.

## What is actually fixed

Everything in this guide sits on four published constraints, checked against Alibaba
Cloud's Model Studio API reference for `wan3.0-video` on 2026-08-27:

| | |
| --- | --- |
| Duration | 2–30 seconds, integer, or `-1` for model-decided |
| Frame rate | 30 fps, every tier |
| Prompt length | **20,000 characters**, silently truncated beyond |
| Negative prompt | **there is no such parameter** |

The last two are the ones that shape how you write. There is a very large text budget
and no separate channel for saying what you do not want, which together push in the
same direction: everything goes in one paragraph of prose, including the exclusions.

## The pages

| Page | |
| --- | --- |
| [Length and beats](length-and-beats.md) | The arithmetic that decides how much can happen |
| [Saying what you do not want](exclusions.md) | Why there is no negative prompt, and what to write instead |
| [Camera language](camera.md) | Naming a move without over-specifying it |
| [The rewrite you did not ask for](rewriting.md) | `prompt_extend`, and when to switch it off |
| [Before you send it](checklist.md) | Nine checks on the text |

## One framing that helps

The useful mental model is not "I am describing a video." It is **"I am writing the
one paragraph a competent second-unit director would need, and they are shooting it
once, and I will not be there."**

That framing produces the right instincts on its own. You would tell that person what
happens in order. You would tell them what the room feels like. You would not tell
them the focal length unless it mattered. You would not hand them a list of things to
avoid; you would describe what you want clearly enough that the list is unnecessary.

---

*Maintained by Ray Lin alongside [wan-3.run](https://wan-3.run), a browser interface
for Wan 3.0. Disclosure: that is my site. There is
[a free prompt builder on it that needs no account](https://wan-3.run/prompt-generator)
if you would rather have the structure filled in for you, and
[eleven complete worked prompts printed beside the clips they produced](https://wan-3.run/prompt-ideas)
if you would rather read finished examples than rules.*
