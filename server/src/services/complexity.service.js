import { askGemini } from "./gemini.service.js";
import { ANALYZE_COMPLEXITY_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

const COMPLEXITY_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    timeComplexity: { type: "STRING" },
    spaceComplexity: { type: "STRING" },
    explanation: { type: "STRING" },
  },
  required: ["timeComplexity", "spaceComplexity", "explanation"],
};

export const analyzeComplexity = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = ANALYZE_COMPLEXITY_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt, {
    responseMimeType: "application/json",
    responseSchema: COMPLEXITY_RESPONSE_SCHEMA,
  });
  return parseGeminiJSON(rawResponse);
};
