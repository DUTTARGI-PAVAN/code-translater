export const parseGeminiJSON = (text) => {
  try {
    const cleanText = extractJSON(text);
    return JSON.parse(cleanText);
  } catch (error) {
    throw new Error(`Failed to parse Gemini response as JSON: ${error.message}`);
  }
};

const extractJSON = (text) => {
  let cleanText = text.trim();

  const fencedMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch) cleanText = fencedMatch[1].trim();

  const firstBrace = cleanText.indexOf("{");
  const lastBrace = cleanText.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanText = cleanText.slice(firstBrace, lastBrace + 1);
  }

  return cleanText.trim();
};

export const cleanCodeResponse = (text) => {
  let cleanText = text.trim();
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```\w*\s*\n?/, "");
    cleanText = cleanText.replace(/\n?```\s*$/, "");
  }
  return cleanText.trim();
};
