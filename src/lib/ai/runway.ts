type PreviewRequest = {
  prompt: string;
  apiKey?: string;
  durationSeconds?: number;
  aspectRatio?: string;
  imageUrl?: string;
};

const defaultBaseUrl = process.env.RUNWAY_API_URL ?? "https://api.runwayml.com";
const defaultModel = process.env.RUNWAY_MODEL ?? "gen-3-alpha";

function shouldMock() {
  return process.env.MOCK_AI !== "false";
}

export async function generatePreviewClip({
  prompt,
  apiKey,
  durationSeconds = 6,
  aspectRatio = "9:16",
  imageUrl,
}: PreviewRequest) {
  if (shouldMock() || !apiKey) {
    return "https://placehold.co/720x1280?text=Preview";
  }

  const response = await fetch(`${defaultBaseUrl}/v1/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: defaultModel,
      prompt,
      duration: durationSeconds,
      aspect_ratio: aspectRatio,
      image: imageUrl,
    }),
  });

  if (!response.ok) {
    return "https://placehold.co/720x1280?text=Preview";
  }

  const data = (await response.json()) as {
    output?: string[];
    result?: { url?: string };
  };

  return data.output?.[0] ?? data.result?.url ?? "https://placehold.co/720x1280?text=Preview";
}
