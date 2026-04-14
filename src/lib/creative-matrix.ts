import { CreativeTestVariant } from "./types";

const hooks = [
  "Bold claim",
  "Pain point",
  "Curiosity",
  "Comparison",
  "Emotional opening",
  "Creator confession",
];

const narratives = [
  "Product demo",
  "User story",
  "Testimonial",
  "Founder voice",
  "Educational explainer",
  "Lifestyle aspiration",
];

const ctas = [
  "Shop now",
  "See why people switch",
  "Try it today",
  "Limited-time offer",
  "Learn more",
  "Watch the results",
];

const structures = [
  "6s",
  "15s",
  "30s",
  "UGC",
  "Polished ad",
  "Product-only cut",
  "Voiceover cut",
  "Caption-led cut",
];

const platformFits = ["TikTok", "Instagram Reels", "YouTube Shorts", "Amazon PDP"];
const funnelStages = ["Awareness", "Consideration", "Conversion"];

function scoreIndex(index: number, max: number, weight: number) {
  return Math.round(((index + 1) / max) * weight * 100) / 100;
}

export function generateCreativeTestMatrix(count = 18): CreativeTestVariant[] {
  const variants: CreativeTestVariant[] = [];

  for (let i = 0; i < count; i += 1) {
    const hook = hooks[i % hooks.length];
    const narrative = narratives[(i + 2) % narratives.length];
    const cta = ctas[(i + 3) % ctas.length];
    const structure = structures[(i + 1) % structures.length];
    const platformFit = platformFits[i % platformFits.length];
    const funnelStage = funnelStages[i % funnelStages.length];

    const predictedCtr = 0.8 + scoreIndex(i, count, 0.9);
    const predictedHoldRate = 0.7 + scoreIndex(count - i, count, 0.8);
    const predictedIntent = 0.6 + scoreIndex(i % 6, 6, 0.7);

    variants.push({
      id: `matrix-${i + 1}`,
      hook,
      narrative,
      cta,
      structure,
      platformFit,
      funnelStage,
      predictedCtr,
      predictedHoldRate,
      predictedIntent,
    });
  }

  return variants;
}
