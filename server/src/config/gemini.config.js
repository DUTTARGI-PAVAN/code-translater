import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_NAME = "gemini-2.5-flash";
const FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || "")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);
const MODELS = [process.env.GEMINI_MODEL || MODEL_NAME, ...FALLBACK_MODELS];
const TRANSIENT_STATUSES = new Set([503, 504]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getGeminiErrorStatus = (error) => {
  try {
    return JSON.parse(error.message)?.error?.code;
  } catch {
    return error.status || error.statusCode;
  }
};

export const generateContent = async (prompt, config = {}) => {
  let lastError;

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });
        return response.text;
      } catch (error) {
        lastError = error;
        const status = getGeminiErrorStatus(error);
        if (!TRANSIENT_STATUSES.has(status) || attempt === 1) break;
        await wait(1000 * (attempt + 1));
      }
    }
  }

  throw lastError;
};
