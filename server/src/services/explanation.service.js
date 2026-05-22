import { askGemini } from "./gemini.service.js";
import { EXPLAIN_PROMPT } from "../constants/prompts.js";
import { parseGeminiJSON } from "../utils/prompts.utils.js";
import { getLanguageName } from "../constants/languages.js";

const EXPLAIN_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    explanation: { type: "STRING" },
  },
  required: ["explanation"],
};

export const explainCode = async (code, language) => {
  const langName = getLanguageName(language);
  const prompt = EXPLAIN_PROMPT(code, langName);
  const rawResponse = await askGemini(prompt, {
    responseMimeType: "application/json",
    responseSchema: EXPLAIN_RESPONSE_SCHEMA,
  });
  return parseGeminiJSON(rawResponse);
};
