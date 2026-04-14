import {
  Brand,
  Competitor,
  ContentAsset,
  CreativeVariant,
  ExportJob,
  Insight,
  PreviewAsset,
  Script,
  Storyboard,
} from "./types";
import { generateCreativeTestMatrix } from "./creative-matrix";

export const brand: Brand = {
  id: "brand-001",
  name: "LumenSkin",
  url: "https://lumenskin.com",
  category: "Skincare",
  market: "United States",
};

export const competitors: Competitor[] = [
  { id: "comp-001", name: "Glowmate", url: "https://glowmate.com" },
  { id: "comp-002", name: "AuraLab", url: "https://auralab.com" },
  { id: "comp-003", name: "PureHalo", url: "https://purehalo.com" },
];

export const contentAssets: ContentAsset[] = [
  {
    id: "asset-001",
    sourcePlatform: "youtube",
    sourceType: "official_api",
    url: "https://youtube.com/watch?v=glowmate-review",
    title: "Glowmate serum review",
    creatorName: "@skinbyjess",
    publishDate: "2024-03-12",
    views: 412000,
    engagement: 32000,
    hookText: "It erased my dull skin in 7 days",
    ctaText: "See your glow routine",
    narrativeType: "before_after",
    sellingPoints: ["Glow", "Hydration", "Fast results"],
    sentimentSummary: "Highly positive",
    aiQualityScore: 91,
    adSuitabilityScore: 88,
  },
  {
    id: "asset-002",
    sourcePlatform: "youtube",
    sourceType: "official_api",
    url: "https://youtube.com/watch?v=auralab-founder",
    title: "AuraLab founder story",
    creatorName: "AuraLab",
    publishDate: "2024-02-28",
    views: 280000,
    engagement: 21000,
    hookText: "I built this because nothing else worked",
    ctaText: "Try the formula",
    narrativeType: "founder_authority",
    sellingPoints: ["Founder story", "Clinically tested"],
    sentimentSummary: "Positive",
    aiQualityScore: 88,
    adSuitabilityScore: 84,
  },
  {
    id: "asset-003",
    sourcePlatform: "youtube",
    sourceType: "official_api",
    url: "https://youtube.com/watch?v=purehalo-demo",
    title: "PureHalo demo",
    creatorName: "@routinewithmia",
    publishDate: "2024-03-03",
    views: 198000,
    engagement: 15000,
    hookText: "Watch the texture melt instantly",
    ctaText: "Shop the serum",
    narrativeType: "product_demo",
    sellingPoints: ["Texture", "Absorption"],
    sentimentSummary: "Positive",
    aiQualityScore: 84,
    adSuitabilityScore: 82,
  },
];

export const insights: Insight[] = [
  {
    id: "insight-001",
    title: "UGC authenticity drives retention",
    summary: "Creators who show bare-skin footage outperform polished ads.",
    sourceType: "ai_inferred",
    createdAt: "2024-03-20",
  },
  {
    id: "insight-002",
    title: "Proof moments outperform lifestyle shots",
    summary: "Before/after proof drives higher CTA engagement.",
    sourceType: "ai_inferred",
    createdAt: "2024-03-20",
  },
];

export const scripts: Script[] = [
  {
    id: "script-001",
    title: "15s conversion script",
    durationSeconds: 15,
    scriptText:
      "I tried every serum, but nothing fixed my dull skin until week one. Here is the routine I use and how fast it works.",
    ctaOptions: ["See your glow routine", "Try it today"],
  },
  {
    id: "script-002",
    title: "30s education script",
    durationSeconds: 30,
    scriptText:
      "If your skin barrier is stressed, here is the one product I trust. Watch how it absorbs, why it works, and what to expect by day seven.",
    ctaOptions: ["Learn more", "Start your routine"],
  },
];

export const storyboards: Storyboard[] = [
  {
    id: "storyboard-001",
    title: "7-day glow reveal",
    frames: 6,
    summary: "Problem > Routine > Texture > Proof > CTA",
  },
];

export const storyBreakdown = [
  {
    label: "Opening hook",
    detail: "Problem agitation in first 2 seconds",
  },
  {
    label: "Emotional arc",
    detail: "Relief + confidence boost after week one",
  },
  {
    label: "Product reveal",
    detail: "Shown at second 5 with close-up texture",
  },
  {
    label: "Proof moment",
    detail: "Before/after montage at second 10",
  },
  {
    label: "CTA style",
    detail: "Invite to try routine and share results",
  },
];

export const creativeVariants: CreativeVariant[] = [
  {
    id: "variant-001",
    hookType: "bold claim",
    narrativeType: "product demo",
    ctaType: "shop now",
    platformFit: "TikTok",
  },
  {
    id: "variant-002",
    hookType: "curiosity",
    narrativeType: "founder story",
    ctaType: "learn more",
    platformFit: "YouTube",
  },
];

export const previewAssets: PreviewAsset[] = [
  {
    id: "preview-001",
    type: "frameboard",
    url: "https://example.com/frameboard/preview-001",
    status: "complete",
  },
  {
    id: "preview-002",
    type: "video_preview",
    url: "https://example.com/video/preview-002",
    status: "running",
  },
];

export const creativeTestMatrix = generateCreativeTestMatrix(12);

export const exportJobs: ExportJob[] = [
  {
    id: "export-001",
    format: "pdf",
    status: "ready",
    createdAt: "2024-03-20",
  },
  {
    id: "export-002",
    format: "slides",
    status: "ready",
    createdAt: "2024-03-20",
  },
  {
    id: "export-003",
    format: "csv",
    status: "queued",
    createdAt: "2024-03-20",
  },
];
