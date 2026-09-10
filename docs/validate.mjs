/**
 * mmh3max-request-validator
 *
 * Validates a MiniMax H3 Max generation request against the model's published
 * limits, before you spend anything.
 *
 * Why this exists: every one of these limits rejects rather than degrades. An
 * out-of-range value does not come back as a slightly worse clip, it comes back
 * as an error — often from a code path nobody tested, because the value came
 * from a default or a computed duration rather than from a user.
 *
 * Limits are current as of 2026-09-10 and each is dated on the source table:
 *   https://minimaxh3max.video/minimax-h3-max-specs
 *
 * They move. Re-read the table rather than trusting this file forever; the
 * LIMITS object is deliberately one flat block so a diff is easy to eyeball.
 *
 * No dependencies, no network, ESM. MIT.
 */

export const LIMITS = {
  resolutions: ["480P", "768P"],            // no 2K tier exists
  durationSeconds: { min: 5, max: 15, integerOnly: true },
  takes: [1, 2, 4, 8],                      // every take is billed
  aspectRatios: ["21:9", "16:9", "4:3", "1:1", "3:4", "9:16"],
  imageFormats: ["jpg", "jpeg", "png", "webp", "heic", "heif"],
  imageMaxBytes: 30 * 1024 * 1024,          // per image
  requestMaxBytes: 64 * 1024 * 1024,        // SHARED: all attachments + prompt
  imageSidePx: { min: 256, max: 5760 },
  imageAspect: { min: 0.4, max: 2.5 },      // 2:5 .. 5:2, input only
  referenceStillsIncluded: 5,               // extras are billed separately
};

export const RATES_USD_PER_SECOND = {
  // list price read 2026-09-03, launch promotion deliberately excluded
  "h3-max-turbo": { "480P": 0.025, "768P": 0.04 },
  "h3-max": { "480P": 0.05, "768P": 0.08 },
  extraReferenceStill: 0.08,
  perGenerationFee: 0,
};

const err = (field, message, hint) => ({ field, message, hint });

/**
 * @param {object} req
 * @param {string} req.resolution      "480P" | "768P"
 * @param {number} req.duration        whole seconds, 5..15
 * @param {number} [req.takes=1]       1 | 2 | 4 | 8
 * @param {string} [req.aspectRatio]
 * @param {string} [req.postTrain]     "h3-max" | "h3-max-turbo"
 * @param {Array}  [req.images]        [{ name, bytes, width, height }]
 * @param {number} [req.promptBytes=0]
 * @param {number} [req.referenceStills=0]
 * @returns {{ok: boolean, errors: object[], estimatedUsd: number|null}}
 */
export function validate(req) {
  const errors = [];
  const {
    resolution, duration, takes = 1, aspectRatio,
    postTrain = "h3-max", images = [], promptBytes = 0, referenceStills = 0,
  } = req ?? {};

  if (!LIMITS.resolutions.includes(resolution)) {
    errors.push(err("resolution", `must be one of ${LIMITS.resolutions.join(", ")}`,
      "There is no 2K or 1080P tier. If a comparison table told you otherwise, it was filled in by analogy."));
  }

  const d = LIMITS.durationSeconds;
  if (!Number.isInteger(duration)) {
    errors.push(err("duration", "must be a whole number of seconds",
      "Clamp before you round: clamp(round(x), 5, 15). Rounding 4.6 down gives 4, which is rejected outright."));
  } else if (duration < d.min || duration > d.max) {
    errors.push(err("duration", `must be ${d.min}..${d.max} seconds`,
      duration < d.min
        ? "The floor is 5, not 4 or 1. Defaults and 'quick preview' buttons are where this usually bites."
        : "The ceiling is 15. Longer sequences are several clips, and several bills."));
  }

  if (!LIMITS.takes.includes(takes)) {
    errors.push(err("takes", `must be one of ${LIMITS.takes.join(", ")}`,
      "Takes is a quantity, not a quality tier — every take is billed."));
  }

  if (aspectRatio !== undefined && !LIMITS.aspectRatios.includes(aspectRatio)) {
    errors.push(err("aspectRatio", `must be one of ${LIMITS.aspectRatios.join(", ")}`,
      "The set is closed; anything else has to be cropped afterwards, which costs resolution you paid for."));
  }

  let total = promptBytes;
  for (const img of images) {
    const label = img?.name ?? "image";
    total += img?.bytes ?? 0;

    const ext = String(label).split(".").pop()?.toLowerCase();
    if (ext && !LIMITS.imageFormats.includes(ext)) {
      errors.push(err(label, `format .${ext} not accepted`,
        `Accepted: ${LIMITS.imageFormats.join(", ")} — note HEIC/HEIF are fine, so iPhone originals need no conversion.`));
    }
    if ((img?.bytes ?? 0) > LIMITS.imageMaxBytes) {
      errors.push(err(label, "over the 30 MB per-image limit"));
    }
    for (const [side, px] of [["width", img?.width], ["height", img?.height]]) {
      if (px != null && (px < LIMITS.imageSidePx.min || px > LIMITS.imageSidePx.max)) {
        errors.push(err(label, `${side} ${px}px outside ${LIMITS.imageSidePx.min}..${LIMITS.imageSidePx.max}px`));
      }
    }
    if (img?.width && img?.height) {
      const ar = img.width / img.height;
      if (ar < LIMITS.imageAspect.min || ar > LIMITS.imageAspect.max) {
        errors.push(err(label, `aspect ${ar.toFixed(2)} outside ${LIMITS.imageAspect.min}..${LIMITS.imageAspect.max}`,
          "This is the INPUT aspect range and it is not the same list as the output ratios."));
      }
    }
  }

  if (total > LIMITS.requestMaxBytes) {
    errors.push(err("request", `attachments + prompt total ${(total / 1048576).toFixed(1)} MB, over the 64 MB request budget`,
      "64 MB is a shared pool, not a per-file limit. Two legal 30 MB images plus a prompt can exceed it while every file passes on its own."));
  }

  const rate = RATES_USD_PER_SECOND[postTrain]?.[resolution];
  const estimatedUsd = rate == null || !Number.isFinite(duration)
    ? null
    : Number((rate * duration * takes
        + Math.max(0, referenceStills - LIMITS.referenceStillsIncluded) * RATES_USD_PER_SECOND.extraReferenceStill
      ).toFixed(4));

  return { ok: errors.length === 0, errors, estimatedUsd };
}

export default validate;
