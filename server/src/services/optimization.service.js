import { askGemini } from "./gemini.service.js";
import { OPTIMIZE_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

const OPTIMIZE_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    optimizedCode: { type: "STRING" },
    suggestions: { type: "STRING" },
  },
  required: ["optimizedCode", "suggestions"],
};

export const optimizeCode = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = OPTIMIZE_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt, {
    responseMimeType: "application/json",
    responseSchema: OPTIMIZE_RESPONSE_SCHEMA,
  });
  return parseGeminiJSON(rawResponse);
};
