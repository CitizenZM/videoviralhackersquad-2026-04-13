type FrameboardRequest = {
  prompt: string;
  apiKey?: string;
  model?: string;
  count?: number;
};

const defaultModel =
  process.env.GOOGLE_AI_STUDIO_MODEL ??
  "gemini-2.0-flash-exp-image-generation";

function shouldMock() {
  return process.env.MOCK_AI !== "false";
}

function placeholderFrames(count: number) {
  return Array.from({ length: count }).map(
    (_, index) =>
      `https://placehold.co/600x800?text=Frame+${index + 1}`
  );
}

export async function generateFrameboard({
  prompt,
  apiKey,
  model = defaultModel,
  count = 3,
}: FrameboardRequest) {
  if (shouldMock() || !apiKey) {
    return placeholderFrames(count);
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { candidateCount: Math.min(count, 4) },
      }),
    }
  );

  if (!response.ok) {
    return placeholderFrames(count);
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> };
    }>;
  };

  const images = data.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.inlineData)
    .filter((item): item is { data: string; mimeType: string } =>
      Boolean(item?.data && item?.mimeType)
    )
    .map((item) => `data:${item.mimeType};base64,${item.data}`);

  return images && images.length > 0 ? images : placeholderFrames(count);
}
